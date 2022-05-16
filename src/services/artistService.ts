import cuid from "cuid"

import * as dynamoDB from "../database"
import { Artist } from "../database/models/artist";

export {
    findAll,
    findOne,
    create
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
    return this.findOne(artistUUID)
}