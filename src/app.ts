import express from "express"
import { graphqlHTTP } from "express-graphql"
import mongoose from "mongoose"
import { executableSchema } from "./schema"
const app = express()

require("dotenv").config()

const dbendpoint = process.env.MONGODB_ENDPOINT ?? ""

mongoose.connect(dbendpoint)
mongoose.connection.once("open", () => {
  console.log("db connected")
})

const PORT = 4000

app.use(
  "/graphql",
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log("listening port http://localhost:4000")
})
