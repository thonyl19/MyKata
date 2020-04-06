### VS Code IDE Output 輸出亂碼

    https://blog.csdn.net/pandoraliu/article/details/90478134
    File -> References -> Settings -> Commonly Used
    加入这句话："code-runner.runInTerminal": true


### Run C#
    https://mike2014mike.github.io/vscode/2018/09/14/vscode-csharp/
### 套件使用記錄
>    [.Net Core Test Explorer](https://marketplace.visualstudio.com/items?itemName=derivitec-ltd.vscode-dotnet-adapter&ssr=false#overview)
>>超高使用人數,但實際使用時發現,沒辦法簡單的排除問題,只好棄用.


### Log
#### 2020/3/25
經過一番折騰,總算在家中試出 單元測試的功能,最後是使用 .NET TEST EXPLORER 的功能時,才注意到問題點.
這個 extension 的最右側有個 Show Log 的功能,會把執行階段的問題掦示出來,從中查看發現到一個錯誤訊息

    [ERROR] Error while executing dotnet test -t -v=q - MSBUILD : error MSB1011: 請指定要使用哪個專案檔或方案檔，因為這個資料夾包含一個以上的專案檔或方案檔。

仔細確定了一下,發現目錄下有兩個類似的檔案
>  vs2019.sln
>  CSharp.csproj    

當試著把 vs2019.sln 移掉後,再執行 extension 的 Run All Test 後, 就發現測試項目有正常跑出來了.
總體而言,需要安裝以下套件才能正確執行
>   [CS-Script](https://marketplace.visualstudio.com/items?itemName=oleg-shilo.cs-script)
>   [.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet-test-explorer)
>>不過,在公司環境測試其他套件時,把它關掉後再重開,就不 work了, TMD...

每次久不使用,再使用便出一堆問題,感覺真的很煩.
