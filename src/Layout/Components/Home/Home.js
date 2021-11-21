import { listDecks, deleteDeck } from '../../../utils/api'
import React, { useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import ReactLoading from 'react-loading'
import ErrorAlert from '../Shared/ErrorAlert'

export default function Home() {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const abortController = new AbortController()
    try {
      const response = await listDecks(abortController.signal)
      setDecks(response)
      setIsLoading(true)
    } catch (error) {
      console.log(error)
      setError(error)
    }
    return () => {
      abortController.abort()
    }
  }

  async function handleDelete(deck) {
    const abortController = new AbortController()
    if (window.confirm('Delete this deck?')) {
      await deleteDeck(deck.id, abortController.signal)
      return await getData()
    }
  }

  return (
    <>
      <ErrorAlert error={error} />
      {!isLoading ? (
        <ReactLoading
          type={'spin'}
          color={'#000'}
          width={100}
          height={100}
          className="mx-auto mt-5"
        />
      ) : (
        <HomeScreen decks={decks} handleDelete={handleDelete} />
      )}
    </>
  )
}
