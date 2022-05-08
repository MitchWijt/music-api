import { DocumentClient, ItemList } from 'aws-sdk/clients/dynamodb'
import { convertOptionsToExpressionValues } from '../utils/dbHelper'

const ddb = new DocumentClient({ region: 'us-east-1' })

export default {
  put,
  findBy,
  findAll
}

async function findAll<T> (table: string, options: object): Promise<T[]> {
  const {
    keyConditionExpression,
    expressionAttrValues
  } = convertOptionsToExpressionValues(options)

  const params = {
    TableName: table,
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttrValues
  }

  const res = await ddb.query(params).promise()
  return <T[]>res.Items
}

async function findBy<T> (table: string, options: object): Promise<T[]> {
  const {
    keyConditionExpression,
    expressionAttrValues
  } = convertOptionsToExpressionValues(options)

  const params = {
    FilterExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttrValues,
    TableName: table
  }

  const res = await ddb.scan(params).promise()
  return <T[]>res.Items
}

async function put<T> (table: string, data: T): Promise<void> {
  const params = {
    Item: data,
    TableName: table
  }

  await ddb.put(params).promise()
}
