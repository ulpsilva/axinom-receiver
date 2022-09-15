import { model, Schema, Document } from 'mongoose';
import { IOAuthClient } from '@interfaces/oAuthClient.interface';

export interface IOAuthClientModel extends Document, IOAuthClient {}

const schema = new Schema(
  {
    clientId: String,
    clientSecret: String,
    redirectUris: Array,
    grants: Array,
    user: {
      id: String,
      name: String,
    },
  },
  { timestamps: true },
);

export const OAuthClientModel = model<IOAuthClientModel>('OAuthClient', schema);
