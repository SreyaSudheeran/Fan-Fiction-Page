import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Chapters = () => {
    const { id } = useParams(); // Extract the Id parameter from the URL path
    const host = 'http://localhost:5000';
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch(`${host}/api/chapter/chapters/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch chapters');
                }

                const json = await response.json();
                console.log(json);
                setChapters(json|| []);
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching chapters:', error);
                setError(error.message); // Set error state if fetch fails
                setLoading(false); // Set loading to false on error
            }
        };

        fetchChapters();
    }, [id]); // Dependency array with Id

    if (loading) {
        return <p>Loading...</p>; // Display a loading indicator while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Display an error message if fetch fails
    }

    return (
        <div className='container my-5'>
            {chapters.length === 0 ? (
                <p>No chapters available</p>
            ) : (
                chapters.map((chapter, index) => (
                    <>
                    <div key={chapter._id}>
                        <h3>Chapter {index + 1}:</h3>
                        <p>{chapter.title}</p>
                        <Link
                            to="/read"
                            state={{ title: chapter.title, description: chapter.description }}
                            className="btn btn-primary">
                            Read
                        </Link>
                    </div>
                    <hr></hr><br></br>
                    </>
                ))
            )}
        </div>
    );
};

export default Chapters;
