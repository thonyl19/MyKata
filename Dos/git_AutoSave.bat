@echo off 
goto S0

:S0
git add .
goto S1

:S1
set /p mima=緩存完畢,是否自動 Commit,Push?No/(Y)es:
echo %mima%
if "%mima%"=="Y" goto S2
goto S0

:S2
@echo on 
git commit -m "add"
git push --progress "origin" MyKata_Drawio
@echo off
goto S0




