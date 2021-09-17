import { Link } from 'react-router-dom'

export default function BreadCrumb({ deckId, name, screen }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {deckId ? (
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{name}</Link>
          </li>
        ) : (
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        )}
        {deckId && (
          <li className="breadcrumb-item active" aria-current="page">
            {screen}
          </li>
        )}
      </ol>
    </nav>
  )
}
