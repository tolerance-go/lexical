@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: 设置错误处理
if errorlevel 1 exit /b %errorlevel%

:: 提示用户输入发布渠道
:input_channel
set /p CHANNEL="请输入发布渠道 (next/latest/nightly/dev): " || exit /b
if "!CHANNEL!" neq "next" if "!CHANNEL!" neq "latest" if "!CHANNEL!" neq "nightly" if "!CHANNEL!" neq "dev" (
    echo 无效的发布渠道，请重新输入。
    goto input_channel
)

:: 提示用户是否为非交互模式
set /p NON_INTERACTIVE="是否为非交互模式 (y/n): " || exit /b
if /i "!NON_INTERACTIVE!"=="y" (
    set NON_INTERACTIVE_FLAG=--non-interactive
) else (
    set NON_INTERACTIVE_FLAG=
)

:: 提示用户是否为干运行模式
set /p DRY_RUN="是否为干运行模式 (y/n): " || exit /b
if /i "!DRY_RUN!"=="y" (
    set DRY_RUN_FLAG=--dry-run
) else (
    set DRY_RUN_FLAG=
)

:: 执行 release.local.js 脚本
node scripts/npm/release.local.js --channel !CHANNEL! !NON_INTERACTIVE_FLAG! !DRY_RUN_FLAG! || exit /b

exit /b