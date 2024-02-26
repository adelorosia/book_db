import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    amount: {
      type: String,
    },
    due: {
      type: String,
    },
    cover: {
      type: String,
    },
    desc: {
      type: String,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
