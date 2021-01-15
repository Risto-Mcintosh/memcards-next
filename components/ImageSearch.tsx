import * as React from 'react';
import Portal from '@reach/portal';
import FocusTrap from 'focus-trap-react';
import { FlashcardImage } from 'types';
import { usePopover } from 'utils/usePopover';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUnsplash } from '@utils/useUnsplash';
import { useObserver } from '@utils/useObserver';
type props = {
  closeSearch: () => void;
  anchorEl: React.MutableRefObject<any>;
  setImage: React.Dispatch<React.SetStateAction<FlashcardImage>>;
};

type FormValues = {
  imageSearch: string;
};

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
  function handleSlashKeyPress(e: KeyboardEvent) {
    if (e.code === 'Slash' && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }
  React.useEffect(() => {
    document.addEventListener('keyup', handleSlashKeyPress);
    return () => document.removeEventListener('keyup', handleSlashKeyPress);
  }, []);

  const {
    fetchSuccess,
    page,
    prevSearchTerm,
    searchTerm,
    status,
    images,
    getImages,
    initialize
  } = useUnsplash();

  const fetchMore = React.useCallback(() => {
    initialize();
    getImages({ pageNumber: page + 1 })
      .then((res) => res.json())
      .then((data) => {
        fetchSuccess(data.results);
      });
  }, [page]);

  const loadMoreRef = React.useRef();

  useObserver({
    callback: () => console.log('callback'),
    ref: loadMoreRef,
    root: containerRef?.current
  });

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ imageSearch }, event) => {
    console.log({ prevSearchTerm, imageSearch });
    if (prevSearchTerm === imageSearch) return;
    initialize(imageSearch);
    getImages({ term: imageSearch })
      .then((res) => res.json())
      .then((data) => {
        fetchSuccess(data.results);
      });
  };
  // console.log({ images });
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center flex-1"
            >
              <label htmlFor="image-search" className="sr-only">
                Image Search
              </label>
              <input
                ref={(ref) => {
                  inputRef.current = ref;
                  register(ref);
                }}
                className="py-1"
                type="search"
                name="imageSearch"
                id="image-search"
                aria-describedby="describe-search"
              />
              <p id="describe-search">Search for an image...</p>
            </form>
          </div>
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {images &&
                images.map(({ urls, alt_description: alt }, i) => {
                  return (
                    <div
                      key={i}
                      className=""
                      tabIndex={0}
                      role="button"
                      onClick={() => {
                        setImage({
                          alt,
                          src: urls.small,
                          thumb: urls.thumb
                        });
                        closeSearch();
                      }}
                    >
                      <img src={urls.thumb} alt={alt} />
                    </div>
                  );
                })}
            </div>
            <button ref={loadMoreRef} onClick={() => fetchMore()}>
              Load More
            </button>

            {status === 'loading' && <span>Loading...</span>}
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}
