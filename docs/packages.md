# Lexical 项目 packages 目录说明

## 核心包

- `lexical`: 核心库,包含 Editor、EditorState、Selection 和核心节点等基础功能。

## 功能包

- `@lexical/react`: 提供 React 组件包装器,简化 Lexical 与 React 的集成。

- `@lexical/rich-text`: 提供富文本编辑功能,如标题、引用等。

- `@lexical/list`: 提供列表相关功能。

- `@lexical/table`: 提供表格功能。

- `@lexical/clipboard`: 提供剪贴板相关功能。

- `@lexical/code`: 提供代码块和语法高亮功能。

- `@lexical/link`: 提供链接功能。

- `@lexical/markdown`: 提供 Markdown 导入/导出功能。

- `@lexical/history`: 提供撤销/重做历史记录功能。

- `@lexical/selection`: 提供选择相关的辅助功能。

- `@lexical/utils`: 提供各种实用工具函数。

- `@lexical/dragon`: 提供与 Dragon NaturallySpeaking 辅助工具的兼容性。

Dragon NaturallySpeaking 是一款语音识别软件,允许用户通过语音来控制计算机和输入文本。这个 Lexical 包可能提供了一些功能,使得 Lexical 编辑器能够更好地与 Dragon NaturallySpeaking 配合使用,提高语音输入和控制的兼容性。


- `@lexical/file`: 提供文件导入/导出功能。

- `@lexical/hashtag`: 提供 hashtag 功能。

Hashtag 通常是指以 "#" 符号开头的关键词或短语,在社交媒体和其他在线平台上广泛使用。这个包可能提供了在 Lexical 编辑器中识别、高亮显示或处理 hashtag 的功能,使得用户可以更方便地在编辑器中使用和管理 hashtag。

- `@lexical/offset`: 提供选择偏移辅助功能。

- `@lexical/plain-text`: 提供纯文本编辑功能的基础包。

- `@lexical/headless`: 允许在无 DOM 环境中使用 Lexical 的核心功能。

## 说明

这些包提供了从基础编辑到高级功能的各种模块,使开发者可以根据需求灵活组合使用。每个包都专注于特定功能,遵循模块化设计原则。

- `@lexical/rich-text`: 提供富文本编辑功能,如标题、引用等。
- `@lexical/list`: 提供列表相关功能。
- `@lexical/table`: 提供表格功能。
- `@lexical/clipboard`: 提供剪贴板相关功能。
- `@lexical/code`: 提供代码块和语法高亮功能。
- `@lexical/link`: 提供链接功能。
- `@lexical/markdown`: 提供 Markdown 导入/导出功能。
- `@lexical/utils`: 提供各种实用工具函数。
- `@lexical/devtools`: 提供开发工具,用于调试和检查 Lexical 编辑器状态。
- `@lexical/devtools-core`: 包含 devtools 的核心功能,可能被其他包或工具使用。
- `@lexical/eslint-plugin`: 提供 ESLint 插件,用于强制执行 Lexical 特定的代码规范。
- `@lexical/html`: 提供 HTML 导入/导出功能。
- `@lexical/mark`: 可能提供文本标记或高亮功能。
- `@lexical/overflow`: 可能处理文本溢出相关的功能。
- `@lexical/playground`: 提供 Lexical 的在线演示和实验环境。
- `@lexical/text`: 提供文本处理的额外功能。
- `@lexical/website`: 包含 Lexical 官方网站的源代码。
- `@lexical/yjs`: 提供与 Yjs 协作框架的集成,用于实现实时协作编辑。
- `shared`: 包含在多个包之间共享的内部代码,不作为公共 API 发布。