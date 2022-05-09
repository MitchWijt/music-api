import { gql } from 'apollo-server'

export const schema = gql`
  type Song {
    PK: String!
    SK: String!
    title: String!
    description: String!
    url: String!
    amountStreamed: Int!
    duration: Int!
    cover: String!
  }

  type Query {
    song(artist_uuid: String!, song_uuid: String!): Song!
    allSongsFromArtist(artist_uuid: String!): [Song!]!
  }

  type Mutation {
    createSong(
      PK: String!
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
    async song (root, { artist_uuid, song_uuid }, { models }) {
      return models.Song.findOneByArtist({ artist_uuid, song_uuid })
    },
    async allSongsFromArtist (root, { artist_uuid }, { models }) {
      return models.Song.findByArtist(artist_uuid)
    }
  },
  Mutation: {
    async createSong (root, data, { models }) {
      return models.Song.create(data)
    }
  }
}
