import _ from 'lodash'

interface ExpressionValues {
  filterExpressions: string
  expressionAttrValues: object
}

export function convertConditionsToExpressionValues (
  conditions: object
): ExpressionValues {
  let filterExpressions = ''
  let expressionsAttrValues = {}

  const colNames = Object.keys(conditions)

  colNames.forEach(column => {
    const value = conditions[column]
    filterExpressions += `${column} = :${column} AND `
    expressionsAttrValues[`:${column}`] = value
  })

  // needs to remove the last AND en the end of a string
  filterExpressions = filterExpressions.slice(0, -4)

  return <ExpressionValues>{
    filterExpressions: filterExpressions,
    expressionAttrValues: expressionsAttrValues
  }
}
