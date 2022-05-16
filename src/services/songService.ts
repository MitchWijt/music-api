import cuid from "cuid"

import * as dynamoDB from "../database"
import { Song } from "../database/models/song"

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
    return this.findOneByArtist({ artist_uuid: data.PK, song_uuid: songUUID })
}