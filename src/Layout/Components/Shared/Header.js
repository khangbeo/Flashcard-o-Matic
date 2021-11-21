import React from 'react'
import logo from '../../images/logo.png'

function Header() {
  return (
    <header className="container-fluid bg-dark py-4 mb-4">
      <div className="text-white text-center">
        <div>
          <h1 className="display-4">
            <img src={logo} alt="Responsive" style={{ maxWidth: '7%' }}></img>
            Flashcard-o-matic
          </h1>
          <p className="lead">Awesome Flashcards for Awesome People</p>
        </div>
      </div>
    </header>
  )
}

export default Header
