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
  errorMsg: string | null;
};

type Options = {
  limit?: number;
};

type Action = {
  type: string;
} & Partial<UseUnsplash>;

const actionTypes = {
  getImages: 'GET_IMAGES',
  getImagesSuccess: 'GET_IMAGES_SUCCESS',
  getImagesError: 'GET_IMAGES_ERROR'
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
    case actionTypes.getImagesError:
      return {
        ...state,
        prevSearchTerm: state.searchTerm,
        status: 'error',
        hasMore: false
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

export function useUnsplash({ limit = 9 }: Options = {}) {
  const [
    { images, status, searchTerm, prevSearchTerm, page, hasMore, errorMsg },
    dispatch
  ] = React.useReducer<(state: UseUnsplash, action: Action) => UseUnsplash>(
    reducer,
    {
      images: [],
      status: 'idle',
      searchTerm: '',
      prevSearchTerm: '',
      page: 1,
      hasMore: false,
      errorMsg: null
    }
  );

  const setError = ({ errorMsg }: Partial<UseUnsplash>) =>
    dispatch({ type: actionTypes.getImagesError, errorMsg });

  const getImages = React.useCallback(
    (term: string = null) => {
      if (prevSearchTerm === term) {
        console.log('same term as last');
        return;
      }
      dispatch({ type: actionTypes.getImages, searchTerm: term });
      fetch(
        `https://api.unsplash.com/search/photos?per_page=${limit}&page=${page}&query=${
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
          dispatch({
            type: actionTypes.getImagesSuccess,
            images: data.results,
            hasMore: page < data.total_pages
          });
        })
        .catch((error) => {
          console.log(error);
          setError({ errorMsg: error });
        });
    },
    [prevSearchTerm, searchTerm, page]
  );

  return {
    getImages,
    status,
    images,
    hasMore,
    errorMsg
  };
}
