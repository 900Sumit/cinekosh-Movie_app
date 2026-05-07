import { FiLayers, FiStar, FiGlobe, FiUsers } from "react-icons/fi";

const About = () => {
  return (
    <div className="min-h-screen w-full pb-20 pt-10">
      {/* Hero Section */}
      <section className="relative px-4 max-w-5xl mx-auto mb-16 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Cinekosh</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide max-w-2xl mx-auto">
          The ultimate cinematic treasury designed for movie enthusiasts. Discover, review, and manage your favorite films in a visually stunning environment.
        </p>
      </section>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Mission Card */}
        <div className="bg-[#141414]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-400">
              <FiGlobe size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Our Platform</h2>
          </div>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg">
            Cinekosh is your premier destination for all things cinema. We provide a seamless, visually stunning experience tailored for film lovers. From exploring trending blockbusters to uncovering hidden gems, our platform is designed to make discovering and organizing your movie collection an absolute joy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Community & Reviews */}
          <div className="bg-[#141414]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-500/5 rounded-full blur-[50px] group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                <FiUsers size={24} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Community & Engagement</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 mt-2 rounded-full bg-teal-400 shrink-0"></span>
                <span>Join a passionate community of film critics and fans.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 mt-2 rounded-full bg-blue-400 shrink-0"></span>
                <span>Write detailed reviews and share your cinematic opinions.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0"></span>
                <span>Rate your favorite movies and see how others rank them.</span>
              </li>
            </ul>
          </div>

          {/* Key Features */}
          <div className="bg-[#141414]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-[50px] group-hover:bg-purple-500/10 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400">
                <FiStar size={24} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Platform Features</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <FiLayers className="text-teal-400 mt-1 shrink-0" />
                <span>Extensive movie database with up-to-date information.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FiLayers className="text-teal-400 mt-1 shrink-0" />
                <span>Intuitive search and advanced filtering options.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FiLayers className="text-teal-400 mt-1 shrink-0" />
                <span>Personalized profiles to track your watch history.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <FiLayers className="text-teal-400 mt-1 shrink-0" />
                <span>Premium Dark Mode interface for comfortable viewing.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
