import React, { useState, useEffect } from 'react';
import Mystory from './Mystory';

export default function Profile() {
    const host = 'http://localhost:5000'; 
    const [books, setBooks] = useState([]);
    const [credential,setCredential]=useState({})

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${host}/api/notes/fetchuserbook`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken':localStorage.getItem('token')
                    }
                });
                const json = await response.json();
                console.log('Fetched Books:', json.books);
                setBooks(json || []);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };
        const getuser = async () => {
            try {
                const response = await fetch(`${host}/api/auth/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken':localStorage.getItem('token')
                    }
                });
                const json = await response.json();
                setCredential(json);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
        getuser();
    }, []);

    useEffect(() => {
        console.log('Books state:', books);
    }, [books]);

    return (
        <div className='container my-5' style={{ alignContent: 'center', textAlign: 'center' }}>
            <h2>Welcome {credential.name}</h2>
            <br />
            <i className="fa-regular fa-user"></i>
            <p>{credential.username}</p>
            <hr /><br />
            <h3>Your writings</h3>
            <div className="container">
                <div className="row">
                    {books.length > 0 ? books.map((book) => (
                        <div className="col-md-4" key={book._id}>
                            <Mystory 
                                title={book.title} 
                                description={book.description}
                                category={book.category} 
                                id={book._id}
                            />
                        </div>
                    )) : <p>No books available</p>}
                </div>
            </div>
            <hr /><br />
            {/* <h3>Continue Reading</h3>
            <div className="container">
                <div className="row">
                    {books.length > 0 ? books.map((book) => (
                        <div className="col-md-4" key={book._id}>
                            <StoryItem 
                                title={book.title} 
                                description={book.description}
                                category={book.category} 
                            />
                        </div>
                    )) : <p>No books available</p>}
                </div>
            </div> */}
        </div>
    );
}
