const mongoose = require('mongoose');

// any time we make a cat, it should have a name! and it should be a string
const CatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lives: Number
});

// register our schema as a model, which makes it available as a constructor later on
mongoose.model('Cat', CatSchema);
// schema name / model name... will be pluralized and lowercase for collection name


mongoose.connect('mongodb://localhost/catdb');















