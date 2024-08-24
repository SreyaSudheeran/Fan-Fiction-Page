import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Write = () => {
    const [book, setBook] = useState({ title: "", description: "", category: "", tag: "" });
    const categories = ["Action", "Adventure", "Romance", "Horror", "Humour", "Mystery", "Science Fiction", "Non Fiction", "Fantasy"];
    const host = 'http://localhost:5000';
    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length > 0) {
            setBook(prevBook => ({ ...prevBook, category: categories[0] }));
        }
    }, []); // Pass an empty array to run this effect only once after initial render

    const onchange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/notes/createbooks`, {
                method: 'POST',
                headers: {
                    'authtoken': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error('Failed to upload book');
            }

            const json = await response.json();
            console.log(json);
            alert("Book uploaded successfully");
            navigate(`/addchapter/${json._id}`); // Navigate to addchapter with the returned ID
        } catch (error) {
            console.error('Failed to upload book:', error);
            alert("Failed to upload book");
        }
    };

    return (
        <div className='container my-5' style={{ alignContent: "center", textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        value={book.title}
                        onChange={onchange}
                        required
                    />
                </div>
                <div className="form-group my-5">
                    <label htmlFor="category">Select the Category</label>
                    <select
                        className="form-control"
                        id="category"
                        name='category'
                        value={book.category}
                        onChange={onchange}
                        required
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group my-5">
                    <label htmlFor="tag">Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        value={book.tag}
                        onChange={onchange}
                        required
                    />
                </div>
                <div className="form-group my-5">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        name='description'
                        value={book.description}
                        onChange={onchange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Write;
