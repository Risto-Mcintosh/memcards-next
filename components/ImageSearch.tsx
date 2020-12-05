export default function ImageSearch() {
  return (
    <div className="absolute top-0 bottom-0 right-0 w-full max-w-screen-sm p-4 bg-gray-200">
      <div className="flex">
        <button>Close</button>
        <form className="flex flex-col items-center flex-1">
          <label htmlFor="image-search" className="sr-only">
            Image Search
          </label>
          <input
            className="py-1"
            type="search"
            name="image-search"
            id="image-search"
            aria-describedby="describe-search"
          />
          <p id="describe-search">Search for an image...</p>
        </form>
      </div>
    </div>
  );
}
