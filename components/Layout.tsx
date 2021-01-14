import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="py-4 bg-gray-300">
        <Navigation />
      </div>
      <main className="flex-1 w-full px-2 pt-4 pb-6 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default Layout;
