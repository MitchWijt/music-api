import { gql } from 'apollo-server'

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
    createArtist(name: String!, profilePicture: String!): Artist!
  }
`

export const resolvers = {
  Query: {
    async artist (root, { artist_uuid }, { models }) {
      return models.Artist.findOne(artist_uuid)
    },
    async allArtists (root, args, { models }) {
      return models.Artist.findAll()
    }
  },
  Mutation: {
    async createArtist (root, data, { models }) {
      return models.Artist.create(data)
    }
  }
}
