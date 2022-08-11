import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

export default function BookSearch({ books, updateMyBooks }) {
  const [results, setResults] = useState([]);
  const [found, setFound] = useState(true);
  const [query, setQuery] = useState("");

  /**
   * @description Updates the query value on each input change
   * @param {e} the event
   * @returns {void}
   */
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let mounted = true;
    if (query !== "") {
      BooksAPI.search(query).then((res) => {
        if (!mounted) {
          return;
        }

        if (res.error) {
          setFound(false);
          return;
        }
        setResults(
          res.map((resultBook) => {
            const bookInBookshelf = books.find(
              (book) => book.id === resultBook.id
            );
            return bookInBookshelf ? bookInBookshelf : resultBook;
          })
        );
      });
    } else {
      setResults([]);
    }

    return () => {
      mounted = false;
    };
  }, [query, books]);

  useEffect(() => {
    setFound(true);
  }, [results]);

  return (
    <div className="search-books">
      <SearchBar query={query} handleChange={handleChange} />
      <SearchResults
        results={results}
        updateMyBooks={updateMyBooks}
        found={found}
      />
    </div>
  );
}
