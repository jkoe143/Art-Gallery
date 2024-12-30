import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Artwork = mongoose.model('Artwork', artworkSchema);

export default Artwork;