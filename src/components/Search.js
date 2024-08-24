import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StoryItem from './StoryItem';

const Search = () => {
  const host = 'http://localhost:5000';
  const location = useLocation();
  const { searchTerm } = location.state || '';
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${host}/api/notes/searchbooks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: searchTerm }),  // Corrected to pass searchTerm directly
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const json = await response.json();
        console.log(json);
        setBooks(json.books || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchTerm, host]);  // Dependencies to prevent infinite re-renders

  return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      <div className="container">
        <div className="row">
          {books.length > 0 ? (
            books.map((book) => (
              <div className="col-md-4" key={book._id}>
                <StoryItem 
                  title={book.title} 
                  description={book.description}
                  category={book.category} 
                />
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
