:: 批量处理命令
ECHO OFF
SET /P project=Enter Project Name to Start:
IF "%project%" NEQ "" (
	start cmd /k webpack-dev-server --env.project=%project%
) ELSE (
	echo "NO Project"
)
