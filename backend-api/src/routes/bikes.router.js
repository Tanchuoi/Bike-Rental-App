import express from "express";
import * as bikesController from "../controllers/bikes.controller.js";

const router = express.Router();

router.get("/bikes", bikesController.getBikes);
router.get("/bike/:id", bikesController.getBikeById);

export default router;
