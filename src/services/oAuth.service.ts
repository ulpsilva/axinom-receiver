import { OAuthClientModel } from '@models/oAuthClient.model';
import { OAuthTokenModel } from '@models/oAuthToken.model';

/**
 * Get client.
 */

export const getClient = async function (clientId, clientSecret) {
  return OAuthClientModel.findOne({
    clientId: clientId,
    clientSecret: clientSecret,
  }).lean();
};

/**
 * Get access token.
 */

export const getAccessToken = async function (accessToken) {
  return OAuthTokenModel.findOne({ accessToken: accessToken }).lean();
};

/**
 * Get user from client.
 */

export const getUserFromClient = function (client) {
  return client.user;
};

/**
 * Save token.
 */

export const saveToken = function (token, client, user) {
  const accessToken = new OAuthTokenModel({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client: client,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user: user,
    userId: user._id,
  });

  return new Promise(function (resolve, reject) {
    accessToken.save(function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  }).then(function (saveResult: any) {
    // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
    saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;

    // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
    const data: any = new Object();
    for (const prop in saveResult) data[prop] = saveResult[prop];

    // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
    data.client = data.clientId;
    data.user = data.user.id;
    data.oauthUser = data.user;

    return data;
  });
};

export default {
  getClient,
  saveToken,
  getUserFromClient,
  getAccessToken,
};
