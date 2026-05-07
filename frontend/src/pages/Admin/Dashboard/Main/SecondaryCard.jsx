const SecondaryCard = ({ title, count, subtitle, icon, color }) => {
  return (
    <div className="bg-[#141414] border border-gray-800 rounded-2xl p-6 relative overflow-hidden group hover:border-gray-700 transition-all duration-300">
      {/* Background glow effect */}
      <div 
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`}
        style={{ backgroundColor: color }}
      ></div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-extrabold text-white mt-1">{count}</h3>
        </div>
        <div 
          className="p-3 rounded-xl border border-gray-800/50 flex items-center justify-center bg-opacity-50"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {icon}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 relative z-10">
        <span className="text-xs font-medium px-2 py-1 bg-gray-800/50 rounded-md text-gray-400">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default SecondaryCard;
