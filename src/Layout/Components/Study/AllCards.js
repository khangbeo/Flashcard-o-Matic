import frontCard from '../../images/frontCard.png'
import backCard from '../../images/backCard.png'
export default function AllCards({
  cards,
  cardNumber,
  front,
  setFront,
  setCardNumber,
  history,
}) {
  function flipCard() {
    if (front) {
      setFront(false)
    } else {
      setFront(true)
    }
  }
  function nextCard(index, total) {
    if (index < total) {
      setCardNumber(cardNumber + 1)
      setFront(true)
    } else {
      if (window.confirm('Restart? Click cancel to return to the home page.')) {
        setCardNumber(1)
        setFront(true)
      } else {
        history.push('/')
      }
    }
  }

  function restartCard(index, total) {
    setCardNumber(1)
    setFront(true)
  }

  function nextButton(cards, index) {
    if (front) {
      return null
    } else {
      return (
        <button
          className="btn btn-primary mx-1"
          onClick={() => nextCard(index + 1, cards.length)}
        >
          Next
        </button>
      )
    }
  }

  return (
    <div className="card">
      {cards.map((card, index) => {
        if (index === cardNumber - 1) {
          return (
            <div className="card-body" key={index}>
              <div className="row d-flex justify-content-between">
                <div className="col-8">
                  {/* Restart Button */}
                  <button
                    className="btn btn-info mb-2"
                    onClick={() => restartCard(cards, index)}
                  >
                    Restart
                  </button>
                  <h5 className="card-title">
                    {`Card ${index + 1} of ${cards.length}`}
                  </h5>
                  <p className="card-text">{front ? card.front : card.back}</p>

                  <button className="btn btn-secondary mx-1" onClick={flipCard}>
                    Reveal Answer
                  </button>
                  {nextButton(cards, index)}
                </div>
                <div className="col-4">
                  {
                    <img
                      src={front ? frontCard : backCard}
                      className="img-fluid"
                    ></img>
                  }
                </div>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
