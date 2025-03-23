import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Shared/Header";
import NotFound from "./Components/Shared/NotFound";
import Home from "./Components/Home/Home";
import Deck from "./Components/Deck/Deck";
import Study from "./Components/Study/Study";
import CreateDeck from "./Components/Create-Deck/CreateDeck";
import EditDeck from "./Components/Edit-Deck/EditDeck";
import AddCard from "./Components/Add-Card/AddCard";
import EditCard from "./Components/Edit-Card/EditCard";

function Layout() {
    return (
        <>
            <Header />
            <div className="container">
                {/* TODO: Implement the screen starting here */}
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/decks/new" element={<CreateDeck />} />

                    <Route path="/decks/:deckId/study" element={<Study />} />

                    <Route path="/decks/:deckId/edit" element={<EditDeck />} />

                    <Route
                        path="/decks/:deckId/cards/new"
                        element={<AddCard />}
                    />

                    <Route
                        path="/decks/:deckId/cards/:cardId/edit"
                        element={<EditCard />}
                    />

                    <Route path="/decks/:deckId" element={<Deck />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default Layout;
