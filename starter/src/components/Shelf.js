import React from "react";
import Book from "./Book";

export default function Shelf({ title, books, updateMyBooks }) {
  const BookElements = books.map((book) => {
    return (
      <Book
        key={book.id}
        book={book}
        updateBook={(changedBook, shelf) => updateMyBooks(changedBook, shelf)}
      />
    );
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{BookElements}</ol>
      </div>
    </div>
  );
}
