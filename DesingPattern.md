
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

[TOC]
## Simple Factory 
#### Memo
1. 將物件功能 規劃出通用,一致的 abstract class
2. 各別的物件都是 extends 自  abstract class ,再實作各自的處理程序
3. 所有的物件都是透過 Factory 產生
#### Spec. - 飲料店 訂購系統
1. 規劃 abstract class
    - 將飲料功能做抽像規劃,例如:售價,杯數,總價計算 
2. 實作 個別飲料
    - 綠茶,咖啡...
3. 實作 Factory
    - 實作新訂單功能
    - 實作訂單功能
    - 實作訂單金額計算 
#### Ref
>https://carsonwah.github.io/factory-design-pattern.html
 

