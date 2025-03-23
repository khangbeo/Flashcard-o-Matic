import React, { useEffect, useState } from "react";
import { readDeck } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import NoCards from "./NoCards";
import AllCards from "./AllCards";
import BreadCrumb from "../Shared/BreadCrumb";
import ReactLoading from "react-loading";
import ErrorAlert from "../Shared/ErrorAlert";
import "./Study.css";

export default function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, setFront] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setError(null);
        setDeck({});
        setCards([]);
        getData(deckId);
    }, [deckId]);

    async function getData(deckId) {
        const abortController = new AbortController();
        try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
            setCards(response.cards);
            setIsLoading(true);
        } catch (error) {
            console.log(error);
            setError(error);
        }
        return () => {
            abortController.abort();
        };
    }

    return (
        <div className="study-container">
            <ErrorAlert error={error} />
            {!isLoading ? (
                <div className="loading-container">
                    <ReactLoading
                        type={"spin"}
                        color={"#0d6efd"}
                        width={100}
                        height={100}
                    />
                </div>
            ) : (
                <>
                    <BreadCrumb
                        deckId={deckId}
                        name={deck.name}
                        screen={"Study"}
                    />
                    <div className="study-header">
                        <h2 className="study-title">Study: {deck.name}</h2>
                    </div>
                    <div>
                        {cards.length === 0 ? (
                            <NoCards cards={cards} deck={deck} />
                        ) : cards.length > 2 ? (
                            <AllCards
                                cards={cards}
                                cardNumber={cardNumber}
                                front={front}
                                setFront={setFront}
                                setCardNumber={setCardNumber}
                                navigate={navigate}
                            />
                        ) : (
                            <NoCards cards={cards} deck={deck} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
