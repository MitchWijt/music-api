import { ApolloServer, gql } from 'apollo-server'
import { resolvers, schema } from '../../src/gql/artist'

const testServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  mocks: true
})

describe('Artist Queries', () => {
  it('returns a artist with a bio and name', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getArtist($artist_uuid: String!) {
          artist(artist_uuid: $artist_uuid) {
            bio
            name
          }
        }
      `,
      variables: {
        artist_uuid: '1234'
      }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.artist.bio).toBeDefined()
    expect(result.data?.artist.name).toBeDefined()
  })

  it('should return an error when variable is missing', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getArtist($artist_uuid: String!) {
          artist(artist_uuid: $artist_uuid) {
            bio
            name
          }
        }
      `,
      variables: {}
    })

    expect(result.errors).toBeDefined()
    expect(result.errors[0].message).toBe(
      'Variable "$artist_uuid" of required type "String!" was not provided.'
    )
  })

  it('should return a list of artists', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        query getAllArtists {
          allArtists {
            bio
            name
          }
        }
      `,
      variables: {}
    })

    expect(result.errors).toBeUndefined()

    expect(result.data.allArtists.length).toBeGreaterThan(0)
    expect(result.data.allArtists[0].bio).toBeDefined()
    expect(result.data.allArtists[0].name).toBeDefined()
    expect(result.data.allArtists[1].bio).toBeDefined()
    expect(result.data.allArtists[1].name).toBeDefined()
  })
})

describe('Artist Mutations', () => {
  it('returns a artist with a bio and name after creating a artist', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        mutation createArtist(
          $name: String!
          $profilePicture: String!
          $bio: String!
        ) {
          createArtist(
            name: $name
            profilePicture: $profilePicture
            bio: $bio
          ) {
            bio
            name
          }
        }
      `,
      variables: {
        name: 'test name',
        profilePicture: 'test picture',
        bio: 'test bio'
      }
    })

    expect(result.errors).toBeUndefined()
    expect(result.data?.createArtist.name).toBeDefined()
    expect(result.data?.createArtist.bio).toBeDefined()
  })

  it('returns a error if required field is missing', async () => {
    const result = await testServer.executeOperation({
      query: gql`
        mutation createArtist(
          $name: String!
          $profilePicture: String!
          $bio: String!
        ) {
          createArtist(
            name: $name
            profilePicture: $profilePicture
            bio: $bio
          ) {
            bio
            name
          }
        }
      `,
      variables: {
        profilePicture: 'test picture',
        bio: 'test bio'
      }
    })

    expect(result.errors[0].message).toBe(
      'Variable "$name" of required type "String!" was not provided.'
    )
    expect(result.errors).toBeDefined()
  })
})
