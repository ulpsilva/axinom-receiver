export interface IOAuthToken {
  accessToken: string;
  accessTokenExpiresAt: Date;
  client: object;
  clientId: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  user: object;
  userId: string;
  oauthUser: object;
}
