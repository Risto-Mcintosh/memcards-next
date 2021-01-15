import * as React from 'react';

const actionTypes = {
  getImages: 'GET_ITEMS',
  getImagesSuccess: 'GET_ITEMS_SUCCESS'
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.getImages:
      return {
        ...state,
        searchTerm: action.searchTerm ?? state.searchTerm,
        images: action.searchTerm ? [] : state.images,
        page: action.searchTerm ? 1 : state.page + 1,
        status: 'loading'
      };
    case actionTypes.getImagesSuccess:
      return {
        ...state,
        prevSearchTerm: state.searchTerm,
        status: 'idle',
        images: state.images.concat(action.images)
      };
    default:
      break;
  }
}

export function useUnsplash() {
  const [
    { images, status, searchTerm, prevSearchTerm, page },
    dispatch
  ] = React.useReducer(reducer, {
    images: [],
    status: 'idle',
    searchTerm: '',
    prevSearchTerm: '',
    page: 1
  });

  const fetchSuccess = (images) =>
    dispatch({ type: actionTypes.getImagesSuccess, images });

  const initialize = (searchTerm = null) =>
    dispatch({ type: actionTypes.getImages, searchTerm });

  const getImages = React.useCallback(
    ({ term = null, pageNumber = 1 }) => {
      console.count('rendered');

      console.log({ searchTerm, pageNumber, term });
      return fetch(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${
          term ?? searchTerm
        }&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_ID}`
          }
        }
      );
    },
    [searchTerm]
  );

  return {
    getImages,
    prevSearchTerm,
    fetchSuccess,
    searchTerm,
    status,
    images,
    page,
    initialize
  };
}
