import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, createCard } from '../../../utils/api'

export default function AddCard() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const initialFormState = {
    front: '',
    back: '',
  }
  const [formData, setFormData] = useState({ ...initialFormState })

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [])

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    if (window.alert('Card Saved')) {
      const response = await createCard(
        deckId,
        { ...formData },
        abortController.signal,
      )
      return response
    }
    setFormData({...initialFormState})
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
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
            value={formData.front}
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
            value={formData.back}
            required
          ></textarea>
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mb-4 mr-3">
          Done
        </Link>
        <button type="submit" className="btn btn-primary mb-4">
          Save
        </button>
      </form>
    </div>
  )
}
