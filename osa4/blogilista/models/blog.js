const mongoose = require('mongoose');
const logger = require('../utils/logger');

const blogSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  { versionKey: false }
);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    logger.info('modifying toJSON - changing id from Object to String');
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    logger.info(returnedObject);
  },
});

module.exports = mongoose.model('Blog', blogSchema);
