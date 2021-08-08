import mongoose from "mongoose"

const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
})

const model = mongoose.model("Movie", movieSchema)

export default model
