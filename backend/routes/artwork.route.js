import express from "express";
import { getArtworks, createArtwork, updateArtwork, deleteArtwork } from "../controllers/artwork.controller.js";

const router = express.Router();

router.get("/", getArtworks);
router.post("/", createArtwork);
router.put("/:id", updateArtwork);
router.delete("/:id", deleteArtwork);

export default router;