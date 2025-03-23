import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Header from "./Layout/Components/Shared/Header";
import NotFound from "./Layout/Components/Shared/NotFound";
import Home from "./Layout/Components/Home/Home";
import Deck from "./Layout/Components/Deck/Deck";
import Study from "./Layout/Components/Study/Study";
import CreateDeck from "./Layout/Components/Create-Deck/CreateDeck";
import EditDeck from "./Layout/Components/Edit-Deck/EditDeck";
import AddCard from "./Layout/Components/Add-Card/AddCard";
import EditCard from "./Layout/Components/Edit-Card/EditCard";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
    return (
        <div className="app-routes">
            <Routes>
                <Route path="*" element={<Layout />} />
            </Routes>
        </div>
    );
}

export default App;
