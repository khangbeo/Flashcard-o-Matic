import { Link } from 'react-router-dom'
import React from 'react'

export default function HomeScreen({ decks, handleDelete }) {
  return (
    <main className="container">
      <Link className="btn btn-lg btn-success btn-block mb-4" to="/decks/new">
        <i className="bi bi-plus-lg mr-2"></i>
        Create Deck
      </Link>
      <div
        className="d-flex flex-lg-row flex-column flex-wrap justify-content-lg-around"
        style={{ maxWidth: '100%' }}
      >
        {decks.map((deck) => {
          return (
            <div className="card mb-4 mx-2 bg-light p-0 col-lg-5" key={deck.id}>
              <div className="card-header bg-dark text-light">
                <h3 className="card-title">{deck.name}</h3>
                <h5 className="card-subtitle">{deck.cards.length} cards</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <p className="card-text">{deck.description}</p>
                <div className="d-flex row justify-content-around">
                  <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                    <i className="bi bi-eye mr-2" alt="eye"></i>
                    View
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to={`/decks/${deck.id}/study`}
                  >
                    <i className="bi bi-book mr-2" alt="book"></i>
                    Study
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(deck)}
                  >
                    <i className="bi bi-trash mr-2" alt="trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
