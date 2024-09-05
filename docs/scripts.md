# Lexical 项目 scripts 命令说明

## 开发相关

- `start`: 以开发模式启动项目,包括协作服务器和 playground。

- `dev`: 启动 playground 的开发服务器。

- `start:website`: 启动文档网站的开发服务器。

- `start:playground`: 启动 playground 的测试服务器。

## 构建相关

- `build`: 构建项目。

- `build-prod`: 清理并构建生产版本。

- `build-playground-dev`: 构建开发版本的 playground。

- `build-playground-prod`: 构建生产版本的 playground。

- `build-www`: 构建文档网站。

## 测试相关

- `test-unit`: 运行单元测试。

- `test-e2e-chromium`: 在 Chromium 上运行端到端测试。

- `test-e2e-firefox`: 在 Firefox 上运行端到端测试。

- `test-e2e-webkit`: 在 WebKit 上运行端到端测试。

## 代码检查和格式化

- `lint`: 运行 ESLint 检查代码。

- `prettier`: 使用 Prettier 检查代码格式。

- `prettier:fix`: 使用 Prettier 自动修复代码格式。

## 其他工具命令

- `flow`: 运行 Flow 类型检查。

- `tsc`: 运行 TypeScript 编译器。

- `changelog`: 生成变更日志。

- `release`: 准备发布新版本。

这些命令涵盖了 Lexical 项目的开发、构建、测试和维护等各个方面。开发者可以根据需要使用这些命令来管理项目。请注意,使用这些命令时应该使用 pnpm 作为包管理器。