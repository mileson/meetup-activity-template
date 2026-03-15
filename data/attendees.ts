export type Attendee = {
  name: string;
  submitter: string;
  image: string;
};

// 开源仓库只保留演示数据，避免提交真实名单与核验素材。
export const attendees: Attendee[] = [
  {
    name: "示例用户 A",
    submitter: "demo-a",
    image: "/credentials/sample.svg",
  },
  {
    name: "示例用户 B",
    submitter: "demo-b",
    image: "/credentials/sample.svg",
  },
  {
    name: "示例用户 C",
    submitter: "demo-c",
    image: "/credentials/sample.svg",
  },
];
