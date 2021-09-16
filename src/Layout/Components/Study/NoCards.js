import { Link } from 'react-router-dom'

export default function NoCards({ cards, deck }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
        Add Cards
      </Link>
    </div>
  )
}
