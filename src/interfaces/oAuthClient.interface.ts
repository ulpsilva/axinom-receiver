export interface IOAuthClient {
  clientId: string;
  clientSecret: string;
  redirectUris: Array<string>;
  grants: Array<string>;
  user: {
    id: string;
    name: string;
  };
}
