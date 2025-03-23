import React from "react";
import { MemoryRouter } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import {
    createCard,
    createDeck,
    deleteCard,
    deleteDeck,
    listCards,
    listDecks,
    readCard,
    readDeck,
    updateCard,
    updateDeck,
} from "../utils/api";

require("cross-fetch/polyfill");

jest.mock("../utils/api");

describe("App", () => {
    beforeEach(() => {
        createCard.mockResolvedValue({
            id: 1,
            front: "Default mock response. If you see this, you probably do not need this API call.",
            back: "Back of card",
            deckId: 1,
        });
        createDeck.mockResolvedValue({
            id: 1,
            name: "Default mock response. If you see this, you probably do not need this API call.",
            description: "Description",
        });
        deleteCard.mockResolvedValue({});
        deleteDeck.mockResolvedValue({});
        listCards.mockResolvedValue([
            {
                id: 1,
                front: "Default mock response. If you see this, you probably do not need this API call.",
                back: "Back of card",
                deckId: 1,
            },
        ]);
        listDecks.mockResolvedValue([
            {
                id: 1,
                name: "Default mock response. If you see this, you probably do not need this API call.",
                description: "Description",
                cards: [],
            },
        ]);
        readCard.mockResolvedValue({
            id: 1,
            front: "Default mock response. If you see this, you probably do not need this API call.",
            back: "Back of card",
            deckId: 1,
        });
        readDeck.mockResolvedValue({
            id: 1,
            name: "Default mock response. If you see this, you probably do not need this API call.",
            description: "Description",
            cards: [],
        });
        updateCard.mockResolvedValue({
            id: 1,
            front: "Default mock response. If you see this, you probably do not need this API call.",
            back: "Back of card",
            deckId: 1,
        });
        updateDeck.mockResolvedValue({
            id: 1,
            name: "Default mock response. If you see this, you probably do not need this API call.",
            description: "Description",
            cards: [],
        });
    });

    test('landing on a bad page shows "Not Found" page', () => {
        render(
            <MemoryRouter initialEntries={["/some/bad/route"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Not Found")).toBeTruthy();
    });

    test("route for /", async () => {
        const mockDecks = [
            {
                id: 1,
                name: "Mock Rendering in React",
                description: "RIR",
                cards: [{ id: 2 }, { id: 3 }],
            },
            {
                name: "Mock React Router",
                description: "RR",
                id: 2,
                cards: [],
            },
        ];

        listDecks.mockResolvedValue(mockDecks);

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <App />
                </MemoryRouter>
            );
        });

        expect(screen.getByText("Mock Rendering in React")).toBeTruthy();
        expect(screen.getByText("2 cards")).toBeTruthy();
        expect(screen.getByText("Mock React Router")).toBeTruthy();
        expect(screen.getByText("0 cards")).toBeTruthy();
    });
});
