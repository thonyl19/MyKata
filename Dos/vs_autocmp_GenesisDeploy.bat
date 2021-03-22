@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

set svnUserName=th_lee
set password=th_lee
set svnProductLocation=D:\Product
set svnProjectLocation=D:\Project
set ReportFolder=D:\Product\Development\GTIMES5\

--------------------SVNUpdate---------------------
set userNameAndPassword=--username %svnUserName% --password %password%
set ProductPath=svn update %svnProductLocation% %userNameAndPassword%
set ProjectPath=svn update %svnProjectLocation% %userNameAndPassword%
echo %ProductPath%
echo %ProjectPath%
 
  %ProductPath%
  %ProjectPath%
--------------------EndSVNUpdate------------------
--------------------RestoreSoluction--------------
 set ReportSolutionRestore=%ReportFolder%Genesis.sln
 
 nuget restore %ReportSolutionRestore%
 
 msbuild %ReportSolutionRestore%
 
--------------------EndRestoreSoluction-----------
--------------------PublishSoluction-------------- 
 set PublishFolder=%1
 set PublishProperty=/p:DeployOnBuild=True /p:DeployDefaultTarget=WebPublish /p:WebPublishMethod=FileSystem /p:PublishProvider=FileSystem /p:DeleteExistingFiles=True /p:publishUrl="%PublishFolder%"
 set ReportPublish=%ReportFolder%\Genesis_MVC\Genesis.csproj %PublishProperty%
 echo %ReportPublish% 
 
 msbuild %ReportPublish%
 
 set publishAppDataFolder=%PublishFolder%\App_Data\
 set sourceAppDataFolder=%ReportFolder%Genesis_MVC\App_Data\
 echo %sourceAppDataFolder%
 echo %publishAppDataFolder%
 forfiles /p %sourceAppDataFolder% /m *.xml /c "cmd /c xcopy @file %publishAppDataFolder% /y"
 
 
--------------------EndPublishSoluction-----------
 
