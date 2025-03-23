import "./Study.css";

export default function AllCards({
    cards,
    cardNumber,
    front,
    setFront,
    setCardNumber,
    navigate,
}) {
    function flipCard() {
        if (front) {
            setFront(false);
        } else {
            setFront(true);
        }
    }

    function nextCard(index, total) {
        if (index + 1 <= total) {
            setCardNumber(cardNumber + 1);
            setFront(true);
        } else {
            if (window.confirm("Are you sure you want to restart?")) {
                setCardNumber(1);
                setFront(true);
            } else {
                window.location.href = "/";
            }
        }
    }

    function restartCard() {
        setCardNumber(1);
        setFront(true);
    }

    return (
        <div className="study-card">
            {cards.map((card, index) =>
                index === cardNumber - 1 ? (
                    <div className="study-card-body" key={index}>
                        <div className="study-card-header">
                            <h5 className="study-card-title">
                                Card {index + 1} of {cards.length}
                            </h5>
                            <button
                                className="study-button restart"
                                onClick={() => restartCard()}
                            >
                                <i className="bi bi-arrow-counterclockwise"></i>
                                Restart
                            </button>
                        </div>
                        <div
                            className={`study-card-content ${
                                front ? "front" : "back"
                            }`}
                            onClick={flipCard}
                        >
                            <div className="study-card-text">
                                {front ? card.front : card.back}
                            </div>
                        </div>
                        <div className="study-card-actions">
                            {!front && (
                                <button
                                    className="study-button next"
                                    onClick={() =>
                                        nextCard(index + 1, cards.length)
                                    }
                                >
                                    <i className="bi bi-arrow-right"></i>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                ) : null
            )}
        </div>
    );
}
