import React, { useEffect, useState } from 'react'
import { readDeck } from '../../../utils/api'
import { useHistory, useParams } from 'react-router'
import NoCards from './NoCards'
import AllCards from './AllCards'
import BreadCrumb from '../Shared/BreadCrumb'
import ReactLoading from 'react-loading'
import ErrorAlert from '../Shared/ErrorAlert'

export default function Study() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState([])
  const [cardNumber, setCardNumber] = useState(1)
  const [front, setFront] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()

  useEffect(() => {
    setError(null)
    setDeck({})
    setCards([])
    getData(deckId)
  }, [deckId])
  
  async function getData(deckId) {
    const abortController = new AbortController()
    try {
      const response = await readDeck(deckId, abortController.signal)
      setDeck(response)
      setCards(response.cards)
      setIsLoading(true)
    } catch (error) {
      console.log(error)
      setError(error)
    }
    return () => {
      abortController.abort()
    }
  }

  return (
    <div className="container col-md-8 mx-auto">
      <ErrorAlert error={error} />
      {!isLoading ? (
        <ReactLoading
          type={'spin'}
          color={'#000'}
          width={100}
          height={100}
          className="mx-auto mt-5"
        />
      ) : (
        <>
          <BreadCrumb deckId={deckId} name={deck.name} screen={'Study'} />
          <div className="mb-4">
            <h2>Study: {deck.name}</h2>
            <div>
              {cards.length === 0 ? (
                <NoCards cards={cards} deck={deck} />
              ) : cards.length > 2 ? (
                <AllCards
                  cards={cards}
                  cardNumber={cardNumber}
                  front={front}
                  setFront={setFront}
                  setCardNumber={setCardNumber}
                  history={history}
                />
              ) : (
                <NoCards cards={cards} deck={deck} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
