import _ from 'lodash'

import { resolvers as songResolvers } from './song'
import { resolvers as artistResolvers } from './artist'


export const resolvers = _.merge(songResolvers, artistResolvers)
