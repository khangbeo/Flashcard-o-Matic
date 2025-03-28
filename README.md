# StudyCards

A modern, user-friendly flashcard application for effective studying.

## Live Demo

-   Frontend: https://flashcard-o-matic-six.vercel.app/
-   Backend: https://flashcard-json-server-o6n5.onrender.com/

## Features

-   Create and manage study decks
-   Add, edit, and delete cards
-   Interactive study mode with card flipping
-   Clean, modern user interface
-   Responsive design for all devices

## Tech Stack

-   React.js
-   React Router v6
-   Bootstrap 5
-   Bootstrap Icons
-   JSON Server

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/StudyCards.git
cd StudyCards
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Start the JSON server (in a separate terminal)

```bash
npm run server
```

The app will be available at `http://localhost:3000`

## Usage

1. Create a new deck by clicking the "Create Deck" button
2. Add cards to your deck
3. Study your cards using the interactive study mode
4. Track your progress and review as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Links

-   Json-server: https://github.com/khangbeo/Flashcard-json-server
-   Deployed app: https://flashcard-o-matic.netlify.app/

## Installation

Fork and clone this repo, then run `npm install` for the associated dependencies.

Run `npm start` to start the project

## Basic Info

I made a flashcard web app for the Thinkful front-end capstone project. The app allows users to create and edit their own deck of flashcards and study with the flashcards. Users can add more cards to the deck and edit the cards.

The project was intended to be used as part of a study program using flashcards.

## Responsibilities

Design the layout of the app and implemented all required functionalities.

## Routes

| Screen      | Path                                                 |
| ----------- | ---------------------------------------------------- |
| Home        | /                                                    |
| Deck        | /decks/:deckId                                       |
| Create Deck | /decks/new                                           |
| Edit Deck   | /decks/:deckId/edit                                  |
| Add Card    | /decks/:deckId/cards/new                             |
| Edit Card   | /decks/:deckId/cards/:cardId/edit                    |
| Study       | /decks/:deckId/study                                 |
| Study       | /decks/:deckId/study clicking flip shows next button |
| Study       | /decks/:deckId/study not enough cards                |

## Tech Stacks

-   React
-   React Router
-   Bootstrap
-   HTML
-   CSS

## Discoveries

Initially, I struggled with defining the layout of the project. To get over this hurdle, I sketched out what I thought the layout should look like and built each components one by one. The hardest part to design were the form components and their routes. I built individual components for the forms so I had a lot of repeated codes for AddCard/EditCard and AddDeck/EditDeck. I also had some difficulties with using the ternary operator to render the respective form components. Eventually, I figured I could chain ternary operators to show what I wanted in the forms. With that discovery, I was able to reduce the amount of code and components that I needed to design. The other components were easy to design as they were individual pieces and didn't need to show anything else.

## Goals

Future goals for the project:

-   adding a way to track correct and wrong answers
-   adding animation for flipping flashcards
-   rework card flipping functionalities
-   refactor and clean up code
-   refactor styling to move away from a generic design

## Home

![Home](/images/home.PNG)

## Deck

![Deck](/images/deck-deckId.PNG)

## Create Deck

![Create Deck](/images/create-deck.PNG)

## Edit Deck

![Edit Deck](/images/edit-deck.PNG)

## Add Card

![Add Card](/images/add-card.PNG)

## Edit Card

![Edit Card](/images/edit-card.PNG)

## Delete Deck

![Delete Deck](/images/delete-deck.PNG)

## Delete Card

![Delete Card](/images/delete-card.PNG)

## Study

### Front

![Study Front](/images/study.PNG)

### Back

![Study Back](/images/study-flip.PNG)

### Not Enough Cards

![No Cards](/images/not-enough-cards.PNG)
