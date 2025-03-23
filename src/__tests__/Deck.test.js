import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
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
import userEvent from "@testing-library/user-event";

require("cross-fetch/polyfill");

jest.mock("../utils/api");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
    useParams: () => ({ deckId: "3", cardId: "4" }),
}));

describe("Decks", () => {
    beforeEach(() => {
        createCard.mockResolvedValue({
            front: "Default mock response. If you see this, you probably do not need this API call.",
        });
        createDeck.mockResolvedValue({
            name: "Default mock response. If you see this, you probably do not need this API call.",
        });
        deleteCard.mockResolvedValue({
            front: "Default mock response. If you see this, you probably do not need this API call.",
        });
        deleteDeck.mockResolvedValue({
            name: "Default mock response. If you see this, you probably do not need this API call.",
        });
        listCards.mockResolvedValue([
            {
                front: "Default mock response. If you see this, you probably do not need this API call.",
            },
        ]);
        listDecks.mockResolvedValue([
            {
                front: "Default mock response. If you see this, you probably do not need this API call.",
            },
        ]);
        readCard.mockResolvedValue({
            front: "Default mock response. If you see this, you probably do not need this API call.",
        });
        readDeck.mockResolvedValue({
            name: "Default mock response. If you see this, you probably do not need this API call.",
        });
        updateCard.mockResolvedValue({
            front: "Default mock response. If you see this, you probably do not need this API call.",
        });
        updateDeck.mockResolvedValue({
            name: "Default mock response. If you see this, you probably do not need this API call.",
        });
    });

    test("route for /decks/:deckId", async () => {
        const mockDeck = {
            name: "Mock Deck 3",
            description: "MD",
            id: 3,
            cards: [
                {
                    id: 4,
                    front: "What has ears but cannot hear?",
                    back: "A cornfield.",
                    deckId: 8,
                },
            ],
        };

        readDeck.mockResolvedValue(mockDeck);

        render(
            <MemoryRouter initialEntries={["/decks/3"]}>
                <App />
            </MemoryRouter>
        );

        const titleElements = await screen.findAllByText("Mock Deck 3");
        expect(titleElements.length).toBeGreaterThanOrEqual(1);

        expect(screen.getByText("What has ears but cannot hear?")).toBeTruthy();
        expect(screen.getByText("A cornfield.")).toBeTruthy();
    });

    test("route for /decks/new", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/decks/new"]}>
                <App />
            </MemoryRouter>
        );

        const titleElements = await screen.findAllByText("Create Deck");
        expect(titleElements.length).toBeGreaterThanOrEqual(1);

        const inputs = container.querySelectorAll("input");
        expect(inputs).toHaveLength(1);

        const textAreas = container.querySelectorAll("textarea");
        expect(textAreas).toHaveLength(1);
    });

    test("route for /decks/:deckId/edit", async () => {
        const mockDeck = {
            name: "Mock Deck 33",
            description: "MD33",
            id: 33,
            cards: [],
        };

        readDeck.mockResolvedValue(mockDeck);

        render(
            <MemoryRouter initialEntries={["/decks/33/edit"]}>
                <App />
            </MemoryRouter>
        );

        const nameInput = await screen.findByDisplayValue("Mock Deck 33");
        expect(nameInput).toBeTruthy();

        const descriptionInput = await screen.findByDisplayValue("MD33");
        expect(descriptionInput).toBeTruthy();
    });

    test("route for /decks/:deckId/cards/new", async () => {
        const mockDeck = {
            name: "Mock squash",
            description: "MS",
            id: 4,
            cards: [],
        };

        readDeck.mockResolvedValue(mockDeck);

        const { container } = render(
            <MemoryRouter initialEntries={["/decks/4/cards/new"]}>
                <App />
            </MemoryRouter>
        );

        const deckNameElements = await screen.findAllByText("Mock squash");
        expect(deckNameElements.length).toBeGreaterThanOrEqual(1);

        const titleElements = await screen.findAllByText("Add Card");
        expect(titleElements.length).toBeGreaterThanOrEqual(1);

        const textAreas = container.querySelectorAll("textarea");
        expect(textAreas).toHaveLength(2);
    });

    test("route for /decks/:deckId/cards/:cardId/edit", async () => {
        const cardTen = {
            id: 10,
            front: "What did the left eye say to the right eye?",
            back: "Between us, something smells!",
            deckId: 8,
        };

        const mockDeck = {
            name: "Mock invite",
            description: "MI",
            id: 8,
            cards: [
                {
                    id: 9,
                    front: "What has ears but cannot hear?",
                    back: "A cornfield.",
                    deckId: 8,
                },
                cardTen,
            ],
        };

        readDeck.mockResolvedValue(mockDeck);
        readCard.mockResolvedValue(cardTen);

        render(
            <MemoryRouter initialEntries={["/decks/9/cards/10/edit"]}>
                <App />
            </MemoryRouter>
        );

        const frontTextArea = await screen.findByDisplayValue(
            "What did the left eye say to the right eye?"
        );
        expect(frontTextArea).toBeTruthy();
    });

    test("route for /decks/:deckId/study", async () => {
        const mockDeck = {
            name: "Mock Study Deck 42",
            description: "MDS42",
            id: 42,
            cards: [
                {
                    id: 43,
                    front: "What did one plate say to the other plate?",
                    back: "Dinner is on me!",
                    deckId: 42,
                },
                {
                    id: 44,
                    front: "Why did the student eat his homework?",
                    back: "Because the teacher told him it was a piece of cake!",
                    deckId: 42,
                },
                {
                    id: 45,
                    front: "What did the Dalmatian say after lunch?",
                    back: "That hit the spot!",
                    deckId: 42,
                },
            ],
        };

        readDeck.mockResolvedValue(mockDeck);

        render(
            <MemoryRouter initialEntries={["/decks/42/study"]}>
                <App />
            </MemoryRouter>
        );

        const titleElements = await screen.findAllByText("Mock Study Deck 42");
        expect(titleElements.length).toBeGreaterThanOrEqual(1);

        expect(
            screen.getByText("What did one plate say to the other plate?")
        ).toBeTruthy();

        // Click the Flip button to show the back of the card
        const flipButton = screen.getByText("Flip");
        await act(async () => {
            await userEvent.click(flipButton);
        });

        // Now check for the back text
        expect(screen.getByText("Dinner is on me!")).toBeTruthy();
    });
});
