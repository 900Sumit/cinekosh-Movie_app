import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="dark"
      />
      <Navigation />
      <main className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        
        {/* Premium Floating Global Footer */}
        <div className="w-full px-4 md:px-6 mt-20 mb-4 md:mb-6 z-10 relative">
          <footer className="w-full bg-[#0f0f10]/90 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-[2rem] relative pt-10 pb-24 md:pb-10 overflow-hidden">
            {/* Decorative Top Border Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              {/* Brand */}
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 tracking-tighter drop-shadow-sm">
                  Cinekosh
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">
                  Treasury of Cinema
                </span>
              </div>
              
              {/* Copyright */}
              <p className="text-gray-500 text-xs font-medium tracking-wider">
                &copy; {new Date().getFullYear()} Cinekosh. All rights reserved.
              </p>
              
              {/* Links (Visual only for aesthetics) */}
              <div className="flex items-center gap-6 text-xs text-gray-400 font-medium tracking-wide">
                <Link to="/about" className="hover:text-teal-400 transition-colors">About</Link>
                <Link to="/movies" className="hover:text-teal-400 transition-colors">Browse</Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default App;
