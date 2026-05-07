import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";

const Header = () => {
  const { data, isLoading } = useGetNewMoviesQuery();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 pt-6">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 drop-shadow-sm">Cinekosh</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Explore our latest cinematic additions and trending releases
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-teal-500"></div>
          </div>
        ) : (
          <SliderUtil data={data} />
        )}
      </div>
    </section>
  );
};

export default Header;
