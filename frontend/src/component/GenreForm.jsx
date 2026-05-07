const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all text-sm"
          placeholder="Enter genre name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex gap-4">
          <button 
            type="submit"
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-teal-500/20"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-3 px-4 rounded-xl font-bold text-sm transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
