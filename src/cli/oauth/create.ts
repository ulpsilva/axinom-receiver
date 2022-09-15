import inquirer from 'inquirer';
import chalk from 'chalk';
import randomString from 'randomstring';
import { v1 as uuidv1 } from 'uuid';
import { IOAuthClient } from '@interfaces/oAuthClient.interface';
import { OAuthClientModel } from '@models/oAuthClient.model';

export default async () => {
  const askName = () => {
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter a name for the client',
        default: 'SDK Client',
      },
    ];
    return inquirer.prompt(questions);
  };

  const ans = await askName();

  const data: IOAuthClient = {
    clientId: randomString.generate({
      length: 16,
      charset: 'alphabetic',
    }),
    clientSecret: randomString.generate({
      length: 30,
      charset: 'alphabetic',
    }),
    grants: ['client_credentials'],
    redirectUris: [],
    user: {
      id: uuidv1(),
      name: ans.name,
    },
  };

  const client = new OAuthClientModel(data);

  const createResult = await client.save();

  console.log(chalk.green('Client Id :'), createResult.clientId);
  console.log(chalk.green('Client Secret :'), createResult.clientSecret);
  console.log(chalk.green('Encoded Basic Token :'), Buffer.alloc(64, createResult.clientId + ':' + createResult.clientSecret).toString('base64'));
};
