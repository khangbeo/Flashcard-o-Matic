import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { readDeck, readCard, updateCard } from '../../../utils/api'
import FormCard from '../../FormCard'
import BreadCrumb from '../Study/BreadCrumb'

export default function EditCard() {
  const { deckId, cardId } = useParams()
  const history = useHistory()
  const [deck, setDeck] = useState({})
  const [card, setCard] = useState({})

  useEffect(() => {
    setDeck({})
    async function getData() {
      const abortController = new AbortController()
      try {
        const deckFromAPI = await readDeck(deckId, abortController.signal)
        const cardFromAPI = await readCard(cardId, abortController.signal)
        setDeck(deckFromAPI)
        setCard(cardFromAPI)
      } catch (error) {
        console.log(error)
      }
      return () => {
        abortController.abort()
      }
    }
    getData()
  }, [deckId, cardId])
 
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await updateCard({ ...card }, abortController.signal)
    history.push(`/decks/${deckId}`)
    return response
  }
  return (
    <div className="container col-md-8 mx-auto">
      <BreadCrumb deckId={deckId} name={`Deck ${deck.name}`} screen={`Edit Card ${card.id}`}/>
      <h2>Edit Card</h2>
      <FormCard 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        front={card.front}
        back={card.back}
        deckId={deckId}
        cancel={"Done"}
        submit={"Save"}
      />
    </div>
  )
}
