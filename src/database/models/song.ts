import dynamoDB from '../index'
import cuid from 'cuid'

export default {
  create,
  findByArtist,
  findOneByArtist
}

export interface Song {
  PK: string
  SK?: string
  amountStreamed?: number
  cover: string
  description: string
  duration: number
  title: string
  url: string
}

async function findByArtist (artist_uuid: string): Promise<Song[]> {
  return dynamoDB.query<Song>('artists', {
    pk: {
      value: artist_uuid
    },
    sk: {
      value: 'song',
      condition: 'begins_with'
    }
  })
}

async function findOneByArtist ({ artist_uuid, song_uuid }: {artist_uuid: string, song_uuid: string}): Promise<Song> {
  const items = await dynamoDB.query<Song>('artists', {
    pk: {
      value: artist_uuid
    },
    sk: {
      value: song_uuid,
    }
  })

  if (!items.length) return <Song>{}
  return items[0]
}

async function create (data: Song): Promise<Song> {
  const songUUID = `song_${cuid()}`
  data.SK = songUUID
  data.amountStreamed = 0

  await dynamoDB.put('artists', data)
  return findOneByArtist({ artist_uuid: data.PK, song_uuid: songUUID })
}
