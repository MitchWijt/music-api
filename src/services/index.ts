import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Database } from "../database";
import { DbHelper } from "../utils/dbHelper";
import { SongService } from "./songService";
import { ArtistService } from "./artistService";

const client = new DocumentClient({ region: 'us-east-1' })
const dbHelper = new DbHelper()
const database = new Database(dbHelper, client)

const songService = new SongService(database)
const artistService = new ArtistService(database)

export default {
    songService,
    artistService
}