@echo off
set "NODE_HOME=D:\dev\nodejs"
set "PATH=%NODE_HOME%;%PATH%"
cd /d "%~dp0"
call "%NODE_HOME%\npm.cmd" run dev
