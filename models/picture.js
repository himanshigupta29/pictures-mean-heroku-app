const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('picture', pictureSchema);
