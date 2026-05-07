import { Outlet, NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFilm,
  FiList,
  FiMessageSquare,
  FiPlusSquare,
} from "react-icons/fi";

const Sidebar = () => {
  const navLinks = [
    { name: "Dashboard", path: "/admin/movies/dashboard", icon: <FiGrid /> },
    { name: "Create Movie", path: "/admin/movies/create", icon: <FiPlusSquare /> },
    { name: "Manage Genres", path: "/admin/movies/genre", icon: <FiList /> },
    { name: "Movie Library", path: "/admin/movies-list", icon: <FiFilm /> },
    { name: "Comments", path: "/admin/movies/comments", icon: <FiMessageSquare /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0f0f10] h-[calc(100vh-80px)] p-6 hidden md:block rounded-3xl border border-gray-800/60 shadow-2xl transition-colors ml-4 sticky top-4">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 tracking-tighter drop-shadow-sm">
          Cinekosh
        </h2>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-[0.2em] font-semibold">Admin Workspace</p>
      </div>

      <ul className="space-y-2">
        {navLinks.map((link) => (
          <li key={link.name}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-[#1a1a1a] border border-transparent"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const AdminDashboard = () => {
  return (
    <div className="flex max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] mt-4">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden w-full">
        {/* Render child routes here (Dashboard Main, CreateMovie, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
