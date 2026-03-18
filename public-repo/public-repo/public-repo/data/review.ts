export type ReviewVideo = {
  speaker: string;
  role: string;
  title: string;
  summary: string;
  duration: string;
  status: "coming_soon" | "ready";
  href?: string;
  slidesHref?: string;
  cover?: string;
  tone: "amber" | "blue" | "olive" | "rose";
  keyPoints: string[];
  discussion?: string[];
  aiTakeaway?: string;
};

export const reviewVideos: ReviewVideo[] = [
  {
    speaker: "示例嘉宾 A",
    role: "从零搭建活动站",
    title: "活动网站的最小闭环",
    summary:
      "演示如何在较短时间内完成活动信息页、凭证领取页和基础核验页的搭建。",
    duration: "12 分钟",
    status: "ready",
    href: "https://example.com/review-a",
    slidesHref: "https://example.com/review-a-slides",
    tone: "amber",
    keyPoints: [
      "从活动目标倒推页面结构与入口设计。",
      "把页面内容、名单数据和凭证素材拆成独立配置文件。",
      "优先保证现场可用，再逐步补充视觉和内容细节。",
    ],
    discussion: [
      "什么时候应该先做模板，而不是先做个性化内容？",
      "活动网站里最值得优先固化的能力是什么？",
    ],
    aiTakeaway:
      "适合做成模板项目的第一讲，重点是结构清晰和快速落地。",
  },
  {
    speaker: "示例嘉宾 B",
    role: "活动执行与 AI 协作",
    title: "让 AI 参与活动筹备流程",
    summary:
      "围绕议程整理、信息收集和回顾产出，展示 AI 在小型活动执行中的辅助方式。",
    duration: "18 分钟",
    status: "ready",
    href: "https://example.com/review-b",
    slidesHref: "https://example.com/review-b-slides",
    tone: "blue",
    keyPoints: [
      "把执行环节拆成可复用的任务清单。",
      "让 AI 处理重复性文案和结构化整理工作。",
      "在人审环节保留最终判断，避免过度自动化。",
    ],
    discussion: [
      "哪些活动执行任务适合交给 AI，哪些必须人工把关？",
      "怎样设计模板才能跨活动复用？",
    ],
    aiTakeaway:
      "更适合放在模板 README 或示例回顾中，帮助使用者理解真实使用场景。",
  },
  {
    speaker: "示例嘉宾 C",
    role: "活动回顾内容生产",
    title: "从现场记录到回顾页面",
    summary:
      "演示如何把活动后的讲者信息、核心观点和链接资料整理成一页清晰的回顾页面。",
    duration: "15 分钟",
    status: "coming_soon",
    tone: "rose",
    keyPoints: [
      "先抽取每个分享的核心信息，再统一结构展示。",
      "将外部链接、图片素材和状态字段拆开管理。",
      "在回顾页中同时兼顾浏览效率与内容密度。",
    ],
    discussion: [
      "什么样的活动值得单独做回顾页？",
      "回顾页是内容归档，还是下一次传播入口？",
    ],
    aiTakeaway:
      "适合作为模板中的扩展示例功能，突出结构化内容管理。",
  },
];
