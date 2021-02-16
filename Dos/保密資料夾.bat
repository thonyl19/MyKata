rem 參考 https://www.freedidi.com/1194.html
@echo off
set ci=3
echo.
echo 注意： 三次輸入錯誤將退出.
echo.
:1
set /p mima=請輸入密碼：
if \"%mima%\"==\"lingdu\" goto o
set /a ci-=1
if \"%ci%\"==\"0\" cls&echo.&echo =沒密碼無法進入=&echo.&pause&echo.&exit
cls&echo.&echo 你還有 %ci% 次機會&echo.&goto 1
:o
cls&echo.
echo= 密碼正權確，放行 =
md D:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}>NUL
if exist M:\NUL goto delete
subst M: D:\RECYCLED\UDrives.{25336920-03F9-11CF-8FD0-00AA00686F13}
start M:\
goto end
:delete
subst /D M:
:end
echo.&pause&exit.