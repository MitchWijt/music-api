import Song from './database/models/song'

// async function test () {
//   const res = await Song.findAll()
//   console.log(res)
// }

async function test2 () {
  const res = await Song.create({
    song_uuid: '9bc4ffe5-e617-48fe-9e0a-d8f6fcf5fc5b',
    title: 'Set Myself Free',
    description: 'A hardstyle song',
    url: 'https://spotify.com',
    cover: 'https://cover.com',
    amountStreamed: 0,
    duration: 160
  })
  console.log(res)
}

// test()
test2()

// import { ApolloServer } from 'apollo-server'

// const server = new ApolloServer({
//   typeDefs: undefined,
//   resolvers: undefined,
//   context: undefined
// })

// server.listen(3000).then(({ url }) => console.log(url))
