import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Interro Dashboard</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer (optional) */}
      <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Interro. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
