import cuid from "cuid"

import { IDatabase } from "../database";
import { Song } from "../database/models/song"

export class SongService {
    private database: IDatabase

    constructor(database: IDatabase){
        this.database = database
    }

    public async findByArtist (artist_uuid: string): Promise<Song[]> {
      return this.database.query<Song>('artists', {
        pk: {
            value: artist_uuid
        },
        sk: {
          value: 'song',
          condition: 'begins_with'
        }
      })
    }
      
    public async findOneByArtist ({ artist_uuid, song_uuid }: {artist_uuid: string, song_uuid: string}): Promise<Song> {
      const items = await this.database.query<Song>('artists', {
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
      
    public async create (data: Song): Promise<Song> {
      const songUUID = `song_${cuid()}`
      data.SK = songUUID
      data.amountStreamed = 0
    
      await this.database.put('artists', data)
      return this.findOneByArtist({ artist_uuid: data.PK, song_uuid: songUUID })
    }
}