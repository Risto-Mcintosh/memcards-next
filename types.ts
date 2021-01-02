export type Flashcard = {
  id: string;
  deckId: string;
  front: string;
  back: string;
  image: FlashcardImage;
};

export type FlashcardImage = {
  src: string;
  alt: string;
  thumb: any;
};
