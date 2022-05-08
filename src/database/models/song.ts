import dynamoDB from '../index'
import cuid from 'cuid'

export default {
  create,
  findBy,
  findAll,
  findOneBy
}

export interface Song {
  song_uuid?: string
  amountStreamed?: number
  cover: string
  description: string
  duration: number
  title: string
  url: string
}

interface SongConditions {
  song_uuid?: string
  amountStreamed?: number
  cover?: string
  description?: string
  duration?: number
  title?: string
  url?: string
}

//TODO: Make sure the PK value comes from the Schema. And make this a findByArtist instead of findAll
async function findAll (): Promise<Song[]> {
  return dynamoDB.findAll<Song>('artists', {
    pk: {
      value: 'artist_e31a1336-d789-47df-96b2-e92715f8b1dd',
      condition: ''
    },
    sk: {
      value: 'song',
      condition: 'begins_with'
    }
  })
}

//TODO: Make all functions work with certain PK and SK combinations. OR only a PK call if we want a single record
//TODO: Make a small documentation in regards to dynamoDB. In essence we can have 1 function that takes in different PK and SK combinations from different tables to fetch different results

//TODO: Make sure all Song, Artist and Album queries work.

async function findOneBy (conditions: SongConditions): Promise<Song> {
  const items = await findBy(conditions)
  if (!items.length) return <Song>{}

  return items[0]
}

async function findBy (conditions: SongConditions): Promise<Song[]> {
  return dynamoDB.findBy<Song>('artists', conditions)
}

async function create (data: Song): Promise<Song> {
  data.song_uuid = cuid()
  data.amountStreamed = 0

  await dynamoDB.put('artists', data)
  return findOneBy({ song_uuid: data.song_uuid })
}
