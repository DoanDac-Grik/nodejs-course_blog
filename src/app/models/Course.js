const mongoose = require('mongoose');
// Import plugin để tự động tạo slug
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug); 

var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Course = new Schema({
    name: { type: String, require: true},
    description: { type: String, require: true},
    videoId: { type: String},
    image: { type: String, maxLength: 255},
    slug: {type: String, slug:"name", unique: true}
  },
  {
    timestamps: true,
  }, 
  {
    collection: 'courses'
  });
 //Add plugin
Course.plugin(mongooseDelete,
  { overrideMethods: 'all',
    deletedAt : true
  });
//export module 
  module.exports = mongoose.model('Course',Course);