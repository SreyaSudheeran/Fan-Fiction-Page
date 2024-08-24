import { useState } from "react";
import bookContext from "./bookContext";

const BookState = (props) => {

  const notes = [];
  const [note, setNote] = useState(notes);
  const host = 'http://localhost:5000';


  //Add a book
  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description }),
    });
    const notes = await response.json();
    setNote(note.concat(notes));
  }
 
  //Delete Book
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token') // Replace with your auth token
      },
    });
    const newNotes = note.filter((notes) => { return notes._id !== id });
    setNote(newNotes);
  }
  //get book by category
//   const getBook = async () => {
//     try {
//         const response = await fetch(`${host}/api/notes/login`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ category: props.cat }),
//           });
//           const json = await response.json();
//           console.log(json);
//       console.log('Fetched Note:', json); // Log the fetched data
//       setNote(json); // Assuming setNote is a function that sets state or performs an action with the fetched data
  
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle error appropriately, e.g., set an error state
//     }
//   };

  //getnote 

  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchuser`, {
        method: 'GET',
        headers: {
          'authtoken': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log('Fetched Note:', json); // Log the fetched data
      setNote(json); // Assuming setNote is a function that sets state or performs an action with the fetched data
  
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., set an error state
    }
  };
  
  
  //edit Book
  const editNote = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('token') // Replace with your auth token
      },
      body: JSON.stringify({ title, description }),
    });
    const json = response.json();

    //client side
    for (let index = 0; index < note.length; index++) {
      const element = note[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
      }
    }
  }
  return (
    <bookContext.Provider value={{ note, setNote, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </bookContext.Provider>
  )
}

export default BookState;