# Meetup Activity Template

一个基于 Next.js App Router 的小型线下活动全流程模板，适合 meetup、workshop、训练营、私享会等场景。默认提供示例数据与示例凭证素材，你可以直接替换为自己的活动内容。

## 你可以用它做什么

- 活动公告：首页展示时间、地点、议程、亮点说明
- 通行领取：按姓名或提交人查询示例凭证
- 凭证查看：查看与下载通行凭证图片
- 现场核验：用统一接口校验名单
- 活动回顾：整理讲者内容、链接与摘要

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Motion

## 给人类的新手级安装教程

1. 安装依赖

```bash
npm install
```

2. 启动本地开发环境

```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

4. 按你的活动替换下面这些文件

- `data/event.ts`：活动标题、时间、地点、亮点、注意事项
- `data/agenda.ts`：议程和嘉宾分享安排
- `data/attendees.ts`：参会者名单与凭证图片路径
- `data/review.ts`：分享回顾内容
- `public/credentials/`：凭证素材

5. 发布前执行检查

```bash
npm run lint
npm run build
```

## 常用页面

- `/`：活动首页
- `/claim`：凭证领取页
- `/ticket?name=示例用户%20A&submitter=demo-a`：凭证详情页
- `/check?name=示例用户%20A&submitter=demo-a`：扫码核验页
- `/review`：分享回顾页

## 给 Agent / OpenClaw / 小龙虾 的新手级使用方式

### 第一步：安装并跑起来

```bash
npm install
npm run dev
```

### 第二步：先让 Agent 理解项目结构

你可以先给 Agent 这段提示词：

```text
这是一个 Next.js 16 活动站模板。请先阅读 data/event.ts、data/agenda.ts、data/attendees.ts、data/review.ts，
理解首页、凭证领取、凭证详情、扫码核验和回顾页分别依赖哪些数据，再开始修改。
```

### 第三步：再给出具体改造任务

提示词 1：改造成你的活动

```text
请把这个模板改成一场 30 人以内的 AI Workshop 活动页面。
保留凭证领取、凭证详情和扫码核验功能。
先改 data/* 里的内容，再检查首页文案是否需要同步调整。
```

提示词 2：替换名单与凭证

```text
请根据我提供的参会名单更新 data/attendees.ts，
并把 public/credentials/ 里的示例凭证替换成新的图片引用。
如果发现多人共用同一个提交人，保留现有核验逻辑并提醒我是否会产生歧义。
```

提示词 3：补充回顾页

```text
请为 /review 页面补充 5 个分享回顾卡片，
每个卡片包含 speaker、role、title、summary、duration、status、keyPoints。
如果我没有给外链，就先用 example.com 占位。
```

## 目录说明

```text
app/
  page.tsx                 首页
  claim/                   凭证领取
  ticket/                  凭证详情
  check/                   现场核验
  review/                  分享回顾
  api/verify/route.ts      名单校验接口

data/
  event.ts                 活动信息
  agenda.ts                活动议程
  attendees.ts             名单与凭证映射
  review.ts                回顾页数据

public/credentials/
  sample.svg               示例凭证素材
```

## 使用时要注意

- `app/api/verify/route.ts` 默认直接读取 `data/attendees.ts`，这是模板级实现，适合 demo 或小规模活动。
- 如果你要使用真实名单、二维码核验或批量生成凭证，建议把原始数据放在私有仓库、私有存储或后端服务中，不要直接公开提交。
- 默认的 `public/credentials/sample.svg` 只是占位素材，正式活动请替换为自己的设计。
- 如果你扩展了环境变量，记得同步更新 `.env.example`。

## 部署

最简单的方式是部署到 Vercel，也可以部署到任何支持 Next.js 的 Node.js 环境。

## License

MIT
