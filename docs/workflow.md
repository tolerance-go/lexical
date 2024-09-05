# commit 后，系统会自动格式化和 lint 检查 staged 的内容

commit 格式约定为 [scope] type: xxx

eg:

- [lexical-table] fix: xxx
- [*] feat: xxx
- [lexical-table][lexical-react] fix: xxx

# 发布新版本的话，在 master 分支，执行 xxx 脚本，输入环境变量

- 会执行 npm run increment-version 根据参数首先修改版本号

- 然后执行 postversion.local（为了本地化，基于 postversion 改的）
    - 脚本基于当前分支切 release 发布分支，分支名称和 channel 相关
    - 然后更新子包的所有版本
    - 然后执行 npm install 更新依赖
    - 然后更新所有包的相关内容，执行 npm run update-packages
    - 如果 channel 是 latest
      - 则会运行 npm run extract-codes 提取错误代码消息，来帮忙分析问题
      - 还会运行 npm run update-changelog，读取 git log 生成新的 changelog 日志
    - 最后 git add 所有，提交，然后打上新的版本 tag


- 发布包之前，需要运行 prepare-release，进行完整构建，这还会更新 scripts/error-codes/codes.json，这是生产错误代码到错误消息的映射。在标记发布之前，必须提交此结果。
- 运行 npm run run-all 执行所有环境的端到端测试
- 运行 npm run release 上传到本地 npm

# 添加新功能

- 切 feat 分支，开发完成后执行
  - update-packages：更新包信息
  - ci-check：ci 前的检测，包括一些类型，lint，格式化等
  - prepare-release：发布前的准备功能执行一次

如果修改了测试用例，需要执行

- test-unit：单元测试
- test-e2e-chromium：chromium 一侧的端到端测试