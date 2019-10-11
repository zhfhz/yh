# 分销控制台

## 第三方库

- `dva` 数据流动，[文档地址](https://dvajs.com/guide/)

- `umi-request` 网络请求，[文档地址](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)

## 项目编写

### 运行

拉取项目至本地后，通过命令 `yarn && yarn start` 运行项目

### 代码结构

- `src/components` 全局组件

- `src/models` 全局 model 所在目录

- `src/pages` 页面；它按照菜单的层级去组织代码的目录结构，每个页面的文件大致如下：

  - `_mock.js` 本地 mock 数据的文件，具体规则参见 [文档](https://umijs.org/zh/guide/mock-data.html)

  - `index.js` 当前页面的入口文件，如果页面很复杂，请酌情拆分文件，放在同一个文件夹下

  - `model.js` 当前页面的 model，存储 `state`、`reducer`、`effects`

  - `service.js` 数据获取文件，一般用于当前页面接口调用，由 `model` 中 `effects` 里的方法调用

  - `style.less` 样式文件

- `src/pages/document.ejs` `index.html` 的自定义模块文件

- `src/services` 全局 service

- `src/utils` 工具类

### 编写代码注意事项

- 请在编辑器中调整好 eslint 工具的提示问题，确保能实时观察到 eslint 错误与警告

- 请设置好编辑器对 `.editorconfig` 的支持

- 推荐将编辑工具的显示字体调整为等宽字体，以方便对齐代码

- 请勿私自添加 `dependencies`，如有需要，提出问题讨论后决定

### 公共组件

- Breadcrumb

  ```jsx
  <Breadcrumb title="商品信息" />
  ```

![预览图](./screenshots/breadcrumb-preview.png)

- ImageView

  ```jsx
  <ImageView images={[]} onChange={images => dealWith(images)} total={4} />

  // 需要注意的是，images 在传入之前需要更改形式，参数形式如下：
  [
    {
      id: 'uuid', // 唯一标识,
      local: '', // 本地 URL，一般不用管
      server: '', // 图片 url，这是上传 oss 后获得的地址
      status: 'done|none|uploading', // 图片状态，一般也不用管
    },
  ]

  // 所以，如果拿到一个  [ 'https://path/to/imags.jpg' ] 数组，需要进行如下转换：
  images = images.map(it => ({ id: uuid(), server: it }));
  // 如果提交服务器，需要进行如下转换
  images = images.filter(it => it.server).map(it => it.server);
  ```

- FormItem

  ```jsx
  <FormItem
    label="标题"
    require     // 是否标记 *
    value       // 默认使用输入框，这是它的受控属性
  />

  <FormItem label="Other label">
    <Select><Option>Option</Option></Select>   <!-- 也可以自定义输入框的形式 -->
  </FormItem>
  ```
