import React from 'react'
import { Link } from 'react-router-dom'

export default function FormDeck({
  handleSubmit,
  handleChange,
  name,
  description,
  deckId,
}) {
  return (
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
          value={name}
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
          value={description}
          required
        ></textarea>
      </div>
      <Link
        to={deckId ? `/decks/${deckId}` : '/'}
        className="btn btn-secondary mb-4 mr-3"
      >
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary mb-4">
        Submit
      </button>
    </form>
  )
}
