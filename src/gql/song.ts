import { gql } from 'apollo-server'

export const schema = gql`
  type Song {
    song_uuid: String!
    title: String!
    description: String!
    url: String!
    amountStreamed: Int!
    duration: Int!
    cover: String!
  }

  type Query {
    song(song_uuid: String!): Song!
    allSongs: [Song!]!
  }

  type Mutation {
    createSong(
      title: String!
      description: String!
      url: String!
      duration: Int!
      cover: String!
    ): Song!
  }
`

export const resolvers = {
  Query: {
    async song (root, { song_uuid }, { models }) {
      return models.Song.findOneBy({ song_uuid })
    },
    async allSongs (root, args, { models }) {
      return models.Song.findAll()
    }
  },
  Mutation: {
    async createSong (root, data, { models }) {
      return models.Song.create(data)
    }
  }
}
