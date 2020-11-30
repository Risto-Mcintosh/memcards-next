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
  })
];

const server = setupWorker(...handlers);
export { server };
