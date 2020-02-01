### 匯出 extensions 
#### Ref
    [https://stackoverflow.com/questions/35773299/how-can-you-export-vs-code-extension-list]
#### Cmd
    # Powrer shell
    code --list-extensions | % { "code --install-extension $_" } >  vscode_extension.bat