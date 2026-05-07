import { Link } from "react-router-dom";

const MovieTabs = ({
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  movie,
  loadingMovieReview,
}) => {
  return (
    <div>
      {/* Review Form Section */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6">Reviews</h3>

        {userInfo ? (
          <form onSubmit={submitHandler} className="mb-8">
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Rating
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full max-w-xs p-3 mb-4 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors text-sm"
                required
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 - Poor</option>
                <option value={2}>2 - Fair</option>
                <option value={3}>3 - Good</option>
                <option value={4}>4 - Very Good</option>
                <option value={5}>5 - Excellent</option>
              </select>

              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-400 mb-2"
              >
                Write Your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full max-w-2xl p-4 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors resize-none text-sm"
                placeholder="Share your thoughts about this movie..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loadingMovieReview}
              className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {loadingMovieReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 mb-8 max-w-2xl">
            <p className="text-gray-400 text-sm">
              Please{" "}
              <Link
                to="/login"
                className="text-teal-400 hover:text-teal-300 font-medium"
              >
                Sign In
              </Link>{" "}
              to write a review.
            </p>
          </div>
        )}
      </section>

      {/* Existing Reviews */}
      <section>
        {movie?.reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#141414] border border-gray-800 p-5 rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <strong className="text-white text-sm font-semibold">
                    {review.name}
                  </strong>
                  <span className="text-gray-600 text-xs">
                    {review.createdAt.substring(0, 10)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
