import * as React from 'react';
import { usePopover } from 'utils/usePopover';
type props = {
  closeSearch: () => void;
  anchorEl: React.MutableRefObject<any>;
};
export default function ImageSearch({ closeSearch, anchorEl }: props) {
  const containerRef = React.useRef();
  const inputRef = React.useRef(null);
  usePopover({
    containerRef,
    inputRef,
    anchorEl,
    onClose: closeSearch
  });

  const images = new Array(12).fill(null);
  return (
    <div
      ref={containerRef}
      className="absolute top-0 bottom-0 right-0 flex flex-col w-full max-w-screen-sm py-4 bg-gray-200"
    >
      <div className="flex px-4 mb-4">
        <button onClick={() => closeSearch()} className="px-3 py-2 bg-gray-300">
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
              <img key={i} src="https://source.unsplash.com/random/400x400" />
            );
          })}
        </div>
        <span>Loading...</span>
      </div>
    </div>
  );
}
