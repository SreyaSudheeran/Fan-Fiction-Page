import React, { useState, useEffect } from 'react';
import './CardSlider.css';
import StoryItem from './StoryItem';

const Slider = (props) => {
  const host = 'http://localhost:5000'; 
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${host}/api/notes/searchcatbooks?category=${props.cat}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        setBooks(json.books || []);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, [props.cat]);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + books.length) % books.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % books.length);
  };

  return (
    <div className="slider-container">
      {books.length === 0 ? (
        <div>No book available</div>
      ) : (
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 300}px)` }}>
          {books.map((book, index) => (
            <div key={index}>
              <StoryItem title={book.title} url={book.imageUrl} description={book.description} id={book._id}/>
            </div>
          ))}
        </div>
      )}
      <button className="prev" onClick={handlePrevClick} disabled={books.length === 0}>
        Prev
      </button>
      <button className="next" onClick={handleNextClick} disabled={books.length === 0}>
        Next
      </button>
    </div>
  );
};

export default Slider;
