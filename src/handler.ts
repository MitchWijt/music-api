import { ApolloServer } from 'apollo-server-lambda'

import { resolvers } from './gql'
import * as artistService from './services/artistService'
import * as songService from './services/songService'
import { schema as songSchema } from './gql/song'
import { schema as artistSchema } from './gql/artist'

const server = new ApolloServer({
  typeDefs: [songSchema, artistSchema],
  resolvers,
  context: { artistService, songService },
  csrfPrevention: true
})

exports.graphqlHandler = server.createHandler()