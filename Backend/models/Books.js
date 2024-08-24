const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  category:{ type: String, required: true },
  tag: { type: String, required: true },
  imageUrl: { type: String , default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fbirkhauser.com%2Fbooks%2F9783035628791&psig=AOvVaw0sqjqIdHoiMyu3vSZ2cx4z&ust=1720698031965000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjlsozom4cDFQAAAAAdAAAAABAR"}  
});

module.exports = mongoose.model('Book', BookSchema);
