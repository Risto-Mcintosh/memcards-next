import { rest } from 'msw';
import { setupWorker } from 'msw';

const handlers = [
  rest.get('/api/decks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'deck 1',
          cardCount: 5
        },
        {
          id: 2,
          name: 'deck 2',
          cardCount: 5
        },
        {
          id: 3,
          name: 'deck 3',
          cardCount: 5
        }
      ])
    );
  }),
  rest.get('/api/deck/:deckId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(generateFlashcards(3)));
  })
];

function generateFlashcards(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    front: `Front ${i + 1}`,
    back: `Back ${i + 1}`,
    image: {
      src: 'https://source.unsplash.com/random/400x400',
      alt: 'random image',
      thumb: null
    }
  }));
}

const server = setupWorker(...handlers);
export { server };
