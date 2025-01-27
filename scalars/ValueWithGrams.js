import { GraphQLScalarType, Kind } from 'graphql'

const ValueWithGrams = new GraphQLScalarType({
  name: 'ValueWithGrams',
  description: 'Custom scalar for values with grams (e.g., 500g)',
  serialize(value) {
    if (typeof value === 'string' && value.match(/^\d+g$/)) {
      return value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "g"')
  },
  parseValue(value) {
    if (typeof value === 'string' && value.match(/^\d+g$/)) {
      return value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "g"')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && ast.value.match(/^\d+g$/)) {
      return ast.value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "g"')
  }
})

export default ValueWithGrams
