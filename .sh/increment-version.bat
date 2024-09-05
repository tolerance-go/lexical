@echo off
chcp 65001 >nul

REM 设置错误处理
if errorlevel 1 exit /b %errorlevel%

REM 提示用户输入 CHANNEL
:input_channel
set /p CHANNEL="请输入 CHANNEL (next, latest, nightly, dev): " || exit /b
if "%CHANNEL%" neq "next" if "%CHANNEL%" neq "latest" if "%CHANNEL%" neq "nightly" if "%CHANNEL%" neq "dev" (
    echo 无效的 CHANNEL 输入，请重新输入。
    goto input_channel
)

REM 判断是否为预览版本
set "is_preview="
if "%CHANNEL%" == "nightly" set "is_preview=1"

REM 如果不是预览版本，提示输入 UPDATE_CHANGELOG_FROM_LATEST_RELEASE
if not defined is_preview (
    set /p UPDATE_CHANGELOG_FROM_LATEST_RELEASE="请输入 UPDATE_CHANGELOG_FROM_LATEST_RELEASE (Y/N): " || exit /b
) else (
    set "UPDATE_CHANGELOG_FROM_LATEST_RELEASE="
)

REM 提示用户输入 INCREMENT
if not defined is_preview (
    :input_increment
    set /p INCREMENT="请输入 INCREMENT (minor, patch, prerelease): " || exit /b
    if "%INCREMENT%" neq "minor" if "%INCREMENT%" neq "patch" if "%INCREMENT%" neq "prerelease" (
        echo 无效的 INCREMENT 输入，请重新输入。
        goto input_increment
    )
) else (
    set "INCREMENT="
)

REM 设置环境变量
set "CHANNEL=%CHANNEL%"
set "LATEST_RELEASE=%UPDATE_CHANGELOG_FROM_LATEST_RELEASE%"
set "INCREMENT=%INCREMENT%"

REM 执行 npm 命令
call npm run increment-version || exit /b

exit /b