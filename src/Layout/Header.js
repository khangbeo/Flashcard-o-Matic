import React from 'react'
import logo from './images/logo.png'

function Header() {
  return (
    <header className="jumbotron-fluid bg-dark p-4 mb-4">
      <div className="container text-white">
        <div className="d-flex flex-row justify-content-center flex-nowrap">
          <div className="col-sm-3">
            <img src={logo} className="img-fluid" alt="Responsive"></img>
          </div>
          <div className="col-sm-6 align-self-center">
            <h1 className="display-3">Flashcard-o-matic</h1>
            <p className="lead">Discover The Flashcard Difference.</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
