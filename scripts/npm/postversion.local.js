#!/usr/bin/env node

'use strict';

const {spawn} = require('child-process-promise');

const {npm_package_version, CHANNEL} = process.env;

async function main() {
  if (!CHANNEL || !npm_package_version) {
    console.error(
      'Expecting CHANNEL and npm_package_version to be set in the environment',
    );
    process.exit(1);
  }

  const commands = [
    // Create or force update the channel branch to build the docs site from
    ['git', 'checkout', '-B', `${CHANNEL}__release`],
    // Update all package.json versions in the monorepo
    `npm run update-version`,
    // Update package-lock.json
    `npm install`,
    // Fix up all package.json files
    `npm run update-packages`,
    // Extract error codes and update changelog, but only in production
    ...(CHANNEL === 'latest'
      ? [`npm run extract-codes`, `npm run update-changelog`]
      : []),
    `git add -A`,
    ['git', 'commit', '-m', `v${npm_package_version}`],
    [
      'git',
      'tag',
      '-a',
      `v${npm_package_version}`,
      '-m',
      `v${npm_package_version}`,
    ],
  ];

  for (const command of commands) {
    const commandArr = Array.isArray(command)
      ? command
      : ['bash', '-c', command];
    console.log(commandArr.join(' '));
    await spawn(commandArr[0], commandArr.slice(1), {stdio: 'inherit'});
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
