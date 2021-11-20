import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { readDeck, updateDeck } from '../../../utils/api'
import FormDeck from '../../FormDeck'
import BreadCrumb from '../Study/BreadCrumb'
import ReactLoading from 'react-loading'

export default function EditDeck() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
        setName(response.name)
        setLoading(true)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [deckId])

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await updateDeck({ ...deck }, abortController.signal)
    history.push(`/decks/${response.id}`)
    return response
  }

  return (
    <div className="container col-md-8 mx-auto">
      {!loading ? (
        <ReactLoading
          type={'spin'}
          color={'#000'}
          width={100}
          height={100}
          className="mx-auto mt-5"
        />
      ) : (
        <>
          <BreadCrumb deckId={deckId} name={name} screen={'Edit Deck'} />
          <h2>Edit Deck</h2>
          <FormDeck
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            name={deck.name}
            description={deck.description}
            deckId={deckId}
          />
        </>
      )}
    </div>
  )
}
