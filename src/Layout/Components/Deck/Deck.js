import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, deleteDeck, deleteCard } from '../../../utils/api'
import BreadCrumb from '../Shared/BreadCrumb'
import CardList from './CardList'
import DeckInfo from './DeckInfo'
import ReactLoading from 'react-loading'
import ErrorAlert from '../Shared/ErrorAlert'

export default function Deck() {
  const { deckId } = useParams()
  const history = useHistory()
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    setDeck({})
    setCards([])
    getData(deckId)
  }, [deckId])

  async function getData(deckId) {
    const abortController = new AbortController()
    try {
      const response = await readDeck(deckId, abortController.signal)
      setDeck(response)
      setCards(response.cards)
      setIsLoading(true)
    } catch (error) {
      console.log(error)
      setError(error)
    }
    return () => {
      abortController.abort()
    }
  }

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
        await deleteCard(card.id)
        return await getData(deckId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="container col-md-8 mx-auto">
      <ErrorAlert error={error} />
      <BreadCrumb name={deck.name} />
      {!isLoading ? (
        <ReactLoading
          type={'spin'}
          color={'#000'}
          width={100}
          height={100}
          className="mx-auto mt-5"
        />
      ) : (
        <>
          <DeckInfo handleDelete={handleDeleteDeck} deck={deck} id={deckId} />
          <CardList handleDelete={handleDeleteCard} cards={cards} id={deckId} />
        </>
      )}
    </main>
  )
}
