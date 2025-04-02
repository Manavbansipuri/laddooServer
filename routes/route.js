import express from "express";
import upload from "../middlewares/fileUploadMiddleware.js";
import { Song, Link } from "../model/model.js";

const router = express.Router();
// Welcome Route with H1
router.get("/", (req, res) => {
  res.send("<h1>Hello, welcome to LAddo admin!</h1>");
});



// Upload Route

router.post("/upload", upload.fields([{ name: "image" }, { name: "songFile" }]), async (req, res) => {
  try {
    const { title, lyrics } = req.body;
    
    // Extract S3 URLs from uploaded files
    const image = req.files["image"] ? req.files["image"][0].location : null;
    const songFile = req.files["songFile"] ? req.files["songFile"][0].location : null;

    if (!title || !lyrics || !image || !songFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSong = new Song({ title, image, songFile, lyrics });
    await newSong.save();

    res.status(200).json({ message: "Song uploaded successfully!", song: newSong });
  } catch (error) {
    console.log("Error ->", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get All Songs Route
router.get("/allSongs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.log("Occured error-> ", error.message);
    res.status(500).json({ error: error.message });
  }
});

// route for link
router.post("/addLink", async (req, res) => {
  try {
    const { description, link, coverImage } = req.body;

    if (!link || !coverImage) {
      return res.status(400).json({ message: "Link and Cover Image are required" });
    }

    const newLink = new Link({ description, link, coverImage });
    await newLink.save();

    res.status(201).json({ message: "Link added successfully", data: newLink });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// get all Links 
router.get("/getAllLinks", async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json({ message: "Links fetched successfully", data: links });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
