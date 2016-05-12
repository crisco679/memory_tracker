var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var aMemory = new Schema ({
  userId: {type: Schema.ObjectId, ref: 'UserSchema'},
  memoryName: String,
  memoryDescription: String,
  dateCreated: {
    type: Date,
    default: new Date()
  },
  dateCreatedString: String
});

var Memory = mongoose.model('memories', aMemory);
module.exports = Memory;
