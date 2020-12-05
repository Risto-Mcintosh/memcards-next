import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="py-4 bg-gray-300">
        <Navigation />
      </div>
      <main className="flex-1 w-full px-2 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
