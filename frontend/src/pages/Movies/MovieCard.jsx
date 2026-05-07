import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
        <img
          src={movie.image}
          alt={movie.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent opacity-90 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg border border-white/10">
          <span className="text-yellow-500 text-xs">★</span>
          <span className="text-white text-xs font-bold">{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-sm md:text-base line-clamp-1 group-hover:text-teal-400 transition-colors drop-shadow-md">
          {movie.name}
        </h3>
        <p className="text-gray-400 text-xs mt-1 font-medium drop-shadow-sm">
          {movie.year}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
