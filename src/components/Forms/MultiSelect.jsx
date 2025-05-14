import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function MultiSelect({options}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const { translations } = useLanguage();

  const filteredOptions = query === ''
    ? options
    : options.filter(option => option.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setQuery('');
    setIsDropdownOpen(false);
    setHighlightedIndex(null);
  };

  const handleRemove = (option) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => 
        prevIndex === null ? 0 : Math.min(filteredOptions.length - 1, prevIndex + 1)
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => 
        prevIndex === null ? 0 : Math.max(0, prevIndex - 1)
      );
    } else if (e.key === 'Enter' && highlightedIndex !== null) {
      handleSelect(filteredOptions[highlightedIndex]);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown-container') === null && event.target.closest('input') === null) {
      setIsDropdownOpen(false);
      setHighlightedIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="mx-auto">
      <div className="relative">
        <label className="input-label line-clamp-1 w-36 text-center absolute inset-y-0 right-0 flex justify-center items-center text-gray-500 bg-[#e9ecef] rounded-s" style={{ border: "1px solid #ced4da" }}>
          {translations.topics}
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full ps-40 px-4 py-2 border border-gray-300 rounded-lg"
          placeholder={translations.search_or_select}
        />
        {isDropdownOpen && (
          <div className="dropdown-container absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-lg z-[100000]">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">{translations.nothing_found}</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white ${highlightedIndex === index ? 'bg-blue-200' : ''}`}
                >
                  {option}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {selectedOptions.map((option) => (
          <div
            key={option}
            className="flex items-center px-4 py-2 text-blue-800 rounded-lg"
            style={{backgroundColor: 'rgb(234, 235, 237)'}}
          >
            {option}
            <button
              onClick={() => handleRemove(option)}
              className="mx-2 text-sm text-red-600 hover:text-red-800"
              title={translations.delete}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
