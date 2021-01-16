import * as React from 'react';

type Image = {
  alt_description: string;
  urls: {
    small: string;
    thumb: string;
  };
};

type UnsplashResponse = {
  results: Image[];
  total_pages: number;
};

type UseUnsplash = {
  images: Image[];
  status: 'idle' | 'loading' | 'error';
  searchTerm: string | null;
  prevSearchTerm: string | null;
  page: number;
  hasMore: boolean;
};

type Action = {
  type: string;
} & Partial<UseUnsplash>;

const actionTypes = {
  getImages: 'GET_ITEMS',
  getImagesSuccess: 'GET_ITEMS_SUCCESS'
};

function reducer(state: UseUnsplash, action: Action): UseUnsplash {
  switch (action.type) {
    case actionTypes.getImages:
      const currentSearchTerm = action.searchTerm ?? state.searchTerm;
      return {
        ...state,
        searchTerm: currentSearchTerm,
        images: state.prevSearchTerm !== currentSearchTerm ? [] : state.images,
        status: 'loading'
      };
    case actionTypes.getImagesSuccess:
      return {
        ...state,
        prevSearchTerm: state.searchTerm,
        page: state.page + 1,
        status: 'idle',
        images: state.images.concat(action.images),
        hasMore: action.hasMore
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

export function useUnsplash() {
  const [
    { images, status, searchTerm, prevSearchTerm, page, hasMore },
    dispatch
  ] = React.useReducer<(state: UseUnsplash, action: Action) => UseUnsplash>(
    reducer,
    {
      images: [],
      status: 'idle',
      searchTerm: '',
      prevSearchTerm: '',
      page: 1,
      hasMore: false
    }
  );

  const fetchSuccess = ({ images, hasMore }: Partial<UseUnsplash>) =>
    dispatch({ type: actionTypes.getImagesSuccess, images, hasMore });

  const initialize = (searchTerm = null) =>
    dispatch({ type: actionTypes.getImages, searchTerm });

  const getImages = React.useCallback(
    (term: string = null) => {
      if (prevSearchTerm === term) {
        console.log('same term as last');
        return;
      }
      initialize(term);
      console.log({ searchTerm, page, term });
      fetch(
        `https://api.unsplash.com/search/photos?page=${page}&query=${
          term ?? searchTerm
        }&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_ID}`
          }
        }
      )
        .then((res) => res.json())
        .then((data: UnsplashResponse) => {
          console.log(data);
          fetchSuccess({
            images: data.results,
            hasMore: page < data.total_pages
          });
        });
    },
    [prevSearchTerm, searchTerm, page]
  );

  return {
    getImages,
    status,
    images,
    hasMore
  };
}
