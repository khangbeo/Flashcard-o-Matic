import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, readCard, updateCard } from '../../../utils/api'
import FormComponent from '../../FormComponent'

export default function EditCard() {
  const { deckId, cardId } = useParams()
  const history = useHistory()
  const [deck, setDeck] = useState({})
  const [card, setCard] = useState({})

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal)
        const cardFromAPI = await readCard(cardId, abortController.signal)
        setDeck(deckFromAPI)
        setCard(cardFromAPI)
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <FormComponent 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        front={card.front}
        back={card.back}
        deckId={deckId}
        cancel={"Done"}
        submit={"Save"}
      />
    </div>
  )
}
