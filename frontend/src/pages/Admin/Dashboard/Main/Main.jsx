import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import { FiUsers, FiMessageSquare, FiFilm } from "react-icons/fi";
import Loader from "../../../../component/Loader";

const Main = () => {
  const { data: topMovies, isLoading: loadingTop } = useGetTopMoviesQuery();
  const { data: visitors, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: allMovies, isLoading: loadingAll } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews) || [];
  const sumOfCommentsLength = totalCommentsLength.reduce((acc, length) => acc + length, 0);

  if (loadingTop || loadingUsers || loadingAll) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back. Here is what is happening today.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Stats & Top Content */}
        <div className="flex-1 space-y-8 w-full">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SecondaryCard
              title="Total Users"
              count={visitors?.length || 0}
              subtitle="+12% this week"
              icon={<FiUsers size={20} />}
              color="#14b8a6" // teal-500
            />
            <SecondaryCard
              title="Total Comments"
              count={sumOfCommentsLength}
              subtitle="Active engagement"
              icon={<FiMessageSquare size={20} />}
              color="#eab308" // yellow-500
            />
            <SecondaryCard
              title="Total Movies"
              count={allMovies?.length || 0}
              subtitle="Growing catalog"
              icon={<FiFilm size={20} />}
              color="#3b82f6" // blue-500
            />
          </div>

          {/* Top Content Section */}
          <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 shadow-xl transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Top Content</h2>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</span>
            </div>

            <div className="space-y-1">
              {topMovies?.length > 0 ? (
                topMovies.map((movie) => (
                  <VideoCard
                    key={movie._id}
                    image={movie.image}
                    title={movie.name}
                    date={movie.year}
                    comments={movie.numReviews}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No top movies available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Realtime Activity */}
        <div className="hidden xl:block">
          <RealTimeCard />
        </div>
      </div>
    </div>
  );
};

export default Main;
