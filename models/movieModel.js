import mongoose from "mongoose";
import UserModel from "./userModel.js";

const movieSchema = new mongoose.Schema(
    {
        judul : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },
        tahunRilis : {
            type : String,
            required : true,
            trim : true
        },
        sutradara : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },
        //Field Relasi
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: UserModel //Referensi ke UserModel
        }
    },
    {
        timestamps : true
    }    
);
    const movieModel = mongoose.model ("Movie", movieSchema)

    export default movieModel