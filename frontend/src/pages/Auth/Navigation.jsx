import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

import {
  FiHome,
  FiFilm,
  FiInfo,
  FiLogIn,
  FiUserPlus,
  FiChevronDown,
  FiUser,
} from "react-icons/fi";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 z-[100] bg-[#141414]/95 backdrop-blur-xl border border-gray-800/80 px-4 md:px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] flex items-center justify-between md:justify-normal gap-4 md:gap-6 transition-all w-[calc(100%-1rem)] max-w-[500px] md:w-max">
      {/* Primary Navigation Links */}
      <div className="flex items-center gap-4 md:gap-5">
        <Link
          to="/"
          className={`group flex flex-col items-center transition-colors ${
            isActive("/") ? "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]" : "text-gray-500 hover:text-teal-400"
          }`}
          title="Home"
        >
          <FiHome size={22} className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </Link>

        <Link
          to="/movies"
          className={`group flex flex-col items-center transition-colors ${
            isActive("/movies")
              ? "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
              : "text-gray-500 hover:text-teal-400"
          }`}
          title="Browse Movies"
        >
          <FiFilm size={22} className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </Link>

        <Link
          to="/about"
          className={`group flex flex-col items-center transition-colors ${
            isActive("/about")
              ? "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
              : "text-gray-500 hover:text-teal-400"
          }`}
          title="About Us"
        >
          <FiInfo size={22} className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
        </Link>
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-700/60 shrink-0"></div>

      {/* User Actions & Dropdown */}
      <div className="relative flex items-center" ref={dropdownRef}>
        {userInfo ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 text-white bg-gray-800/50 hover:bg-gray-700/80 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-[0_0_10px_rgba(20,184,166,0.2)] hover:border-teal-500/30 border border-transparent focus:outline-none"
            >
              <FiUser size={16} className="text-teal-400 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium text-xs tracking-wide">
                {userInfo.username}
              </span>
              <FiChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180 text-teal-400" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu (Opens Upwards) */}
            {dropdownOpen && (
              <ul className="absolute bottom-full right-0 mb-3 w-48 bg-[#141414]/95 backdrop-blur-xl border border-gray-800/80 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-2.5 text-gray-300 hover:bg-[#1a1a1a] hover:text-teal-400 transition-all text-xs font-medium hover:pl-5"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2.5 text-gray-300 hover:bg-[#1a1a1a] hover:text-teal-400 transition-all text-xs font-medium hover:pl-5"
                  >
                    My Profile
                  </Link>
                </li>
                <li className="border-t border-gray-800 mt-1 pt-1">
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-xs font-medium hover:pl-5"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4 md:gap-5">
            <Link
              to="/login"
              className={`group flex flex-col items-center transition-colors ${
                isActive("/login")
                  ? "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                  : "text-gray-500 hover:text-teal-400"
              }`}
              title="Sign In"
            >
              <FiLogIn
                size={22}
                className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]"
              />
            </Link>

            <Link
              to="/register"
              className={`group flex flex-col items-center transition-colors ${
                isActive("/register")
                  ? "text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                  : "text-gray-500 hover:text-teal-400"
              }`}
              title="Create Account"
            >
              <FiUserPlus
                size={22}
                className="group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
