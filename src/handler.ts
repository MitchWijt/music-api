import { ApolloServer } from 'apollo-server-lambda'
import { resolvers } from './gql'
import services from './services'
import { schema as songSchema } from './gql/song'
import { schema as artistSchema } from './gql/artist'

const server = new ApolloServer({
  typeDefs: [songSchema, artistSchema],
  resolvers,
  context: { ...services },
  csrfPrevention: true
})

exports.graphqlHandler = server.createHandler()