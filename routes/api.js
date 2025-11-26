import express from "express"
import * as movieController from "../controller/movieController.js"
import * as userController from "../controller/userController.js"
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js"

const api = express.Router()

//Public Routes (Auth)
api.post("/signin", userController.signIn)
api.post("/signup",userController.signUp)

//Protected Routes (Auth)
api.get("/movie", authenticateTokenMiddleware, movieController.listMovie)
api.get("/movie/:id", authenticateTokenMiddleware, movieController.detailMovie)
api.post("/movie", authenticateTokenMiddleware,movieController.createMovie)
api.put("/movie/:id", authenticateTokenMiddleware, movieController.updateMovie)
api.delete("/movie/:id", authenticateTokenMiddleware, movieController.deleteMovie)

export default api 