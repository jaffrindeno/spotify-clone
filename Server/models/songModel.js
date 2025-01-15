import mongoose from "mongoose";
const Schema  = mongoose.Schema;

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    albumId: {
        type: String
    }
},{timestamps: true});

export const Song = mongoose.model("Song",songSchema);
