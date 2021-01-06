import * as React from 'react';
import Portal from '@reach/portal';
import FocusTrap from 'focus-trap-react';
import { FlashcardImage } from 'types';
import { usePopover } from 'utils/usePopover';
type props = {
  closeSearch: () => void;
  anchorEl: React.MutableRefObject<any>;
  setImage: React.Dispatch<React.SetStateAction<FlashcardImage>>;
};

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

export default function ImageSearch({
  closeSearch,
  anchorEl,
  setImage
}: props) {
  const containerRef = React.useRef();
  const inputRef = React.useRef(null);
  usePopover({
    containerRef,
    focusOnMountEl: inputRef,
    anchorEl,
    onClose: closeSearch
  });
  React.useEffect(() => {
    fetchImages(1, 'people')
      .then((res) => res.json())
      .then(console.log);
  });
  function handleSlashKeyPress(e: KeyboardEvent) {
    if (e.code === 'Slash' && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keyup', handleSlashKeyPress);
    return () => document.removeEventListener('keyup', handleSlashKeyPress);
  }, []);

  const images = new Array(12).fill(null);
  return (
    <Portal>
      <FocusTrap>
        <div
          ref={containerRef}
          className="absolute top-0 bottom-0 right-0 flex flex-col w-full max-w-screen-sm py-4 bg-gray-200"
        >
          <div className="relative flex px-4 mb-4">
            <button
              onClick={() => closeSearch()}
              className="absolute px-3 py-2 bg-gray-300"
            >
              Close
            </button>
            <form className="flex flex-col items-center flex-1">
              <label htmlFor="image-search" className="sr-only">
                Image Search
              </label>
              <input
                ref={inputRef}
                className="py-1"
                type="search"
                name="image-search"
                id="image-search"
                aria-describedby="describe-search"
              />
              <p id="describe-search">Search for an image...</p>
            </form>
          </div>
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {images.map((_, i) => {
                return (
                  <div
                    key={i}
                    className=""
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                      setImage({
                        alt: 'random image',
                        src: 'https://source.unsplash.com/random/400x400',
                        thumb: 'https://source.unsplash.com/random/400x400'
                      });
                      closeSearch();
                    }}
                  >
                    <img
                      src="https://source.unsplash.com/random/400x400"
                      alt="random image"
                    />
                  </div>
                );
              })}
            </div>
            <span>Loading...</span>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}
