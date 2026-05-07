import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative">
      {/* Background Cinematic Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Manage Genres</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Create Form Column */}
          <div className="bg-[#141414]/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-6">Create New Genre</h2>
            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateGenre}
              buttonText="Create Genre"
            />
          </div>

          {/* List Column */}
          <div className="bg-[#141414]/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors duration-500 pointer-events-none"></div>
            <h2 className="text-lg font-bold text-white mb-6">Existing Genres</h2>
          <div className="flex flex-wrap gap-3">
            {genres?.map((genre) => (
              <button
                key={genre._id}
                className="bg-gray-800 border border-gray-700 text-gray-300 py-2 px-4 rounded-xl hover:bg-teal-500/10 hover:text-teal-400 hover:border-teal-500/50 focus:outline-none transition-all text-sm font-medium shadow-sm"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
              >
                {genre.name}
              </button>
            ))}
            {genres?.length === 0 && (
              <p className="text-gray-500 text-sm">No genres found.</p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Update Genre</h2>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </div>
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
