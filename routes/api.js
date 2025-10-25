import express from "express"
import * as movieController from "../controller/movieController.js"

const api = express.Router()

api.get("/movie", movieController.listMovie)
api.post("/movie", movieController.createMovie)
api.put("/movie/:id", movieController.updateMovie)
api.delete("/movie/:id", movieController.deleteMovie)

export default api 