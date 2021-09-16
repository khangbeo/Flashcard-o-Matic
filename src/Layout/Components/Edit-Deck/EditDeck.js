import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { readDeck, updateDeck } from '../../../utils/api'

export default function EditDeck() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const [name, setName] = useState("")
  const history = useHistory()

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
        setName(response.name)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [deckId])

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await updateDeck({ ...deck }, abortController.signal)
    history.push(`/decks/${response.id}`)
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
            <Link to={`decks/${deckId}`}>{name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={deck.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={deck.description}
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
