import movieModel from "../models/movieModel.js";
import mongoose from "mongoose";

export const listMovie = async (req,res) => {
    try{
        //Hanya menampilkan movie milik user yang sedang login
        const movie = await movieModel.find({
            createdBy: req.user?.user_id
        }).sort({ createdAt: -1});
        
        return res.status(200).json({
        message: "Daftar Film:",
        data : movie
    })
    }catch (error){
        res.status(500).json({
            message: "Terjadi Kesalahan Pada Server",
            error: error.message,
            data: movie
        })
    }
}

export const createMovie = async (req,res)=>{
    try{
        const {judul, tahunRilis, sutradara} = req.body;
        if (!judul || !tahunRilis || sutradara){
            return res.status(400).json({
                message: "Semua Field Wajib Diisi!",
                data:null
            })
        }
        const movie = await movieModel.create({judul,tahunRilis, sutradara, createdBy: req.user?.user_id})

        return res.status(201).json({
            message: "Data Film berhasil ditambahkan",
            data: movie
        })

    }catch(error){
        res.status(500).json({
            message: "Gagal Menambahkan Movie",
            error: error.message,
            data: null,
        })
    }
}

export const detailMovie = async (req,res) => {
    try{
        const {id} = req.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "ID tidak valid", data: null});
        }

        //Mencari Movir Berdasarkan ID Dan Kepemilikan User
        const movie = await movieModel.findOne({
            _id: id,
            createdBy: req.user?.user_id,
        })
        if (!movie){
            return res.status(404).json({
                message: "Movie Tidak Ditemukan",
                data: null
            })
        }
        return res.status(200).json({
            message: "Detail Movie",
            data: movie
        })
    }catch(error){
        return res.status(500).json({
            message: "Terjadi Kesalahan Pada Server",
            error: error.message,
            data:null,
        })
    }
}

export const updateMovie = async (req,res) => {
    try{
        const {id} = req.params;
        const {judul, tahunRilis, sutradara} = req.body

        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message : "ID Tidak Valid",
                data: null
            })
        }
        //Update Hanya Jika ID Cocok dan User Pembuat Cocok
        const updateMovie = await movieModel.findByIdAndUpdate(
            {
                _id: id,
                createdBy: req.user?.user_id,
            },
            {judul, tahunRilis, sutradara},
            {new: true},
        );
        

        if(!updateMovie){
            return res.status(500).json({
                message: "Movie TIdak Ditemukan Atau Akses Ditolak",
                data: null
            })
        }

        return res.status(200).json({
            message: "Berhasil Mengupdate Movie",
            data: updateMovie,
        })

    }catch (error){
        res.status(500).json({
            message: "Terjadi Kesalahan Pada Server",
            error: error.message,
            data: null
        })
    }
}

export const deleteMovie = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id || mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "ID Tidak Valid", 
                data: null
            })
        }
        const deleteMovie = await movieModel.findByIdAndDelete({
            _id: id,
            createdBy: req.user?.user_id,
        })
        if(!deleteMovie) {
            res.status(404).json({
                message : "Data Movie Tidak Ditemukan Atau Akses Ditolak",
                data: null
            })
        }
        return res.status(200).json({
            message: "Berhasil Menghapus Movie",
            date: deleteMovie
        })

    }catch (error){
        res.status(500).json({
            message : "Terjadi Kesalahan Pada Server",
            error: error.message,
            data: null
        })
    }
}