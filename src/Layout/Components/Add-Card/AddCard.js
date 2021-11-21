import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { readDeck, createCard } from '../../../utils/api'
import ReactLoading from 'react-loading'
import BreadCrumb from '../Shared/BreadCrumb'
import FormCard from '../Shared/FormCard'
import ErrorAlert from '../Shared/ErrorAlert'

export default function AddCard() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const initialFormState = {
    front: '',
    back: '',
  }
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ ...initialFormState })
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    setDeck({})
    getData(deckId)
  }, [deckId])

  async function getData(deckId) {
    const abortController = new AbortController()
    try {
      const response = await readDeck(deckId, abortController.signal)
      setDeck(response)
      setLoading(true)
    } catch (error) {
      console.log(error)
      setError(error)
    }
    return () => {
      abortController.abort()
    }
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await createCard(
      deckId,
      { ...formData },
      abortController.signal,
    )
    alert('Card Saved')
    setFormData({ ...initialFormState })
    return response
  }

  return (
    <div className="container col-md-8 mx-auto">
      <ErrorAlert error={error} />
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
          <BreadCrumb deckId={deckId} name={deck.name} screen={'Add Card'} />
          <h2>{deck.name}: Add Card</h2>
          <FormCard
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            front={formData.front}
            back={formData.back}
            deckId={deckId}
            cancel={'Cancel'}
            submit={'Submit'}
          />
        </>
      )}
    </div>
  )
}
