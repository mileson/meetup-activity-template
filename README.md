# AI Coding Friends Event Template

一个基于 Next.js App Router 的线下活动站模板，包含：

- 活动首页
- 参会凭证领取页
- 凭证详情页
- 现场扫码核验页

这个开源仓库已经移除了真实参会名单、二维码、导出凭证图片和原始 Excel 文件，只保留可运行的示例数据与示例凭证素材。

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Motion

## 本地启动

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 查看页面。

## 示例数据

开源版默认使用 `data/attendees.ts` 中的 mock 数据：

- `示例用户 A / demo-a`
- `示例用户 B / demo-b`
- `示例用户 C / demo-c`

你可以直接替换为自己的名单数据，字段结构如下：

```ts
type Attendee = {
  name: string;
  submitter: string;
  image: string;
};
```

其中 `image` 需要指向 `public/` 目录下的凭证图片。

## 如何替换成自己的活动

1. 修改 `data/event.ts` 中的活动标题、时间、地点和说明。
2. 修改 `data/agenda.ts` 中的活动环节与嘉宾信息。
3. 修改 `data/attendees.ts` 为你的参会名单。
4. 将你的凭证图片放入 `public/credentials/`。
5. 如需给凭证批量叠加二维码，可使用 `scripts/embed_qr_on_credentials.py`。

## 开源版移除的内容

- 真实姓名与提交人映射
- 现场核验二维码图片
- 导出的实名凭证图片
- 原始 Excel 名单与二维码源文件
- 私有项目规划文档

## License

MIT
