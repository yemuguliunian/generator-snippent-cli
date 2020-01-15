# snippent

> 根据片段源文件生成不同编译器的代码片段，目前只支持 sublime 和 vscode

## 片段源文件

snippent.js

```js
{
    prefix: '', // 输入什么单词触发代码片段
    scope: '', // 作用域
    body: [ // 一个数组，存放代码片段的内容，每一行一个字符串；
        "console.log('$1');",
    ],
    description: '' // 片段的描述
}
```
