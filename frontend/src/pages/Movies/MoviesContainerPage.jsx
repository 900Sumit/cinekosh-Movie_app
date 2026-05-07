import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";
import MovieCard from "./MovieCard";

const MoviesContainerPage = () => {
  const { isLoading: loadingNew } = useGetNewMoviesQuery();
  const { data: topMovies, isLoading: loadingTop } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies, isLoading: loadingRandom } = useGetRandomMoviesQuery();
  const { data: allMovies, isLoading: loadingAll } = useGetAllMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(selectedGenre === genreId ? null : genreId);
  };

  const filteredMovies =
    allMovies?.filter(
      (movie) =>
        selectedGenre === null ||
        (typeof movie.genre === "string" ? movie.genre : movie.genre?._id) ===
          selectedGenre
    ) || [];

  const isLoading = loadingNew || loadingTop || loadingRandom || loadingAll;

  return (
    <div className="flex flex-col lg:flex-row w-full px-4 sm:px-6 lg:px-10 gap-6">
      {/* ── Left Sidebar: Genre Filter ── */}
      <aside className="w-full lg:w-48 shrink-0">
        <div className="lg:sticky lg:top-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 px-3">
            Genres
          </h3>

          {/* "All" button to reset */}
          <button
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-1 ${
              selectedGenre === null
                ? "bg-teal-500/15 text-teal-400 border border-teal-500/30"
                : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
            }`}
            onClick={() => setSelectedGenre(null)}
          >
            All Movies
          </button>

          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 hide-scrollbar">
            {genres?.map((g) => (
              <button
                key={g._id}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedGenre === g._id
                    ? "bg-teal-500/15 text-teal-400 border border-teal-500/30"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-white border border-transparent"
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <section className="flex-1 min-w-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500"></div>
          </div>
        ) : (
          <>
            {/* Choose For You Section */}
            {!selectedGenre && (
              <>
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
                    🎲 Choose For You
                  </h2>
                  <SliderUtil data={randomMovies} />
                </div>

                {/* Top Movies Section */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
                    🔥 Top Movies
                  </h2>
                  <SliderUtil data={topMovies} />
                </div>
              </>
            )}

            {/* Genre-Filtered or All Movies Grid */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4 tracking-tight">
                {selectedGenre
                  ? `🎬 ${genres?.find((g) => g._id === selectedGenre)?.name || "Genre"} Movies`
                  : "🎬 All Movies"}
              </h2>

              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-gray-500 text-lg mb-4">
                    No movies found in this genre.
                  </p>
                  <button
                    onClick={() => setSelectedGenre(null)}
                    className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Show All Movies
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default MoviesContainerPage;
