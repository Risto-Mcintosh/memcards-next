import * as React from "react";
import Image from "next/image";
import Portal from "@reach/portal";
import { FlashcardImage } from "types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUnsplash } from "@utils/useUnsplash";
import { Popover } from "./Popover";
import { useObserver } from "@utils/useObserver";
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
  setImage,
}: props) {
  const inputRef = React.useRef<HTMLInputElement>();
  const imagesContainerRef = React.useRef<HTMLDivElement>();

  function handleSlashKeyPress(e: KeyboardEvent) {
    if (e.code === "Slash" && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleSlashKeyPress);
    return () => document.removeEventListener("keydown", handleSlashKeyPress);
  }, []);

  const { status, images, getImages, hasMore } = useUnsplash({ limit: 14 });

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ imageSearch }, e) => {
    e.stopPropagation();
    imagesContainerRef.current.scrollTo(0, 0);
    getImages(imageSearch);
  };

  const { observerEl } = useObserver({
    onIntersect: getImages,
    canRun: hasMore && status === "idle",
  });

  function handleImageSelect({ urls, alt }) {
    setImage({
      alt,
      src: urls.small,
      thumb: urls.thumb,
    });
    closeSearch();
  }
  return (
    <Portal>
      <Popover anchorEl={anchorEl} onClose={closeSearch}>
        {(containerRef) => (
          <div
            ref={containerRef}
            className="absolute top-0 bottom-0 right-0 z-10 flex flex-col w-full max-w-screen-sm py-4 bg-gray-200"
          >
            <div className="relative flex px-4 mb-4">
              <button
                onClick={() => closeSearch()}
                className="absolute px-1 py-0.5 text-white rounded bg-danger-500"
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
                  ref={inputRef}
                  autoFocus
                  className="py-1"
                  type="search"
                  name="imageSearch"
                  id="image-search"
                  aria-describedby="describe-search"
                  {...register("imageSearch")}
                />
                <p id="describe-search">Search for an image...</p>
              </form>
            </div>
            <div
              className="flex-1 px-4 overflow-y-auto"
              ref={imagesContainerRef}
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {images &&
                  images.map(({ urls, alt_description: alt }, i) => {
                    return (
                      <button
                        key={i}
                        className="relative"
                        style={{ paddingTop: "100%" }}
                        onClick={() => handleImageSelect({ urls, alt })}
                        onKeyUp={(e) =>
                          e.key === "Enter" && handleImageSelect({ urls, alt })
                        }
                      >
                        <Image
                          layout="fill"
                          className="object-fill pointer-events-none"
                          src={urls.small}
                          alt={alt}
                        />
                      </button>
                    );
                  })}
                {status === "loading" && <span>Loading...</span>}
              </div>
              <div className={`w-full ${hasMore && "mt-8"}`}>
                {hasMore && status === "idle" && (
                  <button
                    ref={observerEl}
                    className="block"
                    onClick={() => getImages()}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Popover>
    </Portal>
  );
}
