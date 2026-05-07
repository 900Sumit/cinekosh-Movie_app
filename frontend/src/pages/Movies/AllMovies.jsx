import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import MovieCard from "./MovieCard";
import Loader from "../../component/Loader";
import CustomSelect from "../../component/CustomSelect";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  const { moviesFilter, filteredMovies, uniqueYear } = useSelector(
    (state) => state.movies
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background Image Slideshow
  useEffect(() => {
    if (data && data.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [data]);

  const currentBannerImage = data && data.length > 0 ? data[currentImageIndex]?.image : banner;

  // Safely extract and store unique years when data arrives
  useEffect(() => {
    if (data) {
      const movieYears = data.map((movie) => movie.year);
      const uniqueYears = Array.from(new Set(movieYears)).sort((a, b) => b - a);
      dispatch(setMovieYears(movieYears));
      dispatch(setUniqueYears(uniqueYears));
    }
  }, [data, dispatch]);

  // The Centralized Filter & Sort Engine
  useEffect(() => {
    if (!data) return;

    let result = [...data];

    // 1. Apply Search Filter
    if (moviesFilter.searchTerm) {
      result = result.filter((movie) =>
        movie.name.toLowerCase().includes(moviesFilter.searchTerm.toLowerCase())
      );
    }

    // 2. Apply Genre Filter
    if (moviesFilter.selectedGenre) {
      result = result.filter(
        (movie) => movie.genre === moviesFilter.selectedGenre
      );
    }

    // 3. Apply Year Filter
    if (moviesFilter.selectedYear) {
      result = result.filter(
        (movie) => movie.year === Number(moviesFilter.selectedYear)
      );
    }

    // 4. Apply Sort
    if (moviesFilter.selectedSort) {
      switch (moviesFilter.selectedSort) {
        case "new":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "top":
          result.sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0));
          break;
        case "random":
          result.sort(() => Math.random() - 0.5);
          break;
        default:
          break;
      }
    }

    dispatch(setFilteredMovies(result));
  }, [data, moviesFilter, dispatch]);

  // Handlers
  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
  };

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
  };

  const handleYearChange = (year) => {
    dispatch(setMoviesFilter({ selectedYear: year }));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
  };

  const clearAllFilters = () => {
    dispatch(
      setMoviesFilter({
        searchTerm: "",
        selectedGenre: "",
        selectedYear: "",
        selectedSort: "",
      })
    );
  };

  const hasActiveFilters =
    moviesFilter.searchTerm ||
    moviesFilter.selectedGenre ||
    moviesFilter.selectedYear ||
    moviesFilter.selectedSort;

  return (
    <div className="w-full min-h-screen">
      {/* ── Hero Banner ── */}
      <section
        className="relative h-[22rem] md:h-[28rem] w-full flex items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentBannerImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0a0a0b] backdrop-blur-[2px]"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-3">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Cinekosh</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 font-medium tracking-wide">
            Discover your next favorite film
          </p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="relative z-20 -mt-12 max-w-5xl w-full mx-auto px-4 sm:px-6">
        <div className="bg-transparent backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6 relative overflow-visible group">
          {/* Card subtle inner glow (wrapped to hide overflow) */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500"></div>
          </div>

          {/* Search */}
          <div className="relative z-10">
            <input
              type="text"
              className="w-full h-12 bg-white/5 backdrop-blur-md border border-white/10 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 px-5 rounded-xl text-white placeholder-gray-400 outline-none transition-all text-sm shadow-inner"
              placeholder="Search for a movie..."
              value={moviesFilter.searchTerm || ""}
              onChange={handleSearchChange}
            />

          {/* Dropdowns Row */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-4">
            <div className="flex-1">
              <CustomSelect
                placeholder="All Genres"
                value={moviesFilter.selectedGenre || ""}
                onChange={(val) => handleGenreClick(val)}
                options={[
                  { value: "", label: "All Genres" },
                  ...(genres?.map((g) => ({ value: g._id, label: g.name })) || []),
                ]}
              />
            </div>

            <div className="flex-1">
              <CustomSelect
                placeholder="All Years"
                value={moviesFilter.selectedYear || ""}
                onChange={(val) => handleYearChange(val)}
                options={[
                  { value: "", label: "All Years" },
                  ...(uniqueYear?.map((y) => ({ value: String(y), label: String(y) })) || []),
                ]}
              />
            </div>

            <div className="flex-1">
              <CustomSelect
                placeholder="Sort By"
                value={moviesFilter.selectedSort || ""}
                onChange={(val) => handleSortChange(val)}
                options={[
                  { value: "", label: "Sort By" },
                  { value: "new", label: "Newest First" },
                  { value: "top", label: "Most Reviewed" },
                  { value: "random", label: "Shuffle" },
                ]}
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 rounded-xl transition-all text-sm font-medium whitespace-nowrap shadow-sm"
              >
                Clear All
              </button>
            )}
          </div>
          </div>
        </div>
      </section>

      {/* ── Results Section ── */}
      <section className="mt-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        {data && (
          <p className="text-sm text-gray-500 mb-6">
            Showing{" "}
            <span className="text-white font-medium">
              {filteredMovies?.length || 0}
            </span>{" "}
            of {data.length} movies
            {hasActiveFilters && " (filtered)"}
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-400 text-lg mb-4">
              Failed to load movies. Please try again.
            </p>
          </div>
        ) : filteredMovies?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-xl text-gray-300 font-semibold mb-2">
              No movies found
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors font-medium text-sm"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllMovies;
