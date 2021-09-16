import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, deleteDeck, deleteCard } from '../../../utils/api'

export default function Deck() {
  const { deckId } = useParams()
  const history = useHistory()
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    setDeck({})
    setCards([])
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

  async function handleDeleteDeck(deck) {
    try {
      if (window.confirm('Delete this deck?')) {
        await deleteDeck(deck.id)
        history.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteCard(card) {
    try {
      if (
        window.confirm('Delete this card? You will not be able to recover it!')
      ) {
        history.go(0)
        return await deleteCard(card.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container col-md-8 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div className="card-body">
        <h4 className="card-title">{deck.name}</h4>
        <p className="card-text">{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary mr-2"
        >
          Add Cards
        </Link>
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => handleDeleteDeck(deck)}
        >
          Delete
        </button>
      </div>
      <div className="card-body">
        <h2 className="card-title">Cards</h2>
        {cards.length !== 0 ? (
          cards.map((card, index) => {
            return (
              <div className="card mb-4 bg-light" key={index}>
                <div className="card-body d-flex flex-lg-row flex-column p-0">
                  <div className="col bg-align-self-center p-4">
                    <p>{card.front}</p>
                  </div>
                  <div className="col bg-info text-white p-4">
                    <p>{card.back}</p>
                    <div className="text-right">
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCard(card)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <>
            <h4>No Cards</h4>
            <p>Please add some cards to the deck</p>
          </>
        )}
      </div>
    </div>
  )
}
