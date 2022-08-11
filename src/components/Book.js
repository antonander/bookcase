import React from "react";

export default function Book({ book, updateBook }) {
  const authors = book?.authors?.map((author, idx) => {
    return <span key={idx}>{author}</span>;
  });

  /**
   * @description Triggers the update of a specific book on each selection change
   * @param {string} the event
   * @returns {void}
   */
  const handleChange = (e) => {
    const newShelf = e.target.value;
    updateBook(book, newShelf);
  };

  const image = book?.imageLinks?.thumbnail
    ? book?.imageLinks?.thumbnail
    : "https://dummyimage.com/128x196/e6e6e6/000";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: 'url("' + image + '")',
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf ? book.shelf : "none"}
              onChange={handleChange}
            >
              <option value="disabled" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
}
