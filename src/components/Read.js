import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Read() {
    const location = useLocation();
    const { title, description } = location.state || { title: 'No title', description: 'No description available' };

    return (
        <div className='container my-5' style={{ alignContent: "center", textAlign: "center" }}>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}
