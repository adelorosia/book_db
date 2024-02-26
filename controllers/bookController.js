import asyncHandler from "express-async-handler";
import Book from "../models/bookModel.js";
import User from "../models/userModel.js";

export const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.json(error);
  }
});

export const createBook = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { title, author, amount, due, cover, desc } = req.body;
  const user = await User.findById({ _id: userId });
  if (user && user.isAdmin) {
    await Book.create({
      title,
      author,
      amount,
      due,
      cover,
      desc,
    });
    res.json("create Successfull");
  } else {
    throw new Error("You are not admin");
  }
});

export const updateBook = asyncHandler(async (req, res) => {
  const { _id, title, author, amount, due, cover, desc } = req.body;
  const userId = req.userId;
  const currentUser = await User.findById({ _id: userId });
  const targetBook = await Book.findById(_id);
  if (!targetBook) throw new Error("Book not gefunden");
  if (currentUser.isAdmin || targetBook.userId === userId) {
    await Book.findByIdAndUpdate(targetBook._id, {
      title,
      author,
      amount,
      due,
      cover,
      desc,
    });
    res.json("update Successfull");
  } else {
    res.json("sie durfen nicht diese Post bearbeiten");
  }
});

export const deleteBook = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const userId = req.userId;
  const currentUser = await User.findById({ _id: userId });
  const targetBook = await Book.findById(_id);
  if (!targetBook) throw new Error("Book not gefunden");
  if (currentUser.isAdmin || targetBook.userId === userId) {
    await Book.findByIdAndDelete(targetBook._id);
    res.json("Delete Successfull");
  } else {
    res.json("sie durfen nicht diese Post Löchen");
  }
});
