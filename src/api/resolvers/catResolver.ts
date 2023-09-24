// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import catModel from '../models/catModel';
import {locationInput} from '../../interfaces/Location';
import {Cat} from '../../interfaces/Cat';
import rectangleBounds from '../../utils/rectangleBounds';

export default {
  Query: {
    cats: async () => {
      return catModel.find();
    },
    catById: async (_parent: undefined, args: {id: string}) => {
      return catModel.findById(args.id);
    },
    catsByOwner: async (_parent: undefined, args: {id: string}) => {
      return catModel.find({owner: args.id});
    },
    catsByArea: async (_parent: undefined, args: locationInput) => {
      const box = rectangleBounds(args.topRight, args.bottomLeft);
      return catModel.find({
        location: {
          $geoWithin: {
            $geometry: box,
          },
        },
      });
    },
  },
  Mutation: {
    createCat: async (_parent: undefined, args: Cat) => {
      const newCat = new catModel(args);
      return await newCat.save();
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      return await catModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteCat: async (_parent: undefined, args: {id: string}) => {
      return await catModel.findByIdAndDelete(args.id);
    },
  },
};
