const mongoose = require("mongoose");

const guestbookPostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Guestbook_posts", guestbookPostSchema);
