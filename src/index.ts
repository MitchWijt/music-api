import { ApolloServer } from 'apollo-server'
import { resolvers } from './gql'
import models from './database/models'
import { schema as songSchema } from './gql/song'
import { schema as artistSchema } from './gql/artist'

const server = new ApolloServer({
  typeDefs: [songSchema, artistSchema],
  resolvers,
  context: { models }
})

server.listen(3000).then(({ url }) => console.log(url))
