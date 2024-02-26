import express from "express";
import { createBook, deleteBook, getAllBooks, updateBook } from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/token/verifyToken.js";

const router = express.Router();

router.get("/api/books", getAllBooks);

router.post("/api/books/create", verifyToken,createBook);
router.put("/api/books/update", verifyToken,updateBook);
router.delete("/api/books/delete", verifyToken,deleteBook);

export default router;
