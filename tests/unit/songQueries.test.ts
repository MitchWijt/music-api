import { ApolloServer, gql } from 'apollo-server'
import { resolvers, schema } from '../../src/gql/song'

const testServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  mocks: true
})

describe('Song Queries', () => {
  it('returns a song with a title and duration', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getSong($artist_uuid: String!, $song_uuid: String!) {
          song(artist_uuid: $artist_uuid, song_uuid: $song_uuid) {
            title
            duration
          }
        }
      `,
      variables: {
        artist_uuid: '1234',
        song_uuid: '1234'
      }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.song.title).toBeDefined()
    expect(result.data?.song.duration).toBeDefined()
  })

  it('should return an error when variable is missing', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getSong($artist_uuid: String!, $song_uuid: String!) {
          song(artist_uuid: $artist_uuid, song_uuid: $song_uuid) {
            title
            duration
          }
        }
      `,
      variables: {
        song_uuid: '1234'
      }
    })

    expect(result.errors).toBeDefined()
    expect(result.errors[0].message).toBe(
      'Variable "$artist_uuid" of required type "String!" was not provided.'
    )
  })

  it('should return a list of songs', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getSongs($artist_uuid: String!) {
          allSongsFromArtist(artist_uuid: $artist_uuid) {
            title
            duration
          }
        }
      `,
      variables: {
        artist_uuid: '1234'
      }
    })

    expect(result.errors).toBeUndefined()

    expect(result.data.allSongsFromArtist.length).toBeGreaterThan(0)
    expect(result.data.allSongsFromArtist[0].title).toBeDefined()
    expect(result.data.allSongsFromArtist[0].duration).toBeDefined()
    expect(result.data.allSongsFromArtist[1].title).toBeDefined()
    expect(result.data.allSongsFromArtist[1].duration).toBeDefined()
  })
})

describe('Song Mutations', () => {
  it('returns a song with a title and duration after creating a song', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        mutation createSong(
          $PK: String!
          $title: String!
          $description: String!
          $url: String!
          $duration: Int!
          $cover: String!
        ) {
          createSong(
            PK: $PK
            title: $title
            description: $description
            url: $url
            duration: $duration
            cover: $cover
          ) {
            title
            duration
          }
        }
      `,
      variables: {
        PK: '1234',
        title: 'test title',
        description: 'test desc',
        url: 'test url',
        duration: 200,
        cover: 'test cover'
      }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.createSong.title).toBeDefined()
    expect(result.data?.createSong.duration).toBeDefined()
  })

  it('returns a error if required field is missing', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        mutation createSong(
          $PK: String!
          $title: String!
          $description: String!
          $url: String!
          $duration: Int!
          $cover: String!
        ) {
          createSong(
            PK: $PK
            title: $title
            description: $description
            url: $url
            duration: $duration
            cover: $cover
          ) {
            title
            duration
          }
        }
      `,
      variables: {
        PK: '1234',
        description: 'test desc',
        url: 'test url',
        duration: 200,
        cover: 'test cover'
      }
    })

    expect(result.errors[0].message).toBe(
      'Variable "$title" of required type "String!" was not provided.'
    )
    expect(result.errors).toBeDefined()
  })
})
