import { useState, useRef, useEffect } from "react";

/**
 * Custom Select Dropdown with glassmorphism + rounded corners.
 *
 * Props:
 * - options: [{ value: string, label: string }]
 * - value: currently selected value
 * - onChange: (value) => void
 * - placeholder: string
 */
const CustomSelect = ({ options = [], value, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Find selected label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-white/5 backdrop-blur-md border rounded-xl text-sm cursor-pointer transition-all outline-none shadow-inner ${
          isOpen
            ? "border-teal-500 ring-1 ring-teal-500/30"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <span className={value ? "text-gray-200" : "text-gray-400"}>
          {displayLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="#9ca3af"
          className={`shrink-0 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M8 11L3 6h10l-5 5z" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-black/50 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <ul className="max-h-60 overflow-y-auto py-1.5 custom-dropdown-scroll">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    value === opt.value
                      ? "bg-teal-500/15 text-teal-400 font-medium"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
