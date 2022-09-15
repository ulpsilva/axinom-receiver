import inquirer from 'inquirer';
import create from '@/cli/oauth/create';

const table = ['create'];

export default async () => {
  const askAction = () => {
    const questions = [
      {
        type: 'input',
        name: 'action',
        message: `What you want to do (${table.toString()}):`,
        validate: function (value) {
          if (table.indexOf(value) >= 0) {
            return true;
          } else {
            return `Please enter a valid action - (${table.toString()})`;
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  };

  const ans = await askAction();

  switch (ans.action) {
    case 'create':
      await create();
      break;
  }
};
