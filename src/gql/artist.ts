import { gql } from 'apollo-server-lambda'

export const schema = gql`
  type Artist {
    PK: String!
    SK: String!
    name: String!
    bio: String!
    profilePicture: String!
  }

  type Query {
    artist(artist_uuid: String!): Artist!
    allArtists: [Artist!]!
  }

  type Mutation {
    createArtist(name: String!, profilePicture: String!, bio: String!): Artist!
  }
`

export const resolvers = {
  Query: {
    async artist (root, { artist_uuid }, { artistService }) {
      return artistService.findOne(artist_uuid)
    },
    async allArtists (root, args, { artistService }) {
      return artistService.findAll()
    }
  },
  Mutation: {
    async createArtist (root, data, { artistService }) {
      return artistService.create(data)
    }
  }
}
