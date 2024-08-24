import React from 'react';
import Slider from './Slider';

export default function Home() {
  const categories = ["Action", "Adventure", "Romance", "Horror", "Humour", "Mystery", "Science Fiction", "Non Fiction","Fantasy"];
  return (
    <div className='container my-5'style={{alignContent:"center",textAlign:"center"}}>
      <h1>Welcome to Story Verse</h1>
      <br></br>
      {categories.map((category, index) => (
        <div key={index}>
          <h2>{category}</h2>
          <Slider cat={category}/>
          <hr />
        </div>
      ))}
    </div>
  );
}
