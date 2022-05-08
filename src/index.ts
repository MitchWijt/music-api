import { ApolloServer } from 'apollo-server'

const server = new ApolloServer({
  typeDefs: undefined,
  resolvers: undefined,
  context: undefined
})

server.listen(3000).then(({ url }) => console.log(url))
