import OAuthServer from 'express-oauth-server';
import OAuthModel from '@services/oAuth.service';

const oauth = new OAuthServer({
  model: OAuthModel,
  grant: ['client_credentials'],
  debug: true,
  accessTokenLifetime: 60 * 60 * 24 * 2,
  refreshTokenLifetime: 60 * 60 * 24 * 5,
  allowExtendedTokenAttributes: true,
});

export default oauth;
