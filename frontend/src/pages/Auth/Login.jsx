import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center px-4 mt-[5rem] mb-[5rem]">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-2xl overflow-hidden bg-[#121212] border border-gray-800">
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Welcome Back</h1>
          
          <form onSubmit={submitHandler} className="w-full">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 rounded-xl bg-[#1c1c1c] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 rounded-xl bg-[#1c1c1c] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-teal-500/30 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {isLoading && <Loader />}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-400">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-400 hover:text-teal-300 font-semibold hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-white text-3xl font-bold mb-2">Discover New Worlds</h2>
            <p className="text-gray-300 text-lg">Dive into our massive collection of movies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
