const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChapterSchema = new Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },  
});

module.exports = mongoose.model('chapter', ChapterSchema);
