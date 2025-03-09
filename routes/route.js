import express from "express";
import upload from "../middlewares/fileUploadMiddleware.js";
import Song from "../model/model.js";

const router = express.Router();
// Welcome Route with H1
router.get("/", (req, res) => {
  res.send("<h1>Hello, welcome to LAddo admin!</h1>");
});



// Upload Route
router.post("/upload", upload.fields([{ name: "image" }, { name: "songFile" }]), async (req, res) => {
  try {
    const { title, lyrics } = req.body;
    const image = req.files["image"] ? req.files["image"][0].path : null;
    const songFile = req.files["songFile"] ? req.files["songFile"][0].path : null;

    console.log("Uploaded Files:", req.files);
    console.log("Request Body:", req.body);

    if (!title || !lyrics || !image || !songFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSong = new Song({ title, image, songFile, lyrics });
    await newSong.save();

    res.status(200).json({ message: "Song uploaded successfully!", song: newSong });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Songs Route
router.get("/allSongs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
