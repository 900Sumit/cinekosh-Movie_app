import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content container */}
      <div className="relative z-10 w-full max-w-md bg-[#141414] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-full p-2 transition-colors z-20 focus:outline-none"
          onClick={onClose}
        >
          <FiX size={18} />
        </button>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
