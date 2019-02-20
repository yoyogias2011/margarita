// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

import GraphQLDateType from './DateType';
import GraphQLLocation from './Location';
import type { RouteStop } from '../../dataloaders/bookingsLoader/BookingFlowTypes';
import type { GraphqlContextType } from '../../services/GraphQLContext';

export default new GraphQLObjectType({
  name: 'RouteStop',
  description: 'Departure or arrival for a segment',
  fields: {
    cityName: {
      type: GraphQLString,
    },
    cityId: {
      type: GraphQLString,
    },
    time: {
      type: GraphQLDateType,
    },
    airport: {
      type: GraphQLLocation,
      resolve: async (
        { code }: RouteStop,
        _: mixed,
        { dataLoader }: GraphqlContextType,
      ) => {
        if (code == null) {
          return null;
        }
        const airport = await dataLoader.locations.load({ code });
        if (!Array.isArray(airport) || airport.length < 1) {
          return null;
        }
        return airport[0];
      },
    },
  },
});