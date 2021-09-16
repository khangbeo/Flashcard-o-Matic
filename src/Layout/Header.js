import React from 'react'
import logo from './images/logo.png'

function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <div className="row d-flex justify-content-center flex-nowrap">
          <div className="col-sm-3">
            <img src={logo} className="img-fluid" alt="Responsive"></img>
          </div>
          <div className="col-sm-6 align-self-center">
            <h1 className="display-4">Flashcard-o-matic</h1>
            <p className="lead">Discover The Flashcard Difference.</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
