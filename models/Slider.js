const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true

  },
  description: {
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
const SliderModel = mongoose.model('slider', SliderSchema);
module.exports = SliderModel;