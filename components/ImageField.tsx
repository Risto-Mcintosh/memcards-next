import * as React from 'react';
import { FlashcardImage } from 'types';
import ImageSearch from './ImageSearch';
import { Button } from './ui-elements/Buttons';

type props = {
  image: FlashcardImage;
  setImage: React.Dispatch<React.SetStateAction<FlashcardImage>>;
};
export function ImageField({ image, setImage }: props) {
  const [isImageSearchOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  return (
    <div className="flex items-start mb-6">
      <p className="">Image (optional):</p>
      {image && (
        <div className="flex-1 ml-2">
          <img src={image.thumb} alt={image.alt} />
        </div>
      )}
      <div className="flex flex-col ml-2">
        <Button
          size="sm"
          ref={buttonRef}
          onClick={() => setOpen(true)}
          type="button"
        >
          Search
        </Button>
        {image && (
          <Button
            size="sm"
            onClick={() => setImage(null)}
            type="button"
            className="mt-3"
          >
            Clear
          </Button>
        )}
      </div>
      {isImageSearchOpen && (
        <ImageSearch
          closeSearch={() => setOpen(false)}
          anchorEl={buttonRef}
          setImage={setImage}
        />
      )}
    </div>
  );
}
