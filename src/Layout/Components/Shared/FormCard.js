import React from "react";
import { Link } from "react-router-dom";
import "./FormCard.css";

export default function FormComponent({
    handleSubmit,
    handleChange,
    front,
    back,
    deckId,
    cancel,
    submit,
}) {
    return (
        <form onSubmit={handleSubmit} className="card-form">
            <div className="form-group">
                <label htmlFor="front" className="form-label">
                    Front
                </label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    rows="3"
                    placeholder="Front side of card"
                    onChange={handleChange}
                    value={front}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back" className="form-label">
                    Back
                </label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    rows="3"
                    placeholder="Back side of card"
                    onChange={handleChange}
                    value={back}
                    required
                ></textarea>
            </div>
            <div className="form-actions">
                <Link
                    to={`/decks/${deckId}`}
                    className="btn btn-outline-secondary"
                >
                    <i className="bi bi-x-lg"></i>
                    {cancel}
                </Link>
                <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-lg"></i>
                    {submit}
                </button>
            </div>
        </form>
    );
}
