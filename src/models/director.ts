import mongoose, { Schema } from "mongoose"

const directorSchema = new Schema({
  name: String,
  age: Number,
})

const model = mongoose.model("Director", directorSchema)

export default model
