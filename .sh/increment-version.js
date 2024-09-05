'use strict';

const inquirer = require('inquirer').default;
const {execSync} = require('child_process');

async function main() {
  try {
    const questions = [
      {
        type: 'list',
        name: 'CHANNEL',
        message: '请选择 CHANNEL:',
        choices: ['next', 'latest', 'nightly', 'dev'],
      },
    ];

    const {CHANNEL} = await inquirer.prompt(questions);
    const isPreview = CHANNEL === 'nightly';

    let UPDATE_CHANGELOG_FROM_LATEST_RELEASE = '';
    let INCREMENT = '';

    if (!isPreview) {
      const {UPDATE_CHANGELOG} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'UPDATE_CHANGELOG',
          message: '是否更新 CHANGELOG？',
        },
      ]);
      UPDATE_CHANGELOG_FROM_LATEST_RELEASE = UPDATE_CHANGELOG ? 'Y' : 'N';

      const {INCREMENT_CHOICE} = await inquirer.prompt([
        {
          type: 'list',
          name: 'INCREMENT_CHOICE',
          message: '请选择 INCREMENT:',
          choices: ['minor', 'patch', 'prerelease'],
        },
      ]);
      INCREMENT = INCREMENT_CHOICE;
    }

    // 设置环境变量
    process.env.CHANNEL = CHANNEL;
    process.env.LATEST_RELEASE = UPDATE_CHANGELOG_FROM_LATEST_RELEASE;
    process.env.INCREMENT = INCREMENT;

    // 执行 npm 命令
    execSync('npm run increment-version', {stdio: 'inherit'});
  } catch (error) {
    console.error('发生错误:', error);
    process.exit(1);
  }
}

main();
