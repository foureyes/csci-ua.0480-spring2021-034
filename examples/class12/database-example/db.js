/*
mongodb
database -> collections -> documents

mongoose
(connection) -> schema / model / constructor -> instance
 */
const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lives: Number
});

// register a model
mongoose.model('Cat', CatSchema);
// schema / model name.... will turn into plural collection name


mongoose.connect('mongodb://localhost/class12');
// mongoose will queue all of your operations
// until connection goes through
// ... alternatively, use callback version of mongoose.connect
// see slides for non deprecated version
















