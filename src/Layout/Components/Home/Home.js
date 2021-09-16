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
      <Link className="btn btn-lg btn-success btn-block mb-3" to="/decks/new">
        Create Deck
      </Link>
      {decks.map((deck) => {
        return (
          <div className="card mb-4" key={deck.id}>
            <div className="card-body">
              <div className="row d-flex">
                <div className="col">
                  <h5 className="card-title">{deck.name}</h5>
                </div>
                <div className="col">
                  <h6 className="card-subtitle mb-2 text-muted text-right">
                    {deck.cards.length} cards
                  </h6>
                </div>
              </div>
              <p className="card-text">{deck.description}</p>
              <div className="row d-flex">
                <Link
                  className="btn btn-secondary col p-2 m-2"
                  to={`/decks/${deck.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-primary col p-2 m-2"
                  to={`/decks/${deck.id}/study`}
                >
                  Study
                </Link>
                <button
                  type="button"
                  className="btn btn-danger col p-2 m-2"
                  onClick={() => handleDelete(deck)}
                >
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
