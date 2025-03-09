import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    songFile: { type: String, required: true },
    lyrics: { type: String, required: true },
}, { timestamps: true });

const Song = mongoose.model("Song", songSchema);
export default Song;
