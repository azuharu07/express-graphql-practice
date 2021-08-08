export type Movie = {
  id: string
  name: string
  genre: string
  directorId: string
}

export type QueryMovieInput = {
  id: String
}

export type QueryMovieOutput = Movie | { director: Director }

export type MutationMovieInput = {
  name: string
  genre: string
}

export type Director = {
  id: string
  name: string
  age: number
}

export type QueryDirectorInput = {
  id: String
}

export type QueryDirectorOutput =
  | Director
  | {
      movies: Movie[]
    }

export type MutationDirectorInput = {
  name: string
  age: number
}
