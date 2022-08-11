import "./App.css";
import { Route, Routes } from "react-router-dom";
import BookSearch from "./pages/BookSearch";
import BookShelf from "./pages/BookShelf";
import * as BooksAPI from "./BooksAPI";
import { useEffect, useState } from "react";

function App() {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    let mounted = true;
    const getMyBooks = async () => {
      const res = await BooksAPI.getAll();
      if (mounted) {
        setMyBooks(res);
      }
    };
    getMyBooks();
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * @description Updates the array of books of the user with the book updated
   * @param {object} changedBook
   * @param {string} shelf
   * @returns {void}
   */
  const handleBookChange = (changedBook, shelf) => {
    const updateBook = async () => {
      const res = await BooksAPI.update(changedBook, shelf);

      if (!res) return;

      setMyBooks((prevMyBooks) => {
        const bookExists =
          prevMyBooks.filter((book) => book.id === changedBook.id).length === 0
            ? false
            : true;
        if (!bookExists) {
          changedBook.shelf = shelf;
          return [...prevMyBooks, changedBook];
        } else {
          return prevMyBooks.map((book) => {
            if (book.id === changedBook.id) {
              return { ...book, shelf: shelf };
            }

            return book;
          });
        }
      });
    };

    updateBook();
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <BookShelf
              books={myBooks}
              updateMyBooks={(changedBook, shelf) =>
                handleBookChange(changedBook, shelf)
              }
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <BookSearch
              books={myBooks}
              updateMyBooks={(changedBook, shelf) =>
                handleBookChange(changedBook, shelf)
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
