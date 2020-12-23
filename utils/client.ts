import { useQuery } from 'react-query';
import { client } from './fetch-wrapper';

function useDeckList() {
  return useQuery('decks', () => client('/decks'));
}

export { useDeckList };
