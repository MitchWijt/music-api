import dynamoDB from '../index'
import cuid from 'cuid'

export default {
  create,
  findAll,
  findOne
}

export interface Artist {
  PK: string
  SK?: string
  bio: string
  name: number
  profilePicture: string
}

async function findAll (): Promise<Artist[]> {
  return dynamoDB.query<Artist>('artists', {
    pk: {
      value: 'app',
    },
    sk: {
      value: 'artist',
      condition: 'begins_with'
    }
  })
}

async function findOne (artist_uuid: string): Promise<Artist> {
  const items = await dynamoDB.query<Artist>('artists', {
    pk: {
      value: 'app',
    },
    sk: {
      value: artist_uuid,
    }
  })

  if (!items.length) return <Artist>{}
  return items[0]
}

async function create (data: Artist): Promise<Artist> {
  const artistUUID = `artist_${cuid()}`
  data.SK = artistUUID
  data.PK = 'app'

  await dynamoDB.put('artists', data)
  return findOne(artistUUID)
}
