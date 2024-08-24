const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser.js");
const book = require("../models/Books.js");
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes of the user
router.get('/fetchuserbook', fetchUser, async (req, res) => {
  try {
    let notes = await book.find({ user: req.user.id });
    res.json(notes)

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route 2: create the notes
router.post('/createbooks', [
  body('title', "title must have a minimum of 5 characters").isLength({ min: 3 }),
  body('descrption', 'description must have a minimum of 5 characters').isLength({ min: 5 }),
], fetchUser, async (req, res) => {
  try {
    const userd = req.user.id;
    const data = await book.create({
      user: userd,
      title: req.body.title,
      description: req.body.description,
      tag:req.body.tag,
      category:req.body.category,
      imageUrl:req.body.imageUrl
    })
    res.send(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route 3: update the notes
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    let notes = await book.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    notes = await book.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ notes })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route 4: delete the notes
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
  try {
    let notes = await book.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not found");
    }
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    notes = await book.findByIdAndDelete(req.params.id);
    res.json({ notes })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route 5: search books
router.post('/searchbooks', async (req, res) => {
    try {
      const { title } = req.body;
  
      if (!title) {
        return res.status(400).send("Title in request body is required");
      }
  
      const books = await book.find({ 
        title: { $regex: new RegExp(title, 'i') } 
      });
  
      if (books.length === 0) {
        return res.status(404).send("No books found");
      }
  
      res.json({ books });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

//Route 6: to see all the books based on category
//Route 5: search books
router.get('/searchcatbooks', async (req, res) => {
  try {
    const { category } = req.query; // Read from query

    // Validate if category parameter is provided
    if (!category) {
      return res.status(400).send("Category query parameter is required");
    }

    // Use MongoDB query to find books based on category
    const books = await book.find({ 
      category: category.toLowerCase() === 'fantasy' ? 'fantasy' : new RegExp(category, 'i')
    });

    // Check if books are found based on the query
    if (!books.length) {
      return res.status(404).send(`No books found with category '${category}'`);
    }

    // Respond with JSON object containing books array
    res.json({ books });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


  // Route 7: to get all books
router.get('/books', async (req, res) => {
    try {
      const books = await book.find();
  
      if (!books.length) {
        return res.status(404).send("No books found");
      }
  
      res.json({ books });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;

