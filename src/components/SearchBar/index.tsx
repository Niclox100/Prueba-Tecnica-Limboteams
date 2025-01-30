import React, { useState } from "react";
import debounce from 'lodash.debounce';

import "./styles.scss";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Buscar...", onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        aria-label="Buscar"
      />
    </div>
  );
};

export default SearchBar;
