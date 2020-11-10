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
          src:
            'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ',
          alt: 'some text',
          thumb:
            'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ'
        }
      })
    },
    seeds(server) {
      const user = server.create('user');
      server.createList('deck', 2, { user }).forEach((deck) => {
        server.createList('flashcard', 3, { deck });
      });
    }
  });
}
