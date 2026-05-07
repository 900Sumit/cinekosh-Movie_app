import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    director: "",
    trailerLink: "",
    language: "",
    duration: "",
    isFeatured: false,
    genre: "",
    image: "",
    imageUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: initialMovieData, isLoading: isLoadingMovie } = useGetSpecificMovieQuery(id);
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const [deleteMovie, { isLoading: isDeletingMovie }] = useDeleteMovieMutation();

  const parseCast = (castValue) =>
    castValue
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData({
        ...initialMovieData,
        genre: initialMovieData.genre?._id || initialMovieData.genre || "",
        imageUrl: initialMovieData.image || "", // Load existing image as URL to allow editing
      });
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setMovieData({ ...movieData, imageUrl: "" }); // Clear URL if file selected
    }
  };

  const validateForm = () => {
    if (!movieData.name?.trim()) {
      toast.error("Movie name is required");
      return false;
    }
    if (movieData.year && (movieData.year < 1888 || movieData.year > new Date().getFullYear() + 5)) {
      toast.error(`Year must be between 1888 and ${new Date().getFullYear() + 5}`);
      return false;
    }
    if (!movieData.detail?.trim()) {
      toast.error("Movie description is required");
      return false;
    }
    return true;
  };

  const handleUpdateMovie = async () => {
    if (!validateForm()) return;

    try {
      let finalImagePath = movieData.imageUrl;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData).unwrap();
        finalImagePath = uploadImageResponse.image;
      }

      const payload = {
        name: movieData.name,
        year: Number(movieData.year),
        detail: movieData.detail,
        cast: Array.isArray(movieData.cast)
          ? movieData.cast.filter(Boolean)
          : parseCast(String(movieData.cast || "")),
        director: movieData.director,
        trailerLink: movieData.trailerLink,
        language: movieData.language,
        duration: movieData.duration ? Number(movieData.duration) : undefined,
        isFeatured: Boolean(movieData.isFeatured),
        genre: movieData.genre,
        image: finalImagePath,
      };

      await updateMovie({
        id,
        updatedMovie: payload,
      }).unwrap();

      toast.success("Movie updated successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update movie");
    }
  };

  const handleDeleteMovie = async () => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id).unwrap();
      toast.success("Movie deleted successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete movie");
    }
  };

  if (isLoadingMovie) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader /></div>;
  }

  const inputClasses = "w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/30 transition-all text-sm";
  const labelClasses = "block text-sm font-medium text-gray-400 mb-2";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* Background Cinematic Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Edit Movie</h1>

        <form className="space-y-8 bg-[#141414]/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group">
          {/* Card subtle inner glow */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>Movie Name *</label>
            <input type="text" name="name" value={movieData.name || ""} onChange={handleChange} className={inputClasses} placeholder="Enter movie name" />
          </div>
          <div>
            <label className={labelClasses}>Release Year *</label>
            <input type="number" name="year" value={movieData.year || ""} onChange={handleChange} className={inputClasses} placeholder="e.g. 2024" />
          </div>

          <div>
            <label className={labelClasses}>Director</label>
            <input type="text" name="director" value={movieData.director || ""} onChange={handleChange} className={inputClasses} placeholder="Director name" />
          </div>
          <div>
            <label className={labelClasses}>Language</label>
            <input type="text" name="language" value={movieData.language || ""} onChange={handleChange} className={inputClasses} placeholder="e.g. English, Hindi" />
          </div>
          <div>
            <label className={labelClasses}>Duration (mins)</label>
            <input type="number" name="duration" value={movieData.duration || ""} onChange={handleChange} className={inputClasses} placeholder="e.g. 120" />
          </div>
          <div>
            <label className={labelClasses}>Trailer URL</label>
            <input type="url" name="trailerLink" value={movieData.trailerLink || ""} onChange={handleChange} className={inputClasses} placeholder="https://youtube.com/..." />
          </div>

          <div>
            <label className={labelClasses}>Genre *</label>
            <select name="genre" value={movieData.genre || ""} onChange={handleChange} className={inputClasses}>
              {isLoadingGenres ? <option>Loading...</option> : genres?.map((g) => <option key={g._id} value={g._id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Cast (comma-separated)</label>
            <input type="text" name="cast" value={movieData.cast?.join(", ") || ""} onChange={(e) => setMovieData({ ...movieData, cast: parseCast(e.target.value) })} className={inputClasses} placeholder="Actor 1, Actor 2" />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Description * <span className="text-gray-600">({(movieData.detail || "").length}/2000)</span></label>
          <textarea name="detail" value={movieData.detail || ""} onChange={handleChange} className={`${inputClasses} resize-none`} rows={4} maxLength={2000}></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex items-center gap-3 p-4 bg-[#1a1a1a] rounded-xl border border-gray-700">
            <input type="checkbox" id="isFeatured" name="isFeatured" checked={movieData.isFeatured || false} onChange={handleChange} className="w-5 h-5 accent-teal-500 rounded cursor-pointer" />
            <label htmlFor="isFeatured" className="text-white font-medium cursor-pointer">Mark as Featured / Trending</label>
          </div>

          <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-700">
            <label className={labelClasses}>Movie Poster</label>
            <div className="space-y-4">
              <input 
                type="url" 
                name="imageUrl" 
                value={movieData.imageUrl || ""} 
                onChange={(e) => {
                  handleChange(e);
                  if(e.target.value) {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }
                }} 
                className={inputClasses} 
                placeholder="Paste image URL here..." 
              />
              
              <div className="flex items-center justify-center text-xs text-gray-500 uppercase tracking-widest font-bold">
                <span className="w-full border-t border-gray-700"></span>
                <span className="px-3">OR</span>
                <span className="w-full border-t border-gray-700"></span>
              </div>

              <div className="flex items-center gap-4">
                <label className="cursor-pointer px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl text-sm text-gray-300 transition-colors w-full text-center">
                  {selectedImage ? "Change File" : "Upload from Device"}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>
            
            {(imagePreview || movieData.imageUrl) && (
              <div className="mt-4 flex justify-center">
                <img 
                  src={imagePreview || movieData.imageUrl} 
                  alt="Poster Preview" 
                  className="w-32 h-48 object-cover rounded-lg border border-gray-600 shadow-xl" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150x225?text=Invalid+URL"; }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-800">
          <button type="button" onClick={handleUpdateMovie} disabled={isUpdatingMovie || isUploadingImage} className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-bold text-base transition-colors flex justify-center items-center gap-2 shadow-lg shadow-teal-500/20">
            {isUpdatingMovie || isUploadingImage ? <><Loader /> Updating...</> : "Save Changes"}
          </button>
          <button type="button" onClick={handleDeleteMovie} disabled={isDeletingMovie} className="px-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-4 rounded-xl font-bold text-base transition-colors">
            {isDeletingMovie ? "Deleting..." : "Delete Movie"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};
export default UpdateMovie;
