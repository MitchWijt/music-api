import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { convertOptionsToExpressionValues } from "../utils/dbHelper"

export {
  query,
    get,
    put
}

const client = new DocumentClient({ region: 'us-east-1' })

async function query<T> (table: string, options: object): Promise<T[]> {
  const {
    keyConditionExpression,
    expressionAttrValues
  } = convertOptionsToExpressionValues(options)

  const params = {
    TableName: table,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttrValues
  }

  const res = await client.query(params).promise()
  return <T[]>res.Items
}

async function get<T> (table: string, pkValue: any): Promise<T> {
  const params = {
    TableName: table,
    Key: {
      PK: pkValue
    }
  }

  const res = await client.get(params).promise()
  return <T>res.Item
}

async function put<T> (table: string, data: T): Promise<void> {
  const params = {
    Item: data,
    TableName: table
  }

  await client.put(params).promise()
}

