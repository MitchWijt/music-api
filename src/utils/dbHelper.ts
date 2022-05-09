import _ from 'lodash'

interface ExpressionValues {
  keyConditionExpression: string
  expressionAttrValues: object
}

interface Options {
  pk?: {
    value: string
    condition?: string
  }
  sk?: {
    value: string
    condition?: string
  }
}

export function convertOptionsToExpressionValues (
  options: Options
): ExpressionValues {
  let keyConditionExpression = ''
  let expressionAttrValues = {}

  const pkObject = options.pk
  const skObject = options.sk

  if (!pkObject) throw new Error('PK is required when fetching data')

  keyConditionExpression += `PK = :pk`
  expressionAttrValues[`:pk`] = pkObject.value

  if (skObject) {
    if (skObject.condition && skObject.condition === 'begins_with') {
      keyConditionExpression += ` AND begins_with(SK, :sk)`
    } else {
      keyConditionExpression += ` AND SK = :sk`
    }

    expressionAttrValues[`:sk`] = skObject.value
  }

  return <ExpressionValues>{
    keyConditionExpression,
    expressionAttrValues
  }
}
