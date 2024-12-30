import Artwork from '../models/artwork.model.js';
import mongoose from 'mongoose';

export const getArtworks = async(req,res) =>{
    try {
        const artworks = await Artwork.find({});
        res.status(200).json({success: true, data: artworks});
    } catch (error) {
        console.log("Error in fetching artworks:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
        
    }
};

export const createArtwork = async(req, res) => {
    const artwork = req.body;

    if(!artwork.title || !artwork.date || !artwork.image || !artwork.artist){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newArtwork = new Artwork(artwork)

    try{
        await newArtwork.save();
        res.status(201).json({success: true, data:newArtwork});
    }catch(error){
        console.error("Error in creating artwork:", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const updateArtwork = async(req, res) => {
    const { id } = req.params;
    const artwork = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Artwork Id"});
    }

    try {
        const updatedArtwork = await Artwork.findByIdAndUpdate(id, artwork, {new:true});
        res.status(200).json({success:true, data: updatedArtwork});
    } catch (error) {
        console.error("Error in updating artwork:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteArtwork = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Artwork Id"});
    }

    try{
        await Artwork.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Artwork deleted"});
    }catch(error){
        console.log("Error in deleting artwork:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};
