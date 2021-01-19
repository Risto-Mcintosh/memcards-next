import { rest, setupWorker } from 'msw';
import deckData from 'test/data/decks.json';
import flashcardData from 'test/data/flashcards.json';
import { Flashcard } from 'types';

let decks = [...deckData];
let flashcards = [...flashcardData];

const handlers = [
  rest.get('/api/decks', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(decks));
  }),
  rest.get('/api/deck/:deckId', (req, res, ctx) => {
    const deckId = req.params.deckId;
    const deck = decks.find((deck) => deck.id === deckId);
    return res(
      ctx.status(200),
      ctx.json({
        deck: { id: deck.id, name: deck.name },
        flashcards: flashcards.filter(
          (flashcard) => flashcard.deckId === deckId
        )
      })
    );
  }),
  rest.delete('/api/deck/:deckId', (req, res, ctx) => {
    const deckId = req.params.deckId;
    decks = decks.filter((deck) => deck.id !== deckId);
    return res(ctx.status(204));
  }),
  rest.put<{ deckName: string }>('/api/deck/:deckId', (req, res, ctx) => {
    const deckId = req.params.deckId;
    const { deckName: name, ...rest } = req.body;
    const oldDeckIdx = decks.findIndex((deck) => deck.id === deckId);
    const newDeck = { ...decks[oldDeckIdx], ...rest, name };
    decks[oldDeckIdx] = newDeck;
    return res(ctx.status(200), ctx.json(newDeck));
  }),
  rest.post<{ deckName: string }>('/api/deck', (req, res, ctx) => {
    const { deckName } = req.body;
    const newDeck = {
      id: (decks.length + 1).toString(),
      cardCount: 0,
      name: deckName
    };
    decks.push(newDeck);
    return res(ctx.status(201), ctx.json(newDeck));
  }),
  rest.post<Flashcard>('/api/deck/:deckId/card', (req, res, ctx) => {
    const newFlashcard = {
      id: flashcards.length.toString(),
      deckId: req.params.deckId,
      ...req.body
    };
    flashcards = [...flashcards, newFlashcard];
    return res(ctx.status(201), ctx.json(newFlashcard));
  }),
  rest.put('/api/deck/:deckId/card/:cardId', (req, res, ctx) => {
    const cardId = req.params.cardId;
    const cardToEditIdx = flashcards.findIndex((card) => card.id === cardId);
    const oldCard = flashcards[cardToEditIdx];
    const reqBody: any = req.body;
    console.log({ reqBody });
    const newFlashcard = {
      id: oldCard.id,
      deckId: oldCard.deckId,
      ...reqBody
    };
    flashcards[cardToEditIdx] = newFlashcard;
    return res(ctx.status(200), ctx.json(newFlashcard));
  }),
  rest.delete('/api/deck/:deckId/card/:cardId', (req, res, ctx) => {
    flashcards = flashcards.filter((card) => card.id !== req.params.cardId);
    const deckToEditIdx = deckData.findIndex(
      (deck) => deck.id === req.params.deckId
    );
    --deckData[deckToEditIdx].cardCount;
    return res(ctx.status(204));
  })
];

const server = setupWorker(...handlers);
export { server };
