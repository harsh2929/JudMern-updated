import express from "express";
import {
  addNewAdmin,
  addNewjudge,
  getAlljudges,
  getUserDetails,
  login,
  logoutAdmin,
  logoutlitigant,
  litiganteCourtRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  islitigantAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/litigant/eCourtRegister", litiganteCourtRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/judge/addnew", isAdminAuthenticated, addNewjudge);
router.get("/judges", getAlljudges);
router.get("/litigant/me", islitigantAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/litigant/logout", islitigantAuthenticated, logoutlitigant);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
