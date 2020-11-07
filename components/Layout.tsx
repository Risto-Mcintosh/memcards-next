import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-300 py-4">
        <Navigation />
      </div>
      <main className="flex-1 container mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
