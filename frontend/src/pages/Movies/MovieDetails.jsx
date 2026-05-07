import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import Loader from "../../component/Loader";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch, isLoading } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      setComment("");
      setRating(0);
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm font-medium mb-8"
      >
        ← Back to Home
      </Link>

      {/* Movie Hero */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Poster */}
        <div className="w-full md:w-80 shrink-0">
          <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            {movie?.name}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded-full text-xs font-semibold">
              {movie?.year}
            </span>
            <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
              {movie?.numReviews || 0} Reviews
            </span>
          </div>

          <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
            {movie?.detail}
          </p>

          {/* Cast */}
          {movie?.cast && movie.cast.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Cast
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((c, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-800/80 text-gray-300 rounded-lg text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-800 pt-8">
        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </div>
    </div>
  );
};

export default MovieDetails;
