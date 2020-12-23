import { rest, setupWorker } from 'msw';
import deckData from 'test/data/decks.json';
import flashcardData from 'test/data/flashcards.json';

let decks = [...deckData];
let flashcards = [...flashcardData];

const handlers = [
  rest.get('/api/decks', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(decks));
  }),
  rest.get('/api/deck/:deckId', (req, res, ctx) => {
    const deckId = req.params.deckId;
    return res(
      ctx.status(200),
      ctx.json({
        deckName: decks.find((deck) => deck.id === deckId).name,
        cards: flashcards.filter((flashcard) => flashcard.deckId === deckId)
      })
    );
  }),
  rest.delete('/api/deck/:deckId', (req, res, ctx) => {
    return res(ctx.status(500), ctx.text('route not configured'));
  }),
  rest.post('/api/deck', (req, res, ctx) => {
    return res(ctx.status(500), ctx.text('route not configured'));
  }),
  rest.post('/api/deck/:deckId/card', (req, res, ctx) => {
    return res(ctx.status(500), ctx.text('route not configured'));
  }),
  rest.put('/api/deck/:deckId/card/:cardId', (req, res, ctx) => {
    return res(ctx.status(500), ctx.text('route not configured'));
  }),
  rest.delete('/api/deck/:deckId/card/:cardId', (req, res, ctx) => {
    return res(ctx.status(500), ctx.text('route not configured'));
  })
];

const server = setupWorker(...handlers);
export { server };
