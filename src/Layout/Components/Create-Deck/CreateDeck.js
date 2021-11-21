import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createDeck } from '../../../utils/api'
import BreadCrumb from '../Shared/BreadCrumb'
import FormDeck from '../Shared/FormDeck'
import ReactLoading from 'react-loading'

export default function CreateDeck() {
  const history = useHistory()
  const initialFormState = {
    name: '',
    description: '',
  }
  const [formData, setFormData] = useState({ ...initialFormState })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setTimeout(() => setIsLoading(true), 500)
    return () => {
      controller.abort()
    }
  }, [])

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
      {!isLoading ? (
        <ReactLoading type={'spin'} color={'#000'} width={100} height={100} className='mx-auto mt-5'/>
      ) : (
        <>
          <BreadCrumb name={'Create Deck'} />
          <h2>Create Deck</h2>
          <FormDeck
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            name={formData.name}
            description={formData.description}
          />
        </>
      )}
    </div>
  )
}
