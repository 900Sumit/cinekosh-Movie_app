import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import Loader from "../../component/Loader";

const AdminMoviesList = () => {
  const { data: movies, isLoading } = useGetAllMoviesQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
              Movie Library
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your entire catalog of {movies?.length || 0} movies
            </p>
          </div>
          <Link
            to="/admin/movies/create"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-teal-500/20"
          >
            + Add New Movie
          </Link>
        </div>

        <div className="bg-[#141414]/80 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
          {/* Card subtle inner glow */}
          <div className="absolute -left-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a] border-b border-gray-800">
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Poster</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Director</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Language</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Featured</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {movies?.map((movie) => (
                <tr key={movie._id} className="hover:bg-[#1a1a1a]/50 transition-colors group">
                  <td className="py-3 px-6 whitespace-nowrap">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-12 h-16 object-cover rounded-md border border-gray-700 shadow-md group-hover:scale-105 transition-transform"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <div className="font-semibold text-white mb-0.5">{movie.name}</div>
                    <div className="text-xs text-gray-500">{movie.year}</div>
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-300 whitespace-nowrap">
                    {movie.director || <span className="text-gray-600 italic">Not set</span>}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-300 whitespace-nowrap">
                    {movie.language || "-"}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-300 whitespace-nowrap">
                    {movie.duration ? `${movie.duration} min` : "-"}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    {movie.isFeatured ? (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-800 rounded-full border border-gray-700">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-teal-500 hover:text-white text-gray-300 rounded-lg transition-all border border-gray-700 hover:border-teal-400"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {movies?.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No movies found. Add your first movie to get started!
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
