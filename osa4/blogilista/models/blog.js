const mongoose = require('mongoose');
const logger = require('../utils/logger');

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { versionKey: false }
);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    logger.info('modifying toJSON - changing __id from Object to String');
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    logger.info(returnedObject);
  },
});

module.exports = mongoose.model('Blog', blogSchema);
