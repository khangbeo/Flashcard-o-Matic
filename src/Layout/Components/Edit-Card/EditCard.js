import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, readCard, updateCard } from '../../../utils/api'

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
    <div>
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="3"
            placeholder="Front side of card"
            onChange={handleChange}
            value={card.front}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="3"
            placeholder="Back side of card"
            onChange={handleChange}
            value={card.back}
            required
          ></textarea>
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mb-4 mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary mb-4">
          Submit
        </button>
      </form>
    </div>
  )
}
