import React, { useEffect, useState } from 'react'
import { readDeck } from '../../../utils/api'
import { useHistory, useParams } from 'react-router'
import NoCards from './NoCards'
import AllCards from './AllCards'
import BreadCrumb from './BreadCrumb'

export default function Study() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState([])
  const [cardNumber, setCardNumber] = useState(1);
  const [front, setFront] = useState(true)
  const history = useHistory()

  useEffect(() => {
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
        setCards(response.cards)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [deckId])

  return (
    <>
      <BreadCrumb deckId={deckId} deck={deck}/>
      <div className="col-md-10 mx-auto mb-4">
          <h2>Study: {deck.name}</h2>
          <div>
            {cards.length === 0 
              ? <NoCards cards={cards} deck={deck}/>
              : cards.length > 2
              ? <AllCards 
                  cards={cards}
                  cardNumber={cardNumber}
                  front={front}
                  setFront={setFront}
                  setCardNumber={setCardNumber}
                  history={history}
                />
              : <NoCards cards={cards} deck={deck}/>
            }
          </div>
      </div>
    </>
  )
}