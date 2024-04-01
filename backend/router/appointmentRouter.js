import express from "express";
import {
  deleteFileCase,
  getAllFileCases,
  postFileCase,
  updateFileCaseStatus,
} from "../controller/FileCaseController.js";
import {
  isAdminAuthenticated,
  islitigantAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", islitigantAuthenticated, postFileCase);
router.get("/getall", isAdminAuthenticated, getAllFileCases);
router.put("/update/:id", isAdminAuthenticated, updateFileCaseStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteFileCase);

export default router;
