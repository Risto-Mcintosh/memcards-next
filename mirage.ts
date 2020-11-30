import { belongsTo, createServer, Factory, hasMany, Model } from 'miragejs';

function makeServer(environment: string = 'test') {
  const server = createServer({
    environment,
    models: {
      user: Model.extend({
        deck: hasMany()
      }),
      deck: Model.extend({
        user: belongsTo(),
        data: hasMany('flashcard')
      }),
      flashcard: Model.extend({
        deck: belongsTo()
      })
    },
    factories: {
      deck: Factory.extend({
        name(i) {
          return `Test Deck ${i + 1}`;
        },
        cardCount: 0,
        editable: true
      }),
      flashcard: Factory.extend({
        front(i) {
          return `front ${i}`;
        },
        back(i) {
          return `back ${i}`;
        },
        image: {
          src: 'https://source.unsplash.com/random/400x400',
          alt: 'some text',
          thumb: 'https://source.unsplash.com/random/400x400'
        }
      })
    },
    seeds(server) {
      const user = server.create('user');
      server.createList('deck', 2, { user }).forEach((deck) => {
        server.createList('flashcard', 3, { deck });
      });
    },
    routes() {
      this.namespace = process.env.NEXT_PUBLIC_CLIENT_API;
      this.get('/decks', (schema) => {
        return schema.db.decks;
      });
    }
  });
  return server;
}
export { makeServer };
