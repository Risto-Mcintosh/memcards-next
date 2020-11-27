import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="py-4 bg-gray-300">
        <Navigation />
      </div>
      <main className="relative flex-1 w-full max-w-2xl px-2 mx-auto ">
        {children}
      </main>
    </div>
  );
}

export default Layout;
