import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    songFile: { type: String, required: true },
    lyrics: { type: String, required: true },
}, { timestamps: true });

const linkSchema = new mongoose.Schema({
    description: String,
    link: String,
    coverImage: String,
}, { timestamps: true });

const Song = mongoose.model("Song", songSchema);
const Link = mongoose.model("Link", linkSchema);

export { Song, Link }; 
