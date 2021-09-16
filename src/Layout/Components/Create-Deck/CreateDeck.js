import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { createDeck } from '../../../utils/api'

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
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={formData.description}
            required
          ></textarea>
        </div>
        <Link to="/" className="btn btn-secondary mb-4 mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary mb-4">
          Submit
        </button>
      </form>
    </>
  )
}
