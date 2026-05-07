import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const AllComments = () => {
  const { data: movies, refetch, isLoading } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteComment({ movieId, reviewId }).unwrap();
      toast.success("Review deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete review");
    }
  };

  const allReviews =
    movies?.flatMap((m) =>
      m.reviews.map((review) => ({
        ...review,
        movieId: m._id,
        movieName: m.name,
      }))
    ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Manage Comments
          </h1>
          <p className="text-sm text-gray-500">
            {allReviews.length} total reviews across {movies?.length || 0} movies
          </p>
        </div>

        <div className="bg-[#141414]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
          {/* Card subtle inner glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
        {allReviews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No reviews found yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1a1a1a] border border-gray-700/50 rounded-xl p-5 hover:border-teal-500/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-1">
                      {review.name}
                    </h3>
                    <div className="text-xs font-medium text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md inline-block">
                      {review.movieName}
                    </div>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {review.createdAt.substring(0, 10)}
                  </span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {review.comment}
                </p>

                <div className="flex justify-end">
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 transition-colors font-medium"
                    onClick={() => handleDeleteComment(review.movieId, review._id)}
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AllComments;
