import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import minimist from 'minimist';
import inquirer from 'inquirer';
import { connect } from 'mongoose';
import oauth from '@/cli/oauth';
import { logger } from '@/utils/logger';
import { dbConnection } from '@databases';

const services = ['oauth'];
const argv = minimist(process.argv.slice(2));

const logo = () => {
  clear();
  console.log(chalk.yellow(figlet.textSync('Axinom Receiver', { horizontalLayout: 'controlled smushing' })));
  console.log('='.repeat(80));
};

const askService = () => {
  console.log(`Available services - (${services.toString()})`);
  console.log('='.repeat(50));

  const question = () => {
    const questions = [
      {
        type: 'input',
        name: 'service',
        message: 'Which service you want to run:',
        validate: function (value) {
          if (services.indexOf(value) >= 0) {
            return true;
          } else {
            return `Please enter a valid service - (${services.toString()})`;
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  };

  return question();
};

const askRunAgain = () => {
  const question = () => {
    const questions = [
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to run another service:',
      },
    ];
    return inquirer.prompt(questions);
  };

  return question();
};

const cli = async () => {
  logo();

  let isComplete = false;

  let service;
  if (argv._.length > 0) {
    if (services.indexOf(argv._[0]) >= 0) {
      service = argv._[0];
    } else {
      console.log(chalk.red('Please enter a valid service'));
    }
  }

  while (!isComplete) {
    if (!service) {
      const ans = await askService();
      service = ans.service;
    }

    switch (service) {
      case 'oauth':
        await oauth();
        break;
    }

    const ans = await askRunAgain();

    if (ans.confirm) {
      service = false;
    } else {
      isComplete = true;
    }
  }
};

connect(dbConnection.url, dbConnection.options)
  .then(() => {
    return cli();
  })
  .then(() => {
    logger.info('Bye!!.. see you again..');
    process.exit();
  })
  .catch(err => {
    logger.error(err);
  });
