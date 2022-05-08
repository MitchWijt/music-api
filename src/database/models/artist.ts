import dynamoDB from '../index'
import cuid from 'cuid'

export default {
  create,
  findBy,
  findAll,
  findOneBy
}

export interface Artist {
  artist_uuid?: string
  name: number
  profilePicture: string
}

interface ArtistConditions {
  artist_uuid?: string
  name?: number
  profilePicture?: string
}

const TABLE_NAME = 'artists'

async function findAll (): Promise<Artist[]> {
  return dynamoDB.findAll<Artist>('artists', {
    pk: {
      value: 'artist',
      condition: 'begins_with'
    }
  })
}

async function findOneBy (conditions: ArtistConditions): Promise<Artist> {
  const items = await findBy(conditions)
  if (!items.length) return <Artist>{}

  return items[0]
}

async function findBy (conditions: ArtistConditions): Promise<Artist[]> {
  return dynamoDB.findBy<Artist>(TABLE_NAME, conditions)
}

async function create (data: Artist): Promise<Artist> {
  data.artist_uuid = cuid()

  await dynamoDB.put(TABLE_NAME, data)
  return findOneBy({ artist_uuid: data.artist_uuid })
}
