import { listDecks, deleteDeck } from '../../../utils/api'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'

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
    <HomeScreen decks={decks} handleDelete={handleDelete} />
  )
}
