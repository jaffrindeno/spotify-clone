import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum } from "../controller/adminController.js";

const router = Router();

//slightly optimized clean code
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum) ;

export default router;