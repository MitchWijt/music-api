import dynamoDB from '../index'

export default {
  create,
  findBy,
  findAll,
  findOneBy
}

export interface Song {
  song_uuid: string
  amountStreamed: number
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

const TABLE_NAME = 'songs'

async function findAll (): Promise<Song[]> {
  return dynamoDB.findAll<Song>(TABLE_NAME)
}

async function findOneBy (conditions: SongConditions): Promise<Song> {
  const items = await findBy(conditions)
  if (!items.length) return <Song>{}

  return items[0]
}

async function findBy (conditions: SongConditions): Promise<Song[]> {
  return dynamoDB.findBy<Song>(TABLE_NAME, conditions)
}

async function create (data: Song): Promise<Song> {
  await dynamoDB.put(TABLE_NAME, data)
  return findOneBy({ song_uuid: data.song_uuid })
}
