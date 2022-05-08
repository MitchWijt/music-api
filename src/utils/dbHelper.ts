import _ from 'lodash'

interface ExpressionValues {
  keyConditionExpression: string
  expressionAttrValues: object
}

interface Options {
  pk?: {
    value: string
    condition: string
  }
  sk?: {
    value: string
    condition: string
  }
}

export function convertOptionsToExpressionValues (
  options: Options
): ExpressionValues {
  let keyConditionExpression = ''
  let expressionAttrValues = {}

  const pkObject = options.pk
  const skObject = options.sk

  // can be made in a generic function based on the PK or SK
  // we can determine if AND needs to be appended to the string based on if we have an SK value
  if (pkObject) {
    if (pkObject.condition === 'begins_with') {
      keyConditionExpression += `begins_with(PK, :pk) AND `
    } else {
      keyConditionExpression += `PK = :pk AND `
    }
    expressionAttrValues[`:pk`] = pkObject.value
  }

  if (skObject) {
    if (skObject.condition === 'begins_with') {
      keyConditionExpression += `begins_with(SK, :sk)`
    } else {
      keyConditionExpression += `SK = :sk`
    }

    expressionAttrValues[`:sk`] = skObject.value
  }

  return <ExpressionValues>{
    keyConditionExpression,
    expressionAttrValues
  }
}
