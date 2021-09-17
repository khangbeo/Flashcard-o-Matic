import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { createDeck } from '../../../utils/api'
import BreadCrumb from '../Study/BreadCrumb'
import FormDeck from '../../FormDeck'

export default function CreateDeck() {
  const history = useHistory()
  const initialFormState = {
    name: '',
    description: '',
  }
  const [formData, setFormData] = useState({ ...initialFormState })
 
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const response = await createDeck({ ...formData }, abortController.signal)
    history.push(`/decks/${response.id}`)
    return response
  }
  return (
    <div className="container col-md-8 mx-auto">
      <BreadCrumb name={"Create Deck"}/>
      <h2>Create Deck</h2>
      <FormDeck 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        name={formData.name}
        description={formData.description}
      />
    </div>
  )
}
