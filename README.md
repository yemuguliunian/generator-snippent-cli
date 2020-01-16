# generator-snippent-cli

> 根据片段源文件生成不同编译器的代码片段，目前只支持 sublime 和 vscode

## 使用

安装

```
yarn install @fen-ms/snippent-hub
```

scripts

```
"scripts": {
  "snippent:build": "snippent"
},
```

cmd

```
npm run snippent:build
```

## 结构

**源文件目录**

```
├── /snippent/
    ├── /vue/
        └── field.js
    └── snippent.js
```

**输出目录**

```
├── /snippent-dist/
    ├── /sublime/
        ├── /vue/
            └── field.sublime-snippet
        └── snippent.sublime-snippet
    └── /vscode/
        ├── field.code-snippets 
        └── snippent.code-snippets

```

## 实现原理

脚本默认读取执行命令目录层级下的 snippent 文件夹，通过读取该文件夹中的片段源文件来生成不同编译器的代码片段，目前只支持 sublime 和 vscode。

**片段源文件需遵循下列规则：**

snippent.js，文件名即触发代码片段的单词

```js
{
    body: // 模板字符串，存放代码片段的内容，多行代码时为了缩进格式正确，你可能需要这样写
`<fen-field
    label="$1"
/>`,
    scope: '', // 作用域，非必填，默认所有。还未实现!!!
    description: '' // 片段的描述，非必填
}
```
