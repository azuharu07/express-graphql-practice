import { makeExecutableSchema } from "@graphql-tools/schema"

import MovieModel from "../models/movie"
import DirectorModel from "../models/director"
import {
  Director,
  Movie,
  MutationDirectorInput,
  MutationMovieInput,
  QueryDirectorInput,
  QueryMovieInput,
} from "../types"

const typeDefs = `
type Movie {
  id: ID
  name: String
  genre: String
  directorId: String
  director: Director
}

input MovieInput {
  name: String!
  genre: String!
  directorId: ID
}

type Director {
  id: ID!
  name: String!
  age: Int!
  movies: [Movie]
}

input DirectorInput {
  name: String!
  age: Int!
}

type Query {
  movies: [Movie]
  movie(id: ID!): Movie
  directors: [Director]
  director(id: ID!): Director
}

type Mutation {
  addMovie(input: MovieInput): Movie
  addDirector(input: DirectorInput): Director
}

type Subscription {
  watchMovies: [Movie]
}
`

const resolvers = {
  Query: {
    movies: (): [Movie] => MovieModel.find(),
    movie: (_: Movie, { id }: QueryMovieInput): Movie => MovieModel.findById(id),
    directors: (): [Director] => DirectorModel.find(),
    director: (_: Director, { id }: QueryDirectorInput): Director => DirectorModel.findById(id),
  },
  Mutation: {
    addMovie: ({ name, genre }: MutationMovieInput): Movie => new MovieModel({ name, genre }).save(),
    addDirector: ({ name, age }: MutationDirectorInput): Director => new MovieModel({ name, age }).save(),
  },
  Movie: {
    director: (movie: Movie): Director => DirectorModel.findById(movie.directorId),
  },
  Director: {
    movies: (director: Director): Movie[] => MovieModel.find({ directorId: director.id }),
  },
}

export const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
