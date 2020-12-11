type props = {
  text: string;
};
export function FlashcardContent({ text }: props) {
  return (
    <div
      className="flex flex-col items-center justify-center w-3/4 max-w-screen-sm border-2 border-gray-100 shadow-lg rounded-xl"
      style={{ minHeight: '250px' }}
    >
      <div className="flex justify-center w-full p-4">
        <p className="mb-2 text-4xl">{text}</p>
      </div>
      <div className="flex justify-center w-full p-4">
        <p className="mb-2 text-4xl">Card Answer</p>
      </div>
    </div>
  );
}
