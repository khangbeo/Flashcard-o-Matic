import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Components/Shared/Header'
import NotFound from './Components/Shared/NotFound'
import Home from './Components/Home/Home'
import Deck from './Components/Deck/Deck'
import Study from './Components/Study/Study'
import CreateDeck from './Components/Create-Deck/CreateDeck'
import EditDeck from './Components/Edit-Deck/EditDeck'
import AddCard from './Components/Add-Card/AddCard'
import EditCard from './Components/Edit-Card/EditCard'

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route exact={true} path="/decks/:deckId">
            <Deck />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Layout
