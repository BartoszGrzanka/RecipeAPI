import { GraphQLScalarType, Kind } from 'graphql'

const Calories = new GraphQLScalarType({
  name: 'Calories',
  description: 'Custom scalar for values with calories (e.g., 200kcal)',
  serialize(value) {
    if (typeof value === 'string' && value.match(/^\d+kcal$/)) {
      return value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "kcal".')
  },
  parseValue(value) {
    if (typeof value === 'string' && value.match(/^\d+kcal$/)) {
      return value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "kcal".')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING && ast.value.match(/^\d+kcal$/)) {
      return ast.value
    }
    throw new Error('Invalid value format. Should be in the form of an integer followed by "kcal".')
  }
})

export default Calories
