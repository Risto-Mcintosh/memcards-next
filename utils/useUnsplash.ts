import * as React from 'react';

function fetchImages(pageNumber, searchTerm) {
  return fetch(
    `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchTerm}&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_ID}`
      }
    }
  );
}

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
        status: 'loading'
      };
    case actionTypes.getImagesSuccess:
      return {
        ...state,
        page: state.page++,
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
    page: 0
  });

  const fetchSuccess = (images) =>
    dispatch({ type: actionTypes.getImagesSuccess, images });

  function fetchMore() {
    if (prevSearchTerm === searchTerm) return;
    dispatch({ type: actionTypes.getImages });
    fetchImages(page, searchTerm)
      .then((res) => res.json())
      .then((data) => fetchSuccess(data.results));
  }

  function getImages(searchTerm) {
    dispatch({ type: actionTypes.getImages, searchTerm });
    fetchImages(page, searchTerm)
      .then((res) => res.json())
      .then((data) => {
        fetchSuccess(data.results);
      });
  }

  return {
    getImages,
    fetchMore,
    status,
    images
  };
}
