import { convertOptionsToExpressionValues } from '../../src/utils/dbHelper'

describe('Given options without a PK', () => {
  it('should throw an error', () => {
    const options = {
      sk: {
        value: 'test'
      }
    }

    try {
      convertOptionsToExpressionValues(options)
    } catch (err) {
      expect(err.message).toBe('PK is required when fetching data')
    }
  })
})

describe('Given options with a PK and SK', () => {
  it('should return valid expression string and values', () => {
    const options = {
      pk: {
        value: 'testPK'
      },
      sk: {
        value: 'testSK'
      }
    }

    const {
      keyConditionExpression,
      expressionAttrValues
    } = convertOptionsToExpressionValues(options)

    expect(keyConditionExpression).toBe('PK = :pk AND SK = :sk')
    expect(JSON.stringify(expressionAttrValues)).toBe(
      '{":pk":"testPK",":sk":"testSK"}'
    )
  })
})

describe('Given options with a PK and no SK', () => {
  it('should return valid expression string and values', () => {
    const options = {
      pk: {
        value: 'testPK'
      }
    }

    const {
      keyConditionExpression,
      expressionAttrValues
    } = convertOptionsToExpressionValues(options)

    expect(keyConditionExpression).toBe('PK = :pk')
    expect(JSON.stringify(expressionAttrValues)).toBe('{":pk":"testPK"}')
  })
})

describe('Given options with a PK and a SK with condition', () => {
  it('should return valid expression string and values', () => {
    const options = {
      pk: {
        value: 'testPK'
      },
      sk: {
        value: 'testSK',
        condition: 'begins_with'
      }
    }

    const {
      keyConditionExpression,
      expressionAttrValues
    } = convertOptionsToExpressionValues(options)

    expect(keyConditionExpression).toBe('PK = :pk AND begins_with(SK, :sk)')
    expect(JSON.stringify(expressionAttrValues)).toBe(
      '{":pk":"testPK",":sk":"testSK"}'
    )
  })
})
