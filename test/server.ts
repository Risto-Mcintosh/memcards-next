import { rest, setupWorker } from "msw";
import deckData from "test/data/decks.json";
import flashcardData from "test/data/flashcards.json";
import { Flashcard } from "types";
import faker from "faker";

let decks = [...deckData];
let flashcards = [...flashcardData];
const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_API;

const handlers = [
  rest.get(`${API_BASE_URL}/decks`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(decks));
  }),
  rest.get(`${API_BASE_URL}/decks/:deckId`, (req, res, ctx) => {
    const deckId = req.params.deckId;
    const deck = decks.find((deck) => deck.id === deckId);
    return res(
      ctx.status(200),
      ctx.json({
        deck: { id: deck.id, name: deck.name },
        flashcards: flashcards.filter(
          (flashcard) => flashcard.deckId === deckId
        ),
      })
    );
  }),
  rest.delete(`${API_BASE_URL}/decks/:deckId`, (req, res, ctx) => {
    const deckId = req.params.deckId;
    decks = decks.filter((deck) => deck.id !== deckId);
    return res(ctx.status(204));
  }),
  rest.put<{ deckName: string }>(
    `${API_BASE_URL}/decks/:deckId`,
    (req, res, ctx) => {
      const deckId = req.params.deckId;
      const { deckName: name, ...rest } = req.body;
      const oldDeckIdx = decks.findIndex((deck) => deck.id === deckId);
      const newDeck = { ...decks[oldDeckIdx], ...rest, name };
      decks[oldDeckIdx] = newDeck;
      return res(ctx.status(200), ctx.json(newDeck));
    }
  ),
  rest.post<{ deckName: string }>(`${API_BASE_URL}/decks`, (req, res, ctx) => {
    const { deckName } = req.body;
    const newDeck = {
      id: faker.datatype.uuid(),
      cardCount: 0,
      name: deckName,
    };
    decks.push(newDeck);
    return res(ctx.status(201), ctx.json(newDeck));
  }),
  rest.post<Flashcard>(
    `${API_BASE_URL}/decks/:deckId/flashcards`,
    (req, res, ctx) => {
      const newFlashcard = {
        id: faker.datatype.uuid(),
        deckId: req.params.deckId,
        ...req.body,
      };
      flashcards = [...flashcards, newFlashcard];
      return res(ctx.status(201), ctx.json(newFlashcard));
    }
  ),
  rest.put(
    `${API_BASE_URL}/decks/:deckId/flashcards/:cardId`,
    (req, res, ctx) => {
      const cardId = req.params.cardId;
      const cardToEditIdx = flashcards.findIndex((card) => card.id === cardId);
      const oldCard = flashcards[cardToEditIdx];
      const reqBody: any = req.body;
      console.log({ reqBody });
      const newFlashcard = {
        id: oldCard.id,
        deckId: oldCard.deckId,
        ...reqBody,
      };
      flashcards[cardToEditIdx] = newFlashcard;
      return res(ctx.status(200), ctx.json(newFlashcard));
    }
  ),
  rest.delete(
    `${API_BASE_URL}/decks/:deckId/flashcards/:cardId`,
    (req, res, ctx) => {
      flashcards = flashcards.filter((card) => card.id !== req.params.cardId);
      const deckToEditIdx = deckData.findIndex(
        (deck) => deck.id === req.params.deckId
      );
      --deckData[deckToEditIdx].cardCount;
      return res(ctx.status(204));
    }
  ),
];

const server = setupWorker(...handlers);
export { server };
