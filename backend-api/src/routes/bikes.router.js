import express from "express";
import * as bikesController from "../controllers/bikes.controller.js";
import * as mailController from "../controllers/mail.controller.js";

const router = express.Router();

router.get("/bikes", bikesController.getBikes);
router.get("/bike/:id", bikesController.getBikeById);
router.post("/sendMail", mailController.sendMail);

export default router;
