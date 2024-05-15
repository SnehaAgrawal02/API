const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true

  },
  image: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
  }
},{ timestamps: true });
const categoryModel = mongoose.model('categories', categorySchema);
module.exports = categoryModel;