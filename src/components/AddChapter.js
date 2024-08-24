import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddChapter = () => {
    const { bookId } = useParams();
    console.log(bookId);
    const [chapter, setChapter] = useState({ title: "", description: "" });
    const host = 'http://localhost:5000';
    const navigate = useNavigate();

    const onchange = (e) => {
        setChapter({ ...chapter, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${host}/api/chapter/addchapters/${bookId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chapter),
            });

            if (!response.ok) {
                throw new Error('Failed to add chapter');
            }

            const json = await response.json();
            console.log(json);
            alert("Chapter added successfully");
            navigate("/profile")
        } catch (error) {
            console.error('Failed to add chapter:', error);
            alert("Failed to add chapter");
        }
    };

    return (
        <div className='container my-5' style={{ alignContent: "center", textAlign: "center" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                    <label htmlFor="title">Chapter Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        value={chapter.title}
                        onChange={onchange}
                        required
                    />
                </div>
                <div className="form-group my-5">
                    <label htmlFor="description">Chapter Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        name='description'
                        value={chapter.description}
                        onChange={onchange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Chapter</button>
            </form>
        </div>
    );
};

export default AddChapter;
