SET TodayYear=%date:~0,10%
SET TodayYear=%TodayYear:/=%
echo %TodayYear%
SET TodayMonthP0=%date:~5,2%
echo %TodayMonthP0%
SET TodayDayP0=%date:~8,2%
echo %TodayDayP0%

dir Dos /s /b /a-d >files.txt
makecab /d "CabinetName1=Dos.zip" /f files.txt
pause
del /q /f files.txt
pause