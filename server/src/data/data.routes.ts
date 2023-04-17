import express from "express";
import { addData, getAllData, updateData, verifyData } from "./data.controller";
const router = express.Router();

router.get("/all", getAllData);
router.put("/update", updateData);
router.get("/verify", verifyData)
router.post("/add", addData);
export default router;