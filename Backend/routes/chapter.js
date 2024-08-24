const express = require('express');
const router = express.Router();
const Book = require('../models/Books'); // Assuming Books is correctly imported
const Chapter = require('../models/Chapter'); // Assuming Chapter is correctly imported

// Route to add a chapter to a book
router.post('/addchapters/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { title, description } = req.body;

  try {
    // Find the book to ensure it exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: 'Book not found' });
    }

    // Create the new chapter
    const newChapter = new Chapter({
      book: bookId,
      title,
      description,
    });

    await newChapter.save();
    res.status(201).send(newChapter);
  } catch (error) {
    res.status(400).send(error);
  }
});
//Route 2
router.get('/chapters/:bookId', async (req, res) => {
    const { bookId } = req.params;
  
    try {
      // Find the book to ensure it exists
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send({ error: 'Book not found' });
      }
  
      // Fetch chapters associated with the book
      const chapters = await Chapter.find({ book: bookId });
  
      res.status(200).send(chapters);
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  });
  
module.exports = router;
