import { Link } from "react-router-dom";
import React from "react";
import "./HomeScreen.css";

export default function HomeScreen({ decks, handleDelete }) {
    return (
        <main className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h2 mb-0">Flashcard Decks</h1>
                <Link className="btn btn-primary" to="/decks/new">
                    <i className="bi bi-plus-lg"></i> Create Deck
                </Link>
            </div>
            {decks.length === 0 ? (
                <div className="text-center py-5">
                    <i className="bi bi-journal-text display-1 text-muted mb-3"></i>
                    <h3 className="text-muted">No decks yet</h3>
                    <p className="text-muted">
                        Create your first deck to get started!
                    </p>
                    <Link className="btn btn-primary mt-3" to="/decks/new">
                        Create Your First Deck
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {decks.map((deck) => (
                        <div className="col-md-6 col-lg-4" key={deck.id}>
                            <div className="card h-100 shadow-sm hover-shadow transition-all">
                                <div className="card-header bg-primary text-white">
                                    <h3 className="card-title h5 mb-1">
                                        {deck.name}
                                    </h3>
                                    <p className="card-subtitle mb-0 text-white-50">
                                        {deck.cards.length}{" "}
                                        {deck.cards.length === 1
                                            ? "card"
                                            : "cards"}
                                    </p>
                                </div>
                                <div className="card-body d-flex flex-column">
                                    <p className="card-text flex-grow-1">
                                        {deck.description}
                                    </p>
                                    <div className="card-actions">
                                        <Link
                                            className="btn btn-outline-primary"
                                            to={`/decks/${deck.id}`}
                                        >
                                            <i className="bi bi-eye"></i>
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-primary"
                                            to={`/decks/${deck.id}/study`}
                                        >
                                            <i className="bi bi-book"></i>
                                            Study
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(deck)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
