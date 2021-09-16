import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, createCard } from '../../../utils/api'
import FormComponent from '../../FormComponent'

export default function AddCard() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState({})
  const initialFormState = {
    front: '',
    back: '',
  }
  const [formData, setFormData] = useState({ ...initialFormState })

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const response = await readDeck(deckId, abortController.signal)
        setDeck(response)
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
    alert("Card Saved")
    setFormData({ ...initialFormState })
    return response
  }

  return (
    <div className="container col-md-8 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <FormComponent 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        front={formData.front}
        back={formData.back}
        deckId={deckId}
        cancel={"Cancel"}
        submit={"Submit"}
      />
    </div>
  )
}
