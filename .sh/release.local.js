const inquirer = require('inquirer').default;
const {execSync} = require('child_process');

async function main() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'CHANNEL',
        message: '请选择发布渠道:',
        choices: ['next', 'latest', 'nightly', 'dev'],
      },
      {
        type: 'confirm',
        name: 'NON_INTERACTIVE',
        message: '是否为非交互模式?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'DRY_RUN',
        message: '是否为干运行模式?',
        default: false,
      },
    ]);

    const {CHANNEL, NON_INTERACTIVE, DRY_RUN} = answers;

    const NON_INTERACTIVE_FLAG = NON_INTERACTIVE ? '--non-interactive' : '';
    const DRY_RUN_FLAG = DRY_RUN ? '--dry-run' : '';

    const command = `node scripts/npm/release.local.js --channel ${CHANNEL} ${NON_INTERACTIVE_FLAG} ${DRY_RUN_FLAG}`;

    console.log('执行命令:', command);
    execSync(command, {stdio: 'inherit'});
  } catch (error) {
    console.error('发生错误:', error);
    process.exit(1);
  }
}

main();
