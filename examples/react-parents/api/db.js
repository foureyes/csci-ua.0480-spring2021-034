const mongoose = require('mongoose');

const Gadget = new mongoose.Schema({
  type: String,
  name: String,
});

const gadgets = {
  Gadget: mongoose.model('Gadget', Gadget),
};

mongoose.connect('mongodb://localhost/class22', { useMongoClient: true });

module.exports = gadgets;
