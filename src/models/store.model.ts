import { model, Schema, Document } from 'mongoose';
import { IStore } from '@interfaces/store.interface';

export interface IStoreModel extends Document, IStore {}

const schema = new Schema(
  {
    files: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

const storeModel = model<IStoreModel>('Store', schema);

export default storeModel;
