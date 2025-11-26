import userModel from "../models/userModel.js";
import { hashedPassword, verifyPassword } from "../utils/hashUtil.js";
import { getJwtToken } from "../utils/jwtUtil.js";

export const signIn = async (req,res) =>{
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).send({
                error: 'Email dan Password Wajib Diisi!',
                data: null
            })
        }

        //mencari user berdasarkan email
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(400).send({
                error: 'Email atau Password Salah!',
                data: null
            });
        }

        //verifikasi password
        const isMatch = await verifyPassword (password, user.password);
        if (!isMatch){
            return res.status(400).send({
                error: 'Password Salah',
                data: null
            });
        }
        

        //Generate Token Jika Valid
        const token = getJwtToken (user._id, user.username);
        return res.status(200).send({
            message: "Login Berhasil",
            data: {token}
        });
        } catch (error) {
            return res.status(400).send({
                message: error.message,
                error,
                data: null
            })
        }
}

export const signUp = async (req,res) => {
        try {
            const {username, email, password} = req.body;

            if (!username || !email || !password){
                return res.status(400).send({
                    error: "Username, Email, Dan Password Wajib Diisi",
                    data: null
                });
            }

            //Enkripsi password sebelum disimpan
            const hashPassword = await hashedPassword(password);

            const newUser = await userModel.create({
                username,
                email,
                password: hashPassword,
            });

            if (newUser) {
                return res.status(200).send({
                    message: "Berhasil Melakukan Pendaftaran, Silahkan Login",
                    data: null,
                });
            }
            return res.status(500).send({
                message: "Gagal Melakukan Pendaftaran, Silahkan Coba Lagi",
                data: null,
            });

        } catch(error){
            return res.status(400).send({
                message: error.message,
                error,
                data:null,
            })
        }
} 
