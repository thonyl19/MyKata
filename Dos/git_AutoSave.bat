@echo off 
goto S0

:S0
git add .
goto S1

:S1
set /p mima=�w�s����,�O�_�۰� Commit,Push?No/(Y)es:
echo %mima%
if "%mima%"=="Y" goto S2
goto S0

:S2
@echo on 
git commit -m "add"
git push --progress "origin"  
@echo off
pause
goto S0




