const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: String,
    name: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  },
  { versionKey: false }
);
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
