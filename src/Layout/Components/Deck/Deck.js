import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, deleteDeck, deleteCard } from '../../../utils/api'
import BreadCrumb from '../Study/BreadCrumb'
import CardList from './CardList'
import DeckInfo from './DeckInfo'

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
        history.push(`/decks/${deckId}`)
        return await deleteCard(card.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="container col-md-8 mx-auto">
      <BreadCrumb name={deck.name}/>
      <DeckInfo handleDelete={handleDeleteDeck} deck={deck} id={deckId} />
      <CardList handleDelete={handleDeleteCard} cards={cards} id={deckId}/>
    </main>
  )
}
