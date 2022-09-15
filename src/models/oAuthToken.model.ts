import { model, Schema, Document } from 'mongoose';
import { IOAuthToken } from '@interfaces/oAuthToken.interface';

export interface IOAuthTokenModel extends Document, IOAuthToken {}

const schema = new Schema({
  accessToken: String,
  accessTokenExpiresAt: Date,
  client: Object,
  clientId: String,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  user: Object,
  userId: String,
});

export const OAuthTokenModel = model<IOAuthTokenModel>('OAuthToken', schema);
