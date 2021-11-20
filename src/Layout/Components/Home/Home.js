import { listDecks, deleteDeck } from '../../../utils/api'
import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import ReactLoading from 'react-loading'

export default function Home() {
  const [decks, setDecks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await listDecks(abortController.signal)
        setDecks(response)
        setIsLoading(true)
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
    <>
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
