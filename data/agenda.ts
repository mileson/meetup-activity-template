export type AgendaBlock = {
  title: string;
  time: string;
  items: string[];
};

export const dinnerParticipants = ["示例嘉宾 A", "示例嘉宾 B", "示例嘉宾 C"];

export const agendaBlocks: AgendaBlock[] = [
  {
    title: "主题分享与交流",
    time: "14:00～17:30",
    items: [
      "自我介绍",
      "主题分享",
      "分享｜示例嘉宾 A：从活动想法到上线页面的快速搭建",
      "分享｜示例嘉宾 B：如何用 AI 整理线下活动执行流程",
      "分享｜示例嘉宾 C：从内容沉淀到活动回顾页面的制作",
      "自由交流",
    ],
  },
  {
    title: "晚餐（按需选择）",
    time: "18:00～20:00",
    items: [`参与晚餐：${dinnerParticipants.join("、")}`],
  },
];
