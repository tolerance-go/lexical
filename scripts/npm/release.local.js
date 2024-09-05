#!/usr/bin/env node

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';

const readline = require('readline');
const {exec} = require('child-process-promise');
const {packagesManager} = require('../shared/packagesManager');
const argv = require('minimist')(process.argv.slice(2));

const nonInteractive = argv['non-interactive'];
const dryRun = argv['dry-run'];
const channel = argv.channel;
const validChannels = new Set(['next', 'latest', 'nightly', 'dev']);
if (!validChannels.has(channel)) {
  console.error(`无效的发布渠道: ${channel}`);
  process.exit(1);
}

const registry = 'http://localhost:4873/';

async function publish() {
  const pkgs = packagesManager.getPublicPackages();
  if (!nonInteractive) {
    console.info(
      `您即将发布以下包:
    ${pkgs.map((pkg) => pkg.getNpmName()).join('\n')}

    发布地址: ${registry}
    发布渠道: ${channel}

    输入 "publish" 确认发布。`,
    );
    await waitForInput();
  }

  for (const pkg of pkgs) {
    console.info(`正在发布 ${pkg.getNpmName()}...`);
    if (dryRun === undefined || dryRun === 0) {
      await exec(
        `cd ./packages/${pkg.getDirectoryName()}/npm && npm publish --registry ${registry} --access public --tag ${channel}`,
      );
      console.info(`发布完成！`);
    } else {
      console.info(`干运行模式 - 跳过发布步骤。`);
    }
  }
}

async function waitForInput() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    rl.on('line', function (line) {
      if (line === 'publish') {
        rl.close();
        resolve();
      }
    });
  });
}

publish();
