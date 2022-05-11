import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { IDbHelper } from '../utils/dbHelper'


export interface IDatabase {
  put<T>(table: string, data: T): Promise<void>
  query<T>(table: string, options: object): Promise<T[]>
  get<T>(table: string, pkValue: any): Promise<T>
}

export class Database implements IDatabase {
  private client: DocumentClient
  private dbHelper: IDbHelper


  constructor(dbHelper: IDbHelper, client: DocumentClient){
    this.client = client
    this.dbHelper = dbHelper
  }

  public async query<T> (table: string, options: object): Promise<T[]> {
    const {
      keyConditionExpression,
      expressionAttrValues
    } = this.dbHelper.convertOptionsToExpressionValues(options)
  
    const params = {
      TableName: table,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttrValues
    }
  
    const res = await this.client.query(params).promise()
    return <T[]>res.Items
  }
  
  public async get<T> (table: string, pkValue: any): Promise<T> {
    const params = {
      TableName: table,
      Key: {
        PK: pkValue
      }
    }
  
    const res = await this.client.get(params).promise()
    return <T>res.Item
  }
  
  public async put<T> (table: string, data: T): Promise<void> {
    const params = {
      Item: data,
      TableName: table
    }
  
    await this.client.put(params).promise()
  }
}

