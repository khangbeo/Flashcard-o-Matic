import React from "react";
import { Link } from "react-router-dom";
import "./FormDeck.css";

export default function FormDeck({
    handleSubmit,
    handleChange,
    name,
    description,
    deckId,
}) {
    return (
        <form onSubmit={(event) => handleSubmit(event)} className="deck-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Deck Name"
                    onChange={handleChange}
                    value={name}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Brief description of the deck"
                    onChange={handleChange}
                    value={description}
                    required
                ></textarea>
            </div>
            <div className="form-actions">
                <Link
                    to={deckId ? `/decks/${deckId}` : "/"}
                    className="btn btn-outline-secondary"
                >
                    <i className="bi bi-x-lg"></i>
                    Cancel
                </Link>
                <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-lg"></i>
                    Submit
                </button>
            </div>
        </form>
    );
}
