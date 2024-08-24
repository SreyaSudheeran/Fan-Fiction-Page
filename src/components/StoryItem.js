import React from 'react';
import { Link } from 'react-router-dom';

export default function StoryItem(props) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <Link 
                    to={{ pathname: `/chapter/${props.id}` }}
                    className="btn btn-primary">
                    Read More
                </Link>
            </div>
        </div>
    );
}
