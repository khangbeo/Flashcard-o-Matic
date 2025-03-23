import { Link } from "react-router-dom";
import "./BreadCrumb.css";

export default function BreadCrumb({ deckId, name, screen }) {
    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/" className="breadcrumb-link">
                        <i className="bi bi-house-door"></i>
                        Home
                    </Link>
                </li>
                {deckId ? (
                    <li className="breadcrumb-item">
                        <Link
                            to={`/decks/${deckId}`}
                            className="breadcrumb-link"
                        >
                            {name}
                        </Link>
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
    );
}
