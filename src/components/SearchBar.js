import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ query, handleChange }) {
  return (
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
