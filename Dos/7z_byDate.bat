SET TodayYear=%date:~0,10%
SET TodayYear=%TodayYear:/=%
echo %TodayYear%
SET TodayMonthP0=%date:~5,2%
echo %TodayMonthP0%
SET TodayDayP0=%date:~8,2%
echo %TodayDayP0%
set zip="C:\Program Files\7-Zip\7z"

%zip% a ..\Dos_%TodayYear%.7z .
pause