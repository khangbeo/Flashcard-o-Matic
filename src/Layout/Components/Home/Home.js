import { listDecks, deleteDeck } from '../../../utils/api'
import { Link, useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [decks, setDecks] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await listDecks(abortController.signal)
        setDecks(response)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [])

  async function handleDelete(deck) {
    const abortController = new AbortController()
    if (window.confirm('Delete this deck?')) {
      history.go(0)
      return await deleteDeck(deck.id, abortController.signal)
    }
  }
  return (
    <div className="container col-md-8 mx-auto">
      <Link className="btn btn-lg btn-success btn-block mb-4" to="/decks/new">
        <i className="bi bi-plus-lg mr-2"></i>
        Create Deck
      </Link>
      {decks.map((deck) => {
        return (
          <div
            className="card mb-4 bg-light d-flex flex-lg-row flex-md-column"
            key={deck.id}
          >
            <div className="card-header bg-dark text-light col-lg-4">
              <h3 className="card-title">{deck.name}</h3>
              <h5 className="card-subtitle">{deck.cards.length} cards</h5>
            </div>
            <div className="card-body col-lg-8">
              <p className="card-text">{deck.description}</p>
              <div className="row d-flex justify-content-around">
                <Link
                  className="btn btn-secondary p-2 m-2"
                  to={`/decks/${deck.id}`}
                >
                  <i className="bi bi-eye mr-2" alt="eye"></i>
                  View
                </Link>
                <Link
                  className="btn btn-primary p-2 m-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="bi bi-book mr-2" alt="book"></i>
                  Study
                </Link>
                <button
                  type="button"
                  className="btn btn-danger p-2 m-2"
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
  )
}
