# 维护者指南

这是一本涵盖 Lexical 单一仓库整体组织的神秘知识宝典，包括其约定、奇特之处和配置。

## 单一仓库组织结构

### 工作区

顶层的 `package.json` 使用 [npm 工作区](https://docs.npmjs.com/cli/v10/using-npm/workspaces) 来配置单一仓库。这主要意味着所有包共享一个顶层的 `package-lock.json`，并且通常使用 `npm run {command} -w {package}` 来从嵌套包的 `package.json` 中运行命令。

### 私有包

单一仓库中的某些包不会发布到 npm，例如：

* `packages/lexical-devtools` - 用于与 Lexical 站点协作的浏览器扩展
* `packages/lexical-playground` - [playground.lexical.dev](https://playground.lexical.dev/) 演示网站
* `packages/lexical-website` - [lexical.dev](https://lexical.dev/) 的 Docusaurus 网站，你现在可能正在阅读的就是它
* `packages/shared` - 被多个仓库使用的内部代码，但不应作为公共 API

这些包以及任何其他不应发布到 npm 的包，在它们的 `package.json` 中必须有 `"private": true` 属性。如果你有一个正在进行中的包，最终将公开但尚未准备好使用，它可能仍应设置为 `"private": true`，否则工具链会发现并发布它。

## 包命名约定

### 总体

| 用途 | 约定 |
| -- | -- |
| 目录名称 | `packages/lexical-package-name` |
| 入口点 | `packages/lexical-package-name/src/index.{ts,tsx}` |
| Flow 类型 | `packages/lexical-package/flow/LexicalPackageName.js.flow` |
| package.json 名称 | `@lexical/package-name` |
| 文档 | `packages/lexical-package-name/README.md` |
| 单元测试 | `packages/lexical-package-name/src/__tests__/unit/LexicalPackageName.test.{ts,tsx}` |
| dist（.gitignore 忽略的构建产物） | `packages/lexical-package-name/dist` |
| npm（.gitignore 忽略的预发布产物） | `packages/lexical-package-name/npm` |
| www 入口点 | `packages/lexical-package-name/LexicalPackageName.js` |

### 多模块导出 (@lexical/react)

一些包可能有多个模块（目前只有 `@lexical/react`），每个模块单独导出，而不是只有一个模块。在这种情况下，不应有 `index.ts` 入口点文件，顶层的每个模块都应该是一个入口点。所有入口点都应该是 TypeScript 文件，而不是包含 `index.ts` 文件的子目录。

[update-packages](#npm-run-update-packages) 脚本将确保导出与磁盘上的文件匹配。

## 创建新包

创建新包的第一步是创建工作区，有一个 [npm-init](https://docs.npmjs.com/cli/v10/commands/npm-init) 模板将根据约定为你填写一些默认值。

我们将使用创建 `lexical-eslint-plugin` 的步骤作为示例，该插件将作为 `@lexical/eslint-plugin` 发布到 npm。

### 创建工作区

```bash
npm init -w packages/lexical-eslint-plugin
```

这只会自动化第一步，创建一个文件：

<details><summary>

`packages/lexical-eslint-plugin/package.json`
</summary>

```json
{
  "name": "@lexical/eslint-plugin",
  "description": "",
  "keywords": [
    "lexical",
    "editor"
  ],
  "version": "0.14.3",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/facebook/lexical.git",
    "directory": "packages/lexical-eslint-plugin"
  },
  "main": "LexicalEslintPlugin.js",
  "types": "index.d.ts",
  "bugs": {
    "url": "https://github.com/facebook/lexical/issues"
  },
  "homepage": "https://github.com/facebook/lexical#readme"
}
```
</details>

在继续之前，对这个 `package.json` 进行以下一些后续步骤：

- 更新描述
- 添加适当的关键词

### 创建初始源文件

```bash
mkdir -p packages/lexical-eslint-plugin/src
code packages/lexical-eslint-plugin/src/index.ts
```

以下是你可能开始使用的这些文件的一些最小示例。我省略了许可证头，eslint 头/头修复器会帮助你处理！

<details><summary>

`packages/lexical-eslint-plugin/src/index.ts`
</summary>

```typescript
import { name, version } from '../package.json';

const plugin = {
  meta: { name, version },
  rules: {},
};

export default plugin;
```
</details>

### 运行 update-packages 生成样板文档和配置

```bash
npm run update-packages
```

这将设置 `tsconfig`、`flow` 等配置以识别你的新模块。它还将仅使用 `package.json` 中的描述创建一个初始的 `README.md`。

### 创建初始单元测试

```bash
mkdir -p packages/lexical-eslint-plugin/src/__tests__/unit
code packages/lexical-eslint-plugin/src/__tests__/unit/LexicalEslintPlugin.test.ts
```

<details><summary>

`packages/lexical-eslint-plugin/src/__tests__/unit/LexicalEslintPlugin.test.ts`
</summary>

```typescript
import plugin from '@lexical/eslint-plugin';

describe('LexicalEslintPlugin', () => {
  it('exports a plugin with meta and rules', () => {
    expect(Object.keys(plugin).sort()).toMatchObject(['meta', 'rules']);
  });
});
```
</details>

## 开发脚本

### npm run update-packages

此脚本运行：update-version、update-tsconfig、update-flowconfig、create-docs 和 create-www-stubs。可以随时安全地运行，并确保所有 `package.json` 文件的版本、路径设置正确以进行模块解析，以及各种默认值已填写。

这些脚本可以单独运行，但除非你正在处理其中一个脚本，否则最好全部运行。

### npm run prepare-release

这将运行所有预发布步骤，并允许你检查将上传到 npm 的工件。每个公共包将有一个 npm 目录，例如 `packages/lexical/npm`，其中包含这些工件。

这还会更新 `scripts/error-codes/codes.json`，这是生产错误代码到错误消息的映射。在标记发布之前，必须提交此结果。

### npm run ci-check

检查 Flow、TypeScript、Prettier 和 ESLint 是否有问题。是提交后（会自动修复大多数 Prettier 问题）和推送 PR 之前运行的好命令。

### npm run flow

检查 Flow 类型

### npm run tsc

检查 TypeScript 类型

### npm run tsc-extension

检查 lexical-devtools 扩展的 TypeScript 类型

### npm run test-unit

运行单元测试

### npm run lint

运行 ESLint

## 发布经理的脚本

### npm run extract-codes

这将运行一个构建，同时提取生成的 `error codes.json` 文件。

至少在每次发布之前应该这样做，但不要在任何 PR 中执行，因为这会导致序列号之间的冲突。

这样做是安全的，可能还建议更频繁地执行，可能在每次分支合并到 main 时执行。

每次生成发布构建时，`codes.json` 文件也会更新，这是一个故障保护，以确保这些代码在发布中是最新的。此命令运行开发构建以提取代码，这要快得多，因为它不执行任何优化/压缩步骤。

### npm run increment-version

增加单一仓库的版本。`-i` 参数必须是 `minor` | `patch` | `prerelease` 之一。

`postversion` 脚本将：
- 创建一个本地的 `${npm_package_version}__release` 分支
- 运行 `npm run update-version` 以更新示例和子包单一仓库依赖
- 运行 `npm install` 以更新 `package-lock.json`
- 运行 `npm run update-packages` 以更新其他生成的配置
- 运行 `npm run extract-codes` 以提取错误代码
- 运行 `npm run update-changelog` 以更新变更日志（如果不是预发布）
- 从分支创建一个版本提交和标签

这通常通过 `version.yml` GitHub 工作流执行，该工作流还将推送标签和分支。

### npm run changelog

从 git 历史记录更新变更日志。

### npm run release

*前提条件：* 所有之前的发布经理脚本，以及在 git 中创建标签，可能还有其他步骤。

运行 `prepare-release` 进行完整构建，然后上传到 npm。

## 发布流程

这是截至 2024 年 5 月（~0.15.0）的公共发布当前发布流程。

在此过程中，主分支应保持“冻结”（此期间不应合并其他 PR）。这避免了 GitHub 发布内容（从第 1 步中的 main 创建）与 NPM 发布内容（从第 4 步中的 main 创建）之间的不匹配。

1. 使用 GitHub Actions 的 “创建新发布分支” 工作流 (`version.yml`) 创建新版本
2. 针对该操作创建的版本分支提交 PR
3. PR 获得批准且测试通过后，合并 PR
4. PR 合并到 main 后，使用 GitHub Actions 的 “发布到 NPM” 工作流 (`pre-release.yml`) 发布到 NPM
5. 从第 1 步创建的标签创建一个 GitHub 发布，手动编辑发布说明
6. 在 Discord 的 #announcements 频道中宣布发布