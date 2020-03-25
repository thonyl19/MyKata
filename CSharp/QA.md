### VS Code IDE Output 輸出亂碼

    https://blog.csdn.net/pandoraliu/article/details/90478134
    File -> References -> Settings -> Commonly Used
    加入这句话："code-runner.runInTerminal": true


### Run C#
    https://mike2014mike.github.io/vscode/2018/09/14/vscode-csharp/


### Log
#### 2020/3/25
經過一番折騰,總算在家中試出 單元測試的功能,最後是使用 .NET TEST EXPLORER 的功能時,才注意到問題點.
這個 extension 的最右側有個 Show Log 的功能,會把執行階段的問題掦示出來,從中查看發現到一個錯誤訊息

    [ERROR] Error while executing dotnet test -t -v=q - MSBUILD : error MSB1011: 請指定要使用哪個專案檔或方案檔，因為這個資料夾包含一個以上的專案檔或方案檔。

仔細確定了一下,發現目錄下有兩個類似的檔案
>  vs2019.sln
>  CSharp.csproj    

當試著把 vs2019.sln 移掉後,再執行 extension 的 Run All Test 後, 就發現測試項目有正常跑出來了
每次久不使用,再使用便出一堆問題,感覺真的很煩.
