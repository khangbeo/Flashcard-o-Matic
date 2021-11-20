import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, readCard, updateCard } from '../../../utils/api'
import FormCard from '../../FormCard'
import BreadCrumb from '../Study/BreadCrumb'
import ReactLoading from 'react-loading'

export default function EditCard() {
  const { deckId, cardId } = useParams()
  const history = useHistory()
  const [deck, setDeck] = useState({})
  const [card, setCard] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal)
        const cardFromAPI = await readCard(cardId, abortController.signal)
        setDeck(deckFromAPI)
        setCard(cardFromAPI)
        setLoading(true)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [deckId, cardId])

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await updateCard({ ...card }, abortController.signal)
    history.push(`/decks/${deckId}`)
    return response
  }

  return (
    <div className="container col-md-8 mx-auto">
      {!loading ? (
        <ReactLoading
          type={'spin'}
          color={'#000'}
          width={100}
          height={100}
          className="mx-auto mt-5"
        />
      ) : (
        <>
          <BreadCrumb
            deckId={deckId}
            name={`Deck ${deck.name}`}
            screen={`Edit Card ${card.id}`}
          />
          <h2>Edit Card</h2>
          <FormCard
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            front={card.front}
            back={card.back}
            deckId={deckId}
            cancel={'Done'}
            submit={'Save'}
          />
        </>
      )}
    </div>
  )
}
