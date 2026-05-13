// Influence Analysis - question bank (bilingual)
// Structure is intentionally extensible (add dimensions, languages, or contexts later).

const DIMENSIONS = [
  {
    key: "capacity",
    label: { en: "Capacity", zh: "能力" },
    description: {
      en: "Ability, expertise, judgment, execution, and problem-solving.",
      zh: "能力、专业性、判断力、执行力与解决问题的能力。",
    },
  },
  {
    key: "visibility",
    label: { en: "Visibility", zh: "可见度" },
    description: {
      en: "Whether others notice and recognize your contributions and value.",
      zh: "他人是否注意到并认可你的贡献与价值。",
    },
  },
  {
    key: "trust",
    label: { en: "Trust", zh: "信任" },
    description: {
      en: "Whether others perceive you as reliable, ethical, and worth supporting.",
      zh: "他人是否认为你可靠、正直、值得支持。",
    },
  },
  {
    key: "network",
    label: { en: "Network Position", zh: "网络位置" },
    description: {
      en: "Whether you occupy important positions in information and relationship networks.",
      zh: "你在信息与关系网络中是否处于关键位置。",
    },
  },
  {
    key: "persistence",
    label: { en: "Persistence", zh: "持续性" },
    description: {
      en: "Whether you consistently contribute over time.",
      zh: "你是否能在时间维度上持续贡献。",
    },
  },
];

// 30 total questions, 6 per dimension.
// Note: phrasing is designed for broad collective systems, not clinical use.
const QUESTIONS = [
  // Capacity (6)
  {
    id: "cap_1",
    dimension: "capacity",
    text: {
      en: "People in this context seek my input when decisions require good judgment.",
      zh: "在此情境中，当决策需要良好判断时，人们会主动征求我的意见。",
    },
  },
  {
    id: "cap_2",
    dimension: "capacity",
    text: {
      en: "I can solve important problems efficiently and with high quality.",
      zh: "我能高效且高质量地解决重要问题。",
    },
  },
  {
    id: "cap_3",
    dimension: "capacity",
    text: {
      en: "My expertise is recognized as useful for the group's goals.",
      zh: "我的专业能力被认为对群体目标有价值。",
    },
  },
  {
    id: "cap_4",
    dimension: "capacity",
    text: {
      en: "I can translate ideas into clear plans and execution steps.",
      zh: "我能把想法转化为清晰的计划与可执行步骤。",
    },
  },
  {
    id: "cap_5",
    dimension: "capacity",
    text: {
      en: "When unexpected challenges occur, I stay effective and resourceful.",
      zh: "当出现突发挑战时，我仍能保持高效并灵活应对。",
    },
  },
  {
    id: "cap_6",
    dimension: "capacity",
    text: {
      en: "My contributions measurably improve outcomes for the group.",
      zh: "我的贡献能在结果上给群体带来可衡量的提升。",
    },
  },

  // Visibility (6)
  {
    id: "vis_1",
    dimension: "visibility",
    text: {
      en: "People notice my contributions without me having to repeatedly point them out.",
      zh: "即使我不反复强调，人们也能注意到我的贡献。",
    },
  },
  {
    id: "vis_2",
    dimension: "visibility",
    text: {
      en: "My work is communicated or referenced by others in the group.",
      zh: "我的工作会被他人在群体中传播或引用。",
    },
  },
  {
    id: "vis_3",
    dimension: "visibility",
    text: {
      en: "In meetings or discussions, my perspectives are given attention.",
      zh: "在会议或讨论中，我的观点会得到关注。",
    },
  },
  {
    id: "vis_4",
    dimension: "visibility",
    text: {
      en: "Others can describe what I contribute and why it matters.",
      zh: "他人能够说清楚我贡献了什么，以及为什么重要。",
    },
  },
  {
    id: "vis_5",
    dimension: "visibility",
    text: {
      en: "I have opportunities to present, share, or represent the group’s work.",
      zh: "我有机会展示、分享或代表群体的工作与成果。",
    },
  },
  {
    id: "vis_6",
    dimension: "visibility",
    text: {
      en: "My contributions are visible to key decision-makers or influential members.",
      zh: "关键决策者或有影响力成员能看见我的贡献。",
    },
  },

  // Trust (6)
  {
    id: "tru_1",
    dimension: "trust",
    text: {
      en: "People trust me to follow through on commitments.",
      zh: "人们相信我会兑现承诺并按时完成。",
    },
  },
  {
    id: "tru_2",
    dimension: "trust",
    text: {
      en: "I act in ways that are perceived as fair and ethical in this context.",
      zh: "在此情境中，我的行为被认为公平且符合伦理。",
    },
  },
  {
    id: "tru_3",
    dimension: "trust",
    text: {
      en: "People feel psychologically safe sharing concerns or honest feedback with me.",
      zh: "人们与我交流担忧或坦诚反馈时会感到安全。",
    },
  },
  {
    id: "tru_4",
    dimension: "trust",
    text: {
      en: "When I give feedback, others view it as constructive and well-intended.",
      zh: "当我提出反馈时，他人认为这是建设性的、出于善意的。",
    },
  },
  {
    id: "tru_5",
    dimension: "trust",
    text: {
      en: "I am consistent: people can generally predict how I will respond under pressure.",
      zh: "我较为一致：在人们看来，我在压力下的反应是可预期的。",
    },
  },
  {
    id: "tru_6",
    dimension: "trust",
    text: {
      en: "Others are willing to support my initiatives because they believe I will use resources responsibly.",
      zh: "他人愿意支持我的倡议，因为他们相信我会负责任地使用资源。",
    },
  },

  // Network Position (6)
  {
    id: "net_1",
    dimension: "network",
    text: {
      en: "I am connected to people across different sub-groups or roles in this context.",
      zh: "在此情境中，我与不同子群体或角色的人都有连接。",
    },
  },
  {
    id: "net_2",
    dimension: "network",
    text: {
      en: "Information often reaches me early, and I can help distribute it effectively.",
      zh: "信息往往较早传到我这里，我也能有效地传播与分发。",
    },
  },
  {
    id: "net_3",
    dimension: "network",
    text: {
      en: "I often serve as a bridge between people who might not otherwise coordinate.",
      zh: "我经常充当桥梁，连接原本不易协作的人或群体。",
    },
  },
  {
    id: "net_4",
    dimension: "network",
    text: {
      en: "When others need help, they know how to reach me and I respond.",
      zh: "当他人需要帮助时，他们知道如何联系到我，而我也会回应。",
    },
  },
  {
    id: "net_5",
    dimension: "network",
    text: {
      en: "I can mobilize support by coordinating people and resources when needed.",
      zh: "需要时，我能协调人员与资源来动员支持。",
    },
  },
  {
    id: "net_6",
    dimension: "network",
    text: {
      en: "I have strong relationships with a few influential or well-connected members.",
      zh: "我与少数关键或人脉广的成员保持较强关系。",
    },
  },

  // Persistence (6)
  {
    id: "per_1",
    dimension: "persistence",
    text: {
      en: "Over time, I contribute consistently rather than in occasional bursts.",
      zh: "长期来看，我的贡献更偏向持续稳定，而非偶尔爆发。",
    },
  },
  {
    id: "per_2",
    dimension: "persistence",
    text: {
      en: "Even when motivation is low, I maintain reliable participation.",
      zh: "即使动力较低，我也能保持可靠参与。",
    },
  },
  {
    id: "per_3",
    dimension: "persistence",
    text: {
      en: "I follow through on long-term goals, not just urgent tasks.",
      zh: "我会推进长期目标，而不仅仅处理紧急事务。",
    },
  },
  {
    id: "per_4",
    dimension: "persistence",
    text: {
      en: "I actively learn and adapt based on feedback and results.",
      zh: "我会根据反馈与结果持续学习并调整。",
    },
  },
  {
    id: "per_5",
    dimension: "persistence",
    text: {
      en: "I remain engaged and helpful during periods of change or uncertainty.",
      zh: "在变化或不确定时期，我仍会保持投入并提供帮助。",
    },
  },
  {
    id: "per_6",
    dimension: "persistence",
    text: {
      en: "People can count on me over time, not only when it is convenient.",
      zh: "人们能长期依靠我，而不仅在我方便时才行。",
    },
  },
];

const CONTEXT_OPTIONS = [
  { key: "workplace", label: { en: "Workplace", zh: "职场" } },
  { key: "school", label: { en: "School", zh: "学校" } },
  { key: "student_org", label: { en: "Student Organization", zh: "学生组织" } },
  { key: "friends", label: { en: "Friend Group", zh: "朋友圈" } },
  { key: "online_community", label: { en: "Online Community", zh: "网络社群" } },
  { key: "social_media", label: { en: "Social Media", zh: "社交媒体" } },
  { key: "livestream", label: { en: "Livestream Audience", zh: "直播社群" } },
  { key: "volunteer", label: { en: "Volunteer Organization", zh: "志愿组织" } },
  { key: "other", label: { en: "Other", zh: "其他" } },
];

