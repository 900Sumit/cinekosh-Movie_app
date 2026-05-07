import { useGetUsersQuery } from "../../../../redux/api/users";
import { FiActivity, FiUsers, FiTrendingUp } from "react-icons/fi";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[300px] xl:w-[350px] bg-[#141414] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full transition-colors">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-[#1a1a1a]/50">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-lg font-bold text-white tracking-tight">Realtime Activity</h2>
        </div>
        <p className="text-xs text-gray-500">Live updates from your platform</p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Active Users */}
        <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-gray-800/50">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-1">Active Subscribers</p>
            <h3 className="text-3xl font-extrabold text-white">{visitors?.length || 0}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 border border-teal-500/20">
            <FiUsers size={20} />
          </div>
        </div>

        {/* Milestone Card */}
        <div className="p-5 bg-gradient-to-br from-teal-500/20 to-blue-500/10 rounded-xl border border-teal-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white">
            <FiTrendingUp size={100} />
          </div>
          <div className="relative z-10">
            <h4 className="text-teal-400 font-bold mb-2 flex items-center gap-2">
              <FiActivity /> Milestone Reached!
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Congratulations! You now have <span className="text-white font-bold">{visitors?.length || 0}</span> registered users exploring your movie catalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCard;
