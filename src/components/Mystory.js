import React from 'react';
import { Link } from 'react-router-dom';

export default function Mystory(props) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <Link 
                    to={`/addchapter/${props.id}`} // Corrected usage of template string
                    state={{ title: props.title, description: props.description }}
                    className="btn btn-primary my-2">
                    Add Chapter
                </Link>
                <Link 
                    to={{ pathname: `/chapter/${props.id}` }}
                    className="btn btn-primary my-2">
                    Read More
                </Link>
            </div>
        </div>
    );
}
