const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lives: Number
});

// register a model
mongoose.model('Cat', CatSchema);

const Cat = mongoose.model('Cat'); // schema name will match collection name pluralized

const c = new Cat({
  name: 'paw newman',
  lives: 2
});


c.save((err, newCat, count) => {
  console.log(err, newCat, count);
});

mongoose.connect('mongodb://localhost/catdb');














