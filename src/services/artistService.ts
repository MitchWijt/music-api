import cuid from "cuid"

import { IDatabase } from "../database";
import { Artist } from "../database/models/artist";

export class ArtistService {
    private database: IDatabase

    constructor(database: IDatabase){
        this.database = database
    }

    public async findAll (): Promise<Artist[]> {
        return this.database.query<Artist>('artists', {
          pk: {
            value: 'app',
          },
          sk: {
            value: 'artist',
            condition: 'begins_with'
          }
        })
    }
      
    public async findOne (artist_uuid: string): Promise<Artist> {
        const items = await this.database.query<Artist>('artists', {
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
      
    public async create (data: Artist): Promise<Artist> {
        const artistUUID = `artist_${cuid()}`
        data.SK = artistUUID
        data.PK = 'app'
      
        await this.database.put('artists', data)
        return this.findOne(artistUUID)
    }
}