@ echo off 
Ipconfig|find/I "3dl_x" && rasdial myvpn /disconnect || rasdial 3dl_x
pause