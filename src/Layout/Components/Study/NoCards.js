import { Link } from "react-router-dom";
import "./Study.css";

export default function NoCards({ cards, deck }) {
    return (
        <div className="study-card">
            <div className="study-card-body text-center">
                <div className="mb-4">
                    <i className="bi bi-journal-text display-1 text-muted"></i>
                </div>
                <h2 className="study-title mb-3">Not Enough Cards</h2>
                <p className="text-muted mb-4">
                    You need at least 3 cards to study. There are {cards.length}{" "}
                    cards in this deck.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link
                        to={`/decks/${deck.id}/cards/new`}
                        className="study-button next"
                    >
                        <i className="bi bi-plus-lg"></i>
                        Add Cards
                    </Link>
                    <Link
                        to={`/decks/${deck.id}`}
                        className="study-button restart"
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back to Deck
                    </Link>
                </div>
            </div>
        </div>
    );
}
