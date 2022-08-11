import React from "react";
import Book from "./Book";

export default function SearchResults({ results, updateMyBooks, found }) {
  const BooksElement = results.map((book) => {
    return (
      <Book
        key={book.id}
        book={book}
        updateBook={(changedBook, shelf) => updateMyBooks(changedBook, shelf)}
      />
    );
  });

  return (
    <div className="search-books-results">
      {!found && (
        <p className="not-found-message">
          No results found. Try again with different terms.
        </p>
      )}
      <ol className="books-grid">{BooksElement}</ol>
    </div>
  );
}
