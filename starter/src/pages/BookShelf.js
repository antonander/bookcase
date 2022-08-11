import React from "react";
import { Link } from "react-router-dom";
import Shelf from "../components/Shelf";

const shelvesData = [
  {
    title: "Currently Reading",
    label: "currentlyReading",
  },
  {
    title: "Want to Read",
    label: "wantToRead",
  },
  {
    title: "Read",
    label: "read",
  },
];

export default function BookShelf({ books, updateMyBooks }) {
  /**
   * @description Returns a subset of books that match the shelf name passed.
   * @param {string} shelfName
   * @returns {array} Array of books that are in that specific shelf
   */
  const getBooksOnShelf = (shelfName) => {
    return books.filter((book) => book.shelf === shelfName);
  };

  const Shelves = shelvesData.map((shelf, idx) => (
    <Shelf
      key={idx}
      title={shelf.title}
      books={getBooksOnShelf(shelf.label)}
      updateMyBooks={(changedBook, shelf) => updateMyBooks(changedBook, shelf)}
    />
  ));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>{Shelves}</div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
