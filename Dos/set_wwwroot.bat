set cur_path=D:\A\Code\github\NetCore_MVC\Base_2.2\Base_2.2
set path=%cur_path%\..\..\wwwroot\wwwroot
echo %path%
mklink /d  %cur_path%\wwwroot %path%
pause