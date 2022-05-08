import { DocumentClient, ItemList } from 'aws-sdk/clients/dynamodb'
import { convertConditionsToExpressionValues } from '../utils/dbHelper'

const ddb = new DocumentClient({ region: 'us-east-1' })

export default {
  put,
  findBy,
  findAll
}

async function findAll<T> (table: string): Promise<T[]> {
  const params = {
    TableName: table
  }

  const res = await ddb.scan(params).promise()
  return <T[]>res.Items
}

async function findBy<T> (table: string, conditions: object): Promise<T[]> {
  const {
    filterExpressions,
    expressionAttrValues
  } = convertConditionsToExpressionValues(conditions)

  const params = {
    FilterExpression: filterExpressions,
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
