import { resolvers as songResolvers } from './song'
import { resolvers as artistResolvers } from './artist'
import _ from 'lodash'

export const resolvers = _.merge(songResolvers, artistResolvers)
