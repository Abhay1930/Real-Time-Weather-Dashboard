import React, { useState } from 'react';

// Search bar component for entering city names
function SearchBar({ onSearch }) {
  // State to track the input value
  const [cityInput, setCityInput] = useState('');

  // Function to handle the search button click
  function handleSearchClick() {
    // Only search if there's text in the input
    if (cityInput.trim().length > 0) {
      onSearch(cityInput);
    }
  }

  // Function to handle Enter key press
  function handleKeyDown(event) {
    // If Enter key is pressed, perform search
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  }

  // Function to update state when input changes
  function handleInputChange(event) {
    setCityInput(event.target.value);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter a city name..."
        value={cityInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="City name input"
      />
      <button
        onClick={handleSearchClick}
        aria-label="Search for weather"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
