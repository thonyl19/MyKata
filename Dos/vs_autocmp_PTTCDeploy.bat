@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

set GenesisReportDeployBatchFile=GenesisDeploy.bat
set PublishFolder=C:\Users\TH_Lee\Desktop\PublishGenesis
set ServerFolder=\\10.96.0.217\e$\Web\GTIMES\PTTCWIP
echo %PublishFolder%
call %GenesisReportDeployBatchFile% %PublishFolder%

echo %PublishFolder%\Views\
echo %PublishFolder%\RDLC\
echo %PublishFolder%\Report\

SET TodayYear=%date:~0,4%
SET TodayMonthP0=%date:~5,2%
SET TodayDayP0=%date:~8,2%
set combineDay=%TodayMonthP0%-%TodayDayP0%-%TodayYear%

pause