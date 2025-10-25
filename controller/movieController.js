import movieModel from "../models/movieModel.js";


export const listMovie = async (req,res) => {
    try{const data = await movieModel.find({})
    res.status(200).json({
        message: "Daftar Film:",
        data : data
    })

    }catch (error){
        res.status(500).json({
            message: error,
            data: null
        })
    }
}

export const createMovie = async (req,res)=>{
    try{const request = req.body
        console.log(request)
        const response = await movieModel.create({
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara,
        })
        res.status(201).json({
            message: "Data Film berhasil ditambahkan",
            data: response
        })

    }catch(error){
        res.status(500).json({
            error : error.message
        })
    }
}

export const updateMovie = async (req,res) => {
    try{const id = req.params?.id
        const request = req.body

        if(!id){
            return res.status(400).json({
                message : "Data Buku Wajib Diisi",
                data: null
            })
        }
        console.log(request)
        const response = await movieModel.findByIdAndUpdate(id, {
            judul : request.judul,
            tahunRilis : request.tahunRilis,
            sutradara : request.sutradara,
        })

        if(!response){
            return res.status(500).json({
                message: "Data Buku Gagal Diupdate :'(",
                data: response
            })
        }

        return res.status(200).json({
            message: "Data Buku Berhasil Diupdate :D"
        })

    }catch (error){
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

export const deleteMovie = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            res.status(204).json({
                message: "Data Film Wajib Diisi",
                data: response
            })
        }
        const response = await movieModel.findByIdAndDelete(id)
        if(response) {
            res.status(500).json({
                message : "Data Film Berhasil Dihapus",
                data: null
            })
        }
        return res.status(404).json({
            message: "Data Film Tidak Ditemukan",
            date: null
        })

    }catch (error){
        res.status(500).json({
            message : error,
            data: null
        })
    }
}