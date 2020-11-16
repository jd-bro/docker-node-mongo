const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  format: {
    type: String,
    required: true
  },
  imgSize: {
    type: String,
    required: true
  },
  orientation: {
    type : String
  },
  focalLength : {
    type : String
  },
  Exposure : {
    type : String
  },
  location : {
    type : String
  },
  

  date: {
    type: String
  },
  date1:{
    type: Date,
    default : Date.now

  }
  
  
});
ItemSchema.index({format : "text", imgSize: "text", orientation:"text",focalLength:"text", exposure:"text",location:"text"});

module.exports = Item = mongoose.model('item', ItemSchema);
