import { FiMessageCircle } from "react-icons/fi";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-gray-800">
      <div className="flex items-center gap-4">
        <div className="w-12 h-16 rounded-md overflow-hidden border border-gray-700 shadow-sm shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
        </div>

        <div>
          <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <FiMessageCircle className="text-gray-400" size={14} />
        <span className="text-sm font-medium text-white">{comments}</span>
      </div>
    </div>
  );
};

export default VideoCard;
