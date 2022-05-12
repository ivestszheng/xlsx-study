## 前言

最近做了前端导入、导出 Excel 的需求，用到了`js-xlsx`这个库，该库文档提供的用例很少，并不是很友好。本文总结一下我是如何实现需求的。

## 需求

- 提供一个 Excel 文件，将里面的内容转成 JSON 导入数据
- 提供一个 JSON 文件，生成 Excel 文件并导出

> 导入与导出既可以前端做，也可以后端做。本文主要探讨前端通过`SheetJS/js-xlsx`这个库实现 Excel 导入、导出功能。

## 基础知识

新建一个 Excel 文档，这个文档就是`workbook`，而一个`workbook` 下可以有多个`sheet`。

## 技术选型

市面上的报表类产品大抵可以分为以下两种：

1. 云文档类型产品
2. 控件类型产品

像 SheetJS/js-xlsx、LuckySheet、Handsontable、SpreadJS 都是标准的纯前端表格控件且都支持 Excel 的功能特性和 JSON 数据绑定。

最后选择 SheetJS/js-xlsx 这个库主要因为以下两个原因：

1. 社区版开源免费。也可选择性能增强的专业版，专业版提供样式和专业支持的附加功能。
2. 有 30k star，维护频率高，笔者在写这篇文章时（5 月 10 日）该项目的上一次提交在 5 月 9 日。

## SheetJS/js-xlsx

### 安装

```
$ yarn add xlsx@0.16.9
```

建议跟上版本号，我第一次装的时候没跟上版本号没有安装成功。

### 常用的数据表格式(Common Spreadsheet Format)

`js-xlsx`符合常用的数据表格式(CSF)。

#### 一般结构

单元格地址对象的存储格式为`{c:C, r:R}`，其中`C`和`R`分别代表的是 0 索引列和行号。例如单元格地址`B5`用对象`{c:1, r:4}`表示。

单元格范围对象存储格式为`{s:S, e:E}`，其中`S`是第一个单元格，`E`是最后一个单元格。范围是包含关系。例如范围 `A3:B7`用对象`{s:{c:0, r:2}, e:{c:1, r:6}}`表示。

#### 单元格对象

单元格对象是纯粹的 JS 对象，它的 keys 和 values 遵循下列的约定：

| Key | Description                                                            |
| --- | ---------------------------------------------------------------------- |
| `v` | 原始值(查看数据类型部分获取更多的信息)                                 |
| `w` | 格式化文本(如果可以使用)                                               |
| `t` | 内行: `b` Boolean, `e` Error, `n` Number, `d` Date, `s` Text, `z` Stub |
| `f` | 单元格公式编码为 A1 样式的字符串(如果可以使用)                         |
| `F` | 如果公式是数组公式，则包围数组的范围(如果可以使用)                     |
| `r` | 富文本编码 (如果可以使用)                                              |
| `h` | 富文本渲染成 HTML (如果可以使用)                                       |
| `c` | 与单元格关联的注释                                                     |
| `z` | 与单元格关联的数字格式字符串(如果有必要)                               |
| `l` | 单元格的超链接对象 (`.Target` 长联接, `.Tooltip` 是提示消息)           |
| `s` | 单元格的样式/主题 (如果可以使用)                                       |

如果`w`文本可以使用，内置的导出工具(比如 CSV 导出方法)就会使用它。要想改变单元格的值，在打算导出之前确保删除`cell.w`(或者设置 `cell.w`为`undefined`)。工具函数会根据数字格式(`cell.z`)和原始值(如果可用)重新生成`w`文本。

真实的数组公式存储在数组范围中第一个单元个的`f`字段内。此范围内的其他单元格会省略`f`字段。

> 更多详细信息请查看[文档](https://github.com/SheetJS/sheetjs/blob/master/README.md)

## 前端导入 Excel 数据

```js
/**
 * 将 file 转为一个 CSF 的 JSON
 * @param {File} file
 * @returns sheet
 */
const analyseExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onloadend = (progressEvent) => {
        const arrayBuffer = reader.result;

        const options = { type: 'array' };
        const workbook = XLSX.read(arrayBuffer, options);

        const sheetName = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetName];

        resolve(sheet);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('入参不是 File 类型'));
    }
  });
};
```

这里先用`FileReader`将`file`转换成`ArrayBuffer`，再用`xlsx.read()`转换成`workbook`。由于`FileReader`是异步读取，所以这里用`promise`处理了一下。

最终可以看到 Excel 处理后生成了这样的一个 Json，图片如下：

![Excel Demo](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220512093952.png)
![ExcelToJson](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220512094351.png)

注意`workbook`可能会有多个`sheet`，我们在 Demo 中加入一个 Sheet2，如下图所示：

![增加 Sheet2](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220512095510.png)

打断点看到，在方法中转换后的`workbook`如下所示：

![两个Sheet的Workbook](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220512095819.png)

所以需要对`analyseExcelToJson`这个方法做一些修改，修改后如下：

```js
/**
 * 将 file 转为一个 CSF 的 JSON
 * @param {File} file
 * @returns sheets
 */
const analyseExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();

      reader.onloadend = (progressEvent) => {
        const arrayBuffer = reader.result;

        const options = { type: 'array' };
        const workbook = XLSX.read(arrayBuffer, options);

        const sheetNames = workbook.SheetNames;
        const result = sheetNames.map((sheetName) => workbook.Sheets[sheetName]);
        resolve(result);
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('入参不是 File 类型'));
    }
  });
};
```

读取数据按钮方法如下：

```js
    async analyseUpload() {
      if (!this.fileList.length) return;
      console.log('读取数据');
      this.$refs.container.innerHTML = '';
      const promises = this.fileList.map(({ file }) => analyseExcelToJson(file));
      const result = await Promise.all(promises);
      this.result = result;
      console.log(result);
      result.forEach((workbook) => {
        workbook.forEach((sheet) => {
          this.$refs.container.innerHTML += generateExcelBySheet(sheet);
        });
      });
    }
```

最终拿到的是多个`sheet`的集合，如下图所示：

![多个 Sheet](https://raw.githubusercontent.com/ivestszheng/images-store/master/img/20220512132129.png)

由于我用了`Promise.all`用来处理读取多个 Excel,所以外面又用数组包了一层。至此，简单的前端导入 Excel 数据已经全部实现了。

> 顺带一提，如果想要在页面中展示`sheet`，可以使用`XLSX.utils.sheet_to_html`。

## 前端导出 Excel 文件

导出一般分为两种：

1. 数据导出 Excel
2. 页面表格导出 Excel

### 数据导出 Excel

前端在写前端导入 Excel 数据方法，最后返回的其实是`workbook`中`sheet`的集合。那么导出 Excel 文件便是将`sheet`拼成一个`workbook`导出即可。另外，导出的难点在于写成 Excel 之后要立马下载，而`XLSX.writeFile`直接帮我们实现这一步了。

### 页面表格导出 Excel

## Demo

以上代码全部放在**[GitHub: ivestszheng/xlsx-study](https://github.com/ivestszheng/xlsx-study)**中。

## 参考

1. [掘金：数据可视化探索之 SpreadJS](https://juejin.cn/post/6955998176549535758)
2. [掘金：十分钟上手 xlsx，4 种方法实现 Excel 导入导出](https://juejin.cn/post/6998000575203770376#heading-6)
3. [GitHub：Sheetjs/sheetjs](https://github.com/SheetJS/sheetjs)
