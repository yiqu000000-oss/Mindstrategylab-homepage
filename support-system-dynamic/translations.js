/* Support System Dynamics — bilingual UI & report strings */

const SSD_I18N = {
  en: {
    appDocumentTitle: "Support System Dynamics Assessment — MindStrategyLab",
    brandTitle: "MindStrategyLab",
    brandSubtitle: "Modular Research Assessment",
    skipToContent: "Skip to content",
    langSwitchAria: "Language",
    langEnLabel: "English",
    langZhLabel: "中文",
    homeLink: "Home",
    clearResultsRetake: "Clear Results and Retake",
    clearResultsRetakeConfirm:
      "This will clear your saved SSD results on this browser and restart the assessment. Continue?",
    saveHint: "Progress saved",
    premiumUnlockedBadge: "Premium Unlocked",

    homeEyebrow: "Existential Continuity & Support Accessibility Mapping",
    homeTitle: "Support System Dynamics Assessment",
    homeLead:
      "A structural exploration of how individuals maintain continuity, stability, and recoverability across changing life conditions.",
    exploresTitle: "This assessment explores",
    exploresItems: [
      "support structures",
      "existential continuity",
      "support accessibility",
      "recovery capacity",
      "long-term stability patterns",
    ],
    designedTitle: "It is designed for",
    designedItems: ["self-reflection", "anonymous structural research", "support system mapping"],
    noticeImportant:
      "Important: This is NOT a diagnostic or clinical tool. Results are interpretive structural mappings, not medical or psychological assessments.",
    timeTitle: "Estimated time",
    timeValue: "25–35 minutes",
    noteTitle: "Not a diagnosis",
    noteValue: "Exploratory & structural",
    frameworkPreviewTitle: "Framework Overview",
    startAssessment: "Start Assessment",
    learnFramework: "Learn About the Framework",

    introTitle: "Introduction",
    introSubtitle:
      "Before you begin, this page explains what the Support System Dynamics model studies and how to approach the assessment.",
    introWhatTitle: "What This Model Studies",
    introWhatBody:
      "This assessment maps how support exists in your life, how it is experienced, whether it can be accessed when needed, and how effectively it supports continuity across stress and change. It treats support as a structural system — not a personality trait or clinical category.",
    introSupportTitle: "Support Systems",
    introSupportBody:
      "Support systems include relationships, material conditions, identity anchors, belief frameworks, institutional structures, and internal capacities. The model examines whether these function as stable resources — and whether they can be perceived, reached, and used under pressure.",
    introContinuityTitle: "Continuity",
    introContinuityBody:
      "Continuity refers to the capacity to maintain functional stability, identity coherence, and recoverability across disruptions. The assessment explores where continuity is structurally supported and where it may weaken under sustained stress.",
    introAccessibilityTitle: "Accessibility",
    introAccessibilityBody:
      "Accessibility is the bridge between need and use — whether support can be identified, requested, accepted, and converted into recovery. Resources may exist without being accessible; this layer examines that operational gap.",
    introResearchTitle: "Reflective & Research Purpose",
    introResearchBody:
      "This platform is designed for structural self-reflection and anonymous research aggregation. Your responses contribute to understanding support dynamics at a population-structural level when voluntarily shared through feedback.",
    introNotDiagnosticTitle: "Not a Diagnostic Tool",
    introNotDiagnosticBody:
      "This is not a clinical assessment, personality test, or HR evaluation. Results are interpretive structural mappings — descriptive tendencies, not diagnoses, predictions, or labels.",
    introContinue: "Continue to Consent",

    frameworkTitle: "The Support System Dynamics Framework",
    frameworkSubtitle:
      "A four-layer model for mapping how support exists, is perceived, becomes accessible, and produces continuity outcomes.",
    frameworkDisclaimer:
      "This framework is designed for structural self-reflection and anonymous research. It does not classify individuals into types or provide clinical labels.",
    beginAssessment: "Begin Assessment",
    back: "Back",
    continueBtn: "Continue",

    consentTitle: "Informed Consent",
    consentSubtitle: "Please read before continuing.",
    consentItems: [
      "Participation is entirely voluntary.",
      "Responses may be anonymously aggregated for structural research on support system dynamics.",
      "You may skip any optional sensitive questions without affecting core assessment.",
      "No diagnosis, clinical label, or health determination will be provided.",
      "Results are interpretive structural mappings — not deterministic predictions.",
      "You may exit the assessment at any time without consequence.",
      "No personally identifying information is required to participate.",
      "All progress and responses are stored locally in your browser only — not transmitted to a server.",
    ],
    consentHighlight:
      "Optional sensitive fields may be skipped. Neurodiversity and demographic information, if provided, are used solely for anonymous structural research and interpretive calibration.",
    consentCheckbox: "I understand and consent",

    contextTitle: "Participant Contexts",
    contextSubtitle:
      "Provide context for structural calibration. Required fields are marked. Sensitive fields are optional.",
    requiredLegend: "Required",
    optionalLegend: "Optional sensitive fields",
    optionalHint: "These may be skipped. If provided, used solely for anonymous structural research.",
    ethnicityNote:
      "Ethnicity / cultural background is collected as a structural context variable for anonymous model calibration and group-level research comparison. It is not used to identify individuals.",
    labelAge: "Age range",
    labelEthnicity: "Ethnicity / cultural background",
    labelLifeStructure: "Current life structure",
    labelSocialIdentity: "Current social identity",
    labelStressSources: "Current primary stress sources",
    labelSupportSources: "Current primary support sources",
    labelGender: "Subjective gender",
    labelOrientation: "Sexual orientation",
    labelNeurodiversity: "Neurodiversity",
    placeholderSelect: "Select…",
    placeholderEthnicity: "e.g. East Asian, Mixed heritage, Latino",
    placeholderOptional: "Optional",
    skipOptionalFields: "Skip optional fields",
    continueToDashboard: "Continue to Dashboard",

    dashboardTitle: "Layer Module Dashboard",
    dashboardSubtitle: "Complete each layer module at your own pace. Progress saves automatically.",
    layersCompleted: "Layers completed",
    metaBannerReady: "All layer modules complete. Your structural profile is ready.",
    metaBannerProgress: (done, total) => `${done} of ${total} layer modules completed.`,
    startLayer: "Start Layer",
    continueLayer: "Continue Layer",
    completeLayer: "Complete Layer",
    statusNotStarted: "Not started",
    statusInProgress: "In progress",
    statusCompleted: "Completed",
    estimatedTime: (n) => `~${Math.max(5, Math.ceil(n * 0.32))} min`,

    layerPrefix: (n, label) => `Layer ${n} — ${label}`,
    likertLeft: "Strongly disagree",
    likertMid: "Neutral or uncertain",
    likertRight: "Strongly agree",
    questionsCount: (n) => `${n} questions`,
    assessmentBreadcrumb: "Support System Dynamics Assessment",
    dashboardOverview: "Dashboard / Overview",
    layerProgress: (done, total) => `${done} / ${total} completed`,
    progressLabel: "Progress",
    answeredCount: (n) => `${n} answered`,
    progressOf: (cur, total) => `${cur} / ${total}`,
    saveAndExit: "Save & Exit",
    previous: "Previous",
    next: "Next",
    viewResults: "View Results",
    selectResponse: "Please select a response before continuing.",
    answerAll: "Please answer all questions before viewing results.",

    resultsTitle: "Free Results Summary",
    resultsSubtitle: "A brief structural overview — not a detailed interpretation.",
    freeOverviewTitle: "Support Structure Overview",
    continueToPaywall: "Unlock Full Report",
    unlockToDeepen: "Unlock to Deepen Report",
    premiumDeepensTitle: "Deeper Interpretation",
    premiumDeepensSubtitle: "Advanced sections revealed below your summary.",
    layerProfileTitle: "Layer Profile",
    subvarMapTitle: "Sub-variable Map",
    radarAria: "Layer radar chart",
    anchorsTitle: "Strongest Support Anchors",
    weaknessesTitle: "Weakest Continuity Points",
    bottlenecksTitle: "Accessibility Bottlenecks",
    vulnerabilitiesTitle: "Reorganization Vulnerabilities",

    paywallTitle: "Premium Structural Report",
    paywallSubtitle: "Unlock the full interpretive analysis, or continue to provide research feedback.",
    skipPremium: "Continue without premium",
    paywallNote: "Payment is processed securely via Stripe. Invite codes unlock access locally.",

    premiumCtaTitle: "Premium Structural Report",
    premiumCtaSubtitle: "Unlock deeper interpretation, interaction analysis, and recovery pathways.",
    premiumFreeTitle: "Free",
    premiumFreeItems: [
      "Basic structural overview",
      "Layer profile visualization",
      "Pattern identification",
      "Anchor & vulnerability highlights",
    ],
    premiumPaidTitle: (price) => `Premium — ${price} USD`,
    premiumPaidItems: [
      "Dynamic continuity archetypes",
      "Recovery & support conversion styles",
      "Compensation mechanism analysis",
      "Continuity vulnerability mapping",
      "Cross-layer structural interpretation",
      "Environmental structural fit",
    ],
    unlockPremium: "Unlock Premium Report",
    haveInviteCode: "Have an invite code?",
    viewPremiumReport: "View Premium Report",

    accuracyTitle: "Accuracy Evaluation",
    accuracySubtitle: "Your rating helps calibrate the model for structural research.",
    accuracyScaleLow: "Not at all accurate",
    accuracyScaleHigh: "Completely accurate",
    accuracyRequired: "Please select an accuracy rating before continuing.",

    feedbackPageTitle: "Open Feedback",
    feedbackPageSubtitle: "Share what felt accurate, inaccurate, or structurally meaningful.",
    feedbackTitle: "Your Reflections",
    accuracyQuestion: "How accurately did this assessment reflect your experience?",
    feedbackPrompt:
      "What parts felt accurate, inaccurate, emotionally impactful, or structurally insightful?",
    feedbackPlaceholder: "Share your reflections…",
    researchNote:
      "This anonymous feedback may contribute to future refinement of the model and support system research.",
    submitFeedback: "Submit & Finish",
    feedbackThanks: "Thank you — your feedback has been saved locally.",

    completionTitle: "Thank You for Participating",
    completionSubtitle: "Your contribution supports anonymous structural research.",
    completionBody:
      "Your assessment responses and feedback have been saved locally. If you chose to share reflections, they may inform future model refinement and support system research — always in aggregate, never as identifiable data.",
    completionResearchNote: "This study relies on voluntary, anonymous participation. We appreciate your time and reflection.",
    completionHome: "Return to Homepage",
    resetAll: "Reset All Progress",
    resetConfirm: "Reset all progress? This cannot be undone.",
    returnHome: "Return Home",

    premiumReportTitle: "Detailed Premium Report",
    premiumReportSubtitle: "A personalized continuity reading written directly to you.",
    backToResults: "Back to Summary",
    continueAfterPremium: "Continue",
    downloadReport: "Download Report (JSON)",
    deepInterpretation: "Deep Structural Interpretation",
    interactionAnalysis: "System Tension Analysis",
    recoveryStructureAnalysis: "Recovery Structure Analysis",
    environmentalMismatch: "Environmental Structural Fit",
    structuralInterpretation: "Structural Interpretation",
    patternDynamics: "Pattern Dynamics",
    continuityDynamics: "Continuity Dynamics",
    systemTensionAnalysis: "System Tension Analysis",
    supportConversionPatterns: "Support Conversion Patterns",
    continuityRiskInterpretation: "Continuity Risk Interpretation",
    subvarDetail: "Sub-variable Detail",

    typologyArchetype: "Your Continuity Pattern",
    typologyRecoveryStyle: "Recovery Style",
    typologyConversionStyle: "Support Conversion Style",
    crossInsight: "How the Pieces Connect",
    conversionWatchFor: "This may also increase:",
    riskWhen: "Especially when:",
    compensatoryPatterns: "How You May Compensate",
    continuityRisks: "Continuity Risks",

    promoTitle: "Enter Invite Code",
    promoSubtitle: "Enter your access code to unlock the premium report.",
    promoPlaceholder: "Invite code",
    promoInvalid: "Invalid code. Please try again.",
    promoUnlock: "Unlock",
    cancel: "Cancel",

    footerText:
      "MindStrategyLab · Support System Dynamics Assessment · Research-oriented structural mapping",

    validationAge: "Please select an age range.",
    validationEthnicity: "Please enter your ethnicity / cultural background.",
    validationLifeStructure: "Please select your current life structure.",
    validationSocialIdentity: "Please select your current social identity.",
    validationStress: "Please select at least one stress source.",
    validationSupport: "Please select at least one support source.",

    likert: [
      "Strongly Disagree",
      "Disagree",
      "Somewhat Disagree",
      "Neutral",
      "Somewhat Agree",
      "Agree",
      "Strongly Agree",
    ],

    disclaimer:
      "These results describe current structural tendencies based on self-report. They are interpretive, not deterministic, and do not constitute diagnosis, prognosis, or clinical assessment.",

    tierRobust: "structurally robust",
    tierModerate: "moderately stable",
    tierVariable: "variable under stress",
    tierConstrained: "potentially constrained",
    tierFragile: "currently fragile",

    layerNarrative: (id, tier) =>
      ({
        1: `Layer 1 (Resource Existence) appears ${tier} in your current profile. This reflects foundational conditions — relationships, identity, material security, health, and belief systems — that exist as structural resources in your life context.`,
        2: `Layer 2 (Perceived Support Structures) appears ${tier}. This layer reflects whether support is psychologically felt as available and emotionally present, independent of whether resources objectively exist.`,
        3: `Layer 3 (Support Accessibility) appears ${tier}. This indicates how readily support can be identified, requested, accepted, and converted into recovery — the operational bridge between need and use.`,
        4: `Layer 4 (Structural Recovery Capacity) appears ${tier}. This reflects whether, after structural instability or collapse, you can reorganize continuity, rebuild direction, and recover long-term functioning.`,
      })[id] || "",

    anchorNarrative: (names) =>
      `Your strongest support anchors appear in: ${names}. These areas may serve as stabilizing reference points when other structural elements weaken under prolonged stress.`,
    weaknessNarrative: (names) =>
      `Areas where continuity may weaken under prolonged stress include: ${names}. These represent current structural tendencies rather than fixed deficits — contextual shifts may alter their significance over time.`,
    bottleneckNarrative: (names) =>
      `Possible support bottlenecks appear in accessibility dimensions: ${names}. When resources exist but cannot be accessed or utilized, continuity strain often concentrates at this layer.`,
    vulnerabilityNarrative: (names) =>
      `Reorganization vulnerabilities may cluster around: ${names}. These suggest areas where post-disruption recovery capacity could benefit from structural attention, though outcomes remain context-dependent.`,

    premiumDeepIntro:
      "This reading maps how what you have, what you feel, what you can use, and how you recover fit together — written in plain language, localized to your specific strengths and gaps.",
  },

  zh: {
    appDocumentTitle: "支持系统动力学评估 — MindStrategyLab",
    brandTitle: "MindStrategyLab",
    brandSubtitle: "模块化研究评估",
    skipToContent: "跳至主要内容",
    langSwitchAria: "语言",
    langEnLabel: "English",
    langZhLabel: "中文",
    homeLink: "Home",
    clearResultsRetake: "清空结果并重做",
    clearResultsRetakeConfirm: "这会清除当前浏览器中保存的 SSD 结果，并重新开始测评。是否继续？",
    saveHint: "进度已保存",
    premiumUnlockedBadge: "高级版已解锁",

    homeEyebrow: "存在连续性与支持可及性映射",
    homeTitle: "支持系统动力学评估",
    homeLead:
      "一项关于个体如何在变化的生活条件下维持连续性、稳定性与可恢复性的结构性探索。",
    exploresTitle: "本评估探索",
    exploresItems: ["支持结构", "存在连续性", "支持可及性", "恢复能力", "长期稳定模式"],
    designedTitle: "适用于",
    designedItems: ["自我反思", "匿名结构研究", "支持系统映射"],
    noticeImportant:
      "重要提示：本工具并非诊断或临床工具。结果仅为解释性结构映射，不构成医学或心理评估。",
    timeTitle: "预计用时",
    timeValue: "25–35 分钟",
    noteTitle: "非诊断工具",
    noteValue: "探索性与结构性",
    frameworkPreviewTitle: "框架概览",
    startAssessment: "开始评估",
    learnFramework: "了解框架",

    introTitle: "介绍",
    introSubtitle: "在开始之前，请了解支持系统动力学模型的研究内容与评估方式。",
    introWhatTitle: "模型研究什么",
    introWhatBody:
      "本评估映射支持在您生活中的存在方式、体验方式、需要时是否可及，以及在压力与变化中如何维持连续性。它将支持视为结构性系统——而非人格特质或临床类别。",
    introSupportTitle: "支持系统",
    introSupportBody:
      "支持系统包括关系、物质条件、身份锚点、信念框架、制度结构与内在能力。模型考察这些是否作为稳定资源运作——以及在压力下能否被感知、触及与使用。",
    introContinuityTitle: "连续性",
    introContinuityBody:
      "连续性指在中断中维持功能稳定、身份连贯与可恢复性的能力。评估探索连续性在何处获得结构支持，以及在持续压力下何处可能减弱。",
    introAccessibilityTitle: "可及性",
    introAccessibilityBody:
      "可及性是需求与使用之间的桥梁——支持能否被识别、请求、接受并转化为恢复。资源可能存在但不可及；本层考察这一操作缺口。",
    introResearchTitle: "反思与研究目的",
    introResearchBody:
      "本平台用于结构性自我反思与匿名研究汇总。您的回答有助于在群体结构层面理解支持动力学（通过自愿反馈分享时）。",
    introNotDiagnosticTitle: "非诊断工具",
    introNotDiagnosticBody:
      "这不是临床评估、人格测试或人力资源测评。结果为解释性结构映射——描述性倾向，而非诊断、预测或标签。",
    introContinue: "继续至知情同意",

    frameworkTitle: "支持系统动力学框架",
    frameworkSubtitle:
      "四层模型：映射支持如何存在、被感知、变得可及，并产生连续性结果。",
    frameworkDisclaimer:
      "本框架用于结构性自我反思与匿名研究，不对个体进行类型分类，也不提供临床标签。",
    beginAssessment: "开始评估",
    back: "返回",
    continueBtn: "继续",

    consentTitle: "知情同意",
    consentSubtitle: "请在继续之前阅读以下内容。",
    consentItems: [
      "参与完全出于自愿。",
      "回答可能以匿名方式汇总，用于支持系统动力学的结构研究。",
      "您可跳过任何可选敏感问题，不影响核心评估。",
      "不会提供诊断、临床标签或健康判定。",
      "结果为解释性结构映射，而非确定性预测。",
      "您可随时退出评估，无需承担任何后果。",
      "参与无需提供个人身份信息。",
      "所有进度与回答仅保存在您的浏览器本地——不会传输至服务器。",
    ],
    consentHighlight:
      "可选敏感字段可以跳过。神经多样性与人口统计信息（如提供）仅用于匿名结构研究与解释性校准。",
    consentCheckbox: "我理解并同意",

    contextTitle: "参与者背景",
    contextSubtitle: "提供结构校准所需的背景信息。必填项已标注，敏感字段为可选。",
    requiredLegend: "必填",
    optionalLegend: "可选敏感字段",
    optionalHint: "可以跳过。如提供，仅用于匿名结构研究。",
    ethnicityNote:
      "族裔/文化背景作为结构性背景变量收集，用于匿名模型校准与群体层面研究比较，不用于识别个人身份。",
    labelAge: "年龄区间",
    labelEthnicity: "族裔 / 文化背景",
    labelLifeStructure: "当前生活结构",
    labelSocialIdentity: "当前社会身份",
    labelStressSources: "当前主要压力来源",
    labelSupportSources: "当前主要支持来源",
    labelGender: "主观性别",
    labelOrientation: "性取向",
    labelNeurodiversity: "神经多样性",
    placeholderSelect: "请选择…",
    placeholderEthnicity: "例如：东亚、混合背景、拉丁裔",
    placeholderOptional: "可选",
    skipOptionalFields: "跳过可选字段",
    continueToDashboard: "继续进入仪表盘",

    dashboardTitle: "层级模块仪表盘",
    dashboardSubtitle: "按自己的节奏完成各层模块。进度自动保存。",
    layersCompleted: "已完成层级",
    metaBannerReady: "全部层级模块已完成。您的结构画像已就绪。",
    metaBannerProgress: (done, total) => `已完成 ${done} / ${total} 个层级模块。`,
    startLayer: "开始本层",
    continueLayer: "继续本层",
    completeLayer: "完成本层",
    statusNotStarted: "未开始",
    statusInProgress: "进行中",
    statusCompleted: "已完成",
    estimatedTime: (n) => `约 ${Math.max(5, Math.ceil(n * 0.32))} 分钟`,

    layerPrefix: (n, label) => `第 ${n} 层 — ${label}`,
    likertLeft: "非常不同意",
    likertMid: "中立或不确定",
    likertRight: "非常同意",
    questionsCount: (n) => `${n} 题`,
    assessmentBreadcrumb: "支持系统动力学评估",
    dashboardOverview: "概览",
    layerProgress: (done, total) => `${done} / ${total} 已完成`,
    progressLabel: "进度",
    answeredCount: (n) => `已答 ${n} 题`,
    progressOf: (cur, total) => `${cur} / ${total}`,
    saveAndExit: "保存并退出",
    previous: "上一题",
    next: "下一题",
    viewResults: "查看结果",
    selectResponse: "请先选择一项回答再继续。",
    answerAll: "请回答所有题目后再查看结果。",

    resultsTitle: "免费结果摘要",
    resultsSubtitle: "简要结构概览——非详细解读。",
    freeOverviewTitle: "支持结构概览",
    continueToPaywall: "解锁完整报告",
    unlockToDeepen: "解锁以展开深度解读",
    premiumDeepensTitle: "深度解读",
    premiumDeepensSubtitle: "以下内容在你的摘要下方展开。",
    layerProfileTitle: "层级画像",
    subvarMapTitle: "子变量分布",
    radarAria: "层级雷达图",
    anchorsTitle: "最强支持锚点",
    weaknessesTitle: "最弱连续性节点",
    bottlenecksTitle: "可及性瓶颈",
    vulnerabilitiesTitle: "重组脆弱点",

    paywallTitle: "高级结构报告",
    paywallSubtitle: "解锁完整解释性分析，或继续提供研究反馈。",
    skipPremium: "不购买，继续",
    paywallNote: "付款通过 Stripe 安全处理。邀请码可在本地解锁访问。",

    premiumCtaTitle: "高级结构报告",
    premiumCtaSubtitle: "解锁更深层的解释、交互分析与恢复路径。",
    premiumFreeTitle: "免费版",
    premiumFreeItems: ["基础结构概览", "层级画像可视化", "模式识别", "锚点与脆弱点摘要"],
    premiumPaidTitle: (price) => `高级版 — ${price} 美元`,
    premiumPaidItems: [
      "动态连续性原型",
      "恢复与支持转化风格",
      "补偿机制分析",
      "连续性脆弱性映射",
      "跨层结构解读",
      "环境结构适配",
    ],
    unlockPremium: "解锁高级报告",
    haveInviteCode: "有邀请码？",
    viewPremiumReport: "查看高级报告",

    accuracyTitle: "准确性评估",
    accuracySubtitle: "您的评分有助于校准结构研究模型。",
    accuracyScaleLow: "完全不准",
    accuracyScaleHigh: "完全准确",
    accuracyRequired: "请先选择准确性评分再继续。",

    feedbackPageTitle: "开放反馈",
    feedbackPageSubtitle: "分享哪些部分感觉准确、不准确或具有结构意义。",
    feedbackTitle: "您的反思",
    accuracyQuestion: "本评估在多大程度上反映了您的体验？",
    feedbackPrompt: "哪些部分感觉准确、不准确、有情感冲击或具有结构洞察？",
    feedbackPlaceholder: "分享您的反思…",
    researchNote: "此匿名反馈可能用于未来模型优化与支持系统研究。",
    submitFeedback: "提交并完成",
    feedbackThanks: "谢谢 — 您的反馈已在本地保存。",

    completionTitle: "感谢您的参与",
    completionSubtitle: "您的贡献支持匿名结构研究。",
    completionBody:
      "您的评估回答与反馈已保存在本地。如您选择分享反思，它们可能以汇总形式（永不可识别）用于未来模型优化与支持系统研究。",
    completionResearchNote: "本研究依赖自愿、匿名参与。感谢您的时间与反思。",
    completionHome: "返回首页",
    resetAll: "重置全部进度",
    resetConfirm: "重置全部进度？此操作无法撤销。",
    returnHome: "返回首页",

    premiumReportTitle: "详细高级报告",
    premiumReportSubtitle: "一份直接写给你的个性化连续性解读。",
    backToResults: "返回摘要",
    continueAfterPremium: "继续",
    downloadReport: "下载报告 (JSON)",
    deepInterpretation: "深度结构解读",
    interactionAnalysis: "系统张力分析",
    recoveryStructureAnalysis: "恢复结构分析",
    environmentalMismatch: "环境结构适配",
    structuralInterpretation: "结构解读",
    patternDynamics: "模式动力学",
    continuityDynamics: "连续性动力学",
    systemTensionAnalysis: "系统张力分析",
    supportConversionPatterns: "支持转化模式",
    continuityRiskInterpretation: "连续性风险解读",
    subvarDetail: "子变量详情",

    typologyArchetype: "你的连续性模式",
    typologyRecoveryStyle: "恢复风格",
    typologyConversionStyle: "支持转化风格",
    crossInsight: "各部分如何连在一起",
    conversionWatchFor: "这也可能带来：",
    riskWhen: "尤其当：",
    compensatoryPatterns: "你可能如何补偿",
    continuityRisks: "连续性风险",

    promoTitle: "输入邀请码",
    promoSubtitle: "输入访问码以解锁高级报告。",
    promoPlaceholder: "邀请码",
    promoInvalid: "邀请码无效，请重试。",
    promoUnlock: "解锁",
    cancel: "取消",

    footerText: "MindStrategyLab · 支持系统动力学评估 · 研究导向的结构映射",

    validationAge: "请选择年龄区间。",
    validationEthnicity: "请填写族裔 / 文化背景。",
    validationLifeStructure: "请选择当前生活结构。",
    validationSocialIdentity: "请选择当前社会身份。",
    validationStress: "请至少选择一项压力来源。",
    validationSupport: "请至少选择一项支持来源。",

    likert: ["非常不同意", "不同意", "略不同意", "中立", "略同意", "同意", "非常同意"],

    disclaimer:
      "这些结果基于自陈报告描述当前结构倾向。其为解释性而非确定性，不构成诊断、预后或临床评估。",

    tierRobust: "结构稳健",
    tierModerate: "中等稳定",
    tierVariable: "压力下波动",
    tierConstrained: "可能受限",
    tierFragile: "当前脆弱",

    layerNarrative: (id, tier) =>
      ({
        1: `第 1 层（资源存在）在您当前画像中呈现为${tier}。这反映关系、身份、物质保障、健康与信念系统等作为生活背景中结构性资源的基础条件。`,
        2: `第 2 层（感知支持结构）呈现为${tier}。该层反映支持是否在心理上被感知为可及且情感上在场，与资源是否客观存在无关。`,
        3: `第 3 层（支持可及性）呈现为${tier}。这表明支持被识别、请求、接受并转化为恢复的可行程度——连接需求与使用的操作桥梁。`,
        4: `第 4 层（结构恢复能力）呈现为${tier}。这反映当结构失稳或崩溃后，您能否重组连续性、重建方向并恢复长期运作。`,
      })[id] || "",

    anchorNarrative: (names) =>
      `您最强的支持锚点出现在：${names}。在长期压力下其他结构要素削弱时，这些领域可能成为稳定参照点。`,
    weaknessNarrative: (names) =>
      `在长期压力下连续性可能减弱的领域包括：${names}。这些代表当前结构倾向而非固定缺陷——情境变化可能改变其意义。`,
    bottleneckNarrative: (names) =>
      `可能的支持瓶颈出现在可及性维度：${names}。当资源存在却无法获取或利用时，连续性压力往往集中于此层。`,
    vulnerabilityNarrative: (names) =>
      `重组脆弱点可能聚集在：${names}。这些提示结构破坏后的恢复与重组能力可能受益于结构关注，但结果仍取决于情境。`,

    premiumDeepIntro:
      "这份解读映射你拥有的、感受到的、能调用的与如何恢复如何衔接——用清晰语言写给你，并定位到你具体的优势与缺口。",
  },
};

/* Layer, sub-variable, framework, pattern & option labels */

const SSD_LABELS = {
  layers: {
    1: { en: "Resource Existence", zh: "资源存在" },
    2: { en: "Perceived Support Structures", zh: "感知支持结构" },
    3: { en: "Support Accessibility", zh: "支持可及性" },
    4: { en: "Structural Recovery Capacity", zh: "结构恢复能力" },
  },
  layerDesc: {
    1: {
      en: "Foundational resources and structural conditions that exist in your life context — whether or not they are currently accessible.",
      zh: "生活背景中存在的基础资源与结构条件——无论当前是否可及。",
    },
    2: {
      en: "Whether support is psychologically perceived and emotionally available — the felt sense of being held by your environment.",
      zh: "支持是否在心理上被感知并情感上可及——被环境承托的体感。",
    },
    3: {
      en: "Whether support can actually be identified, entered, accepted, and transformed — the bridge between need and use.",
      zh: "支持是否能被识别、进入、接受并转化——连接需求与使用的桥梁。",
    },
    4: {
      en: "When structures become unstable, can the system reorganize — rebuilding life structure, restoring continuity, re-engaging action, and recovering long-term functioning after disruption.",
      zh: "当结构失稳时，系统能否重组——在破坏后重建生活结构、恢复连续性、重新投入行动并恢复长期运作。",
    },
  },
  layerShort: { 1: { en: "Layer 1", zh: "第 1 层" }, 2: { en: "Layer 2", zh: "第 2 层" }, 3: { en: "Layer 3", zh: "第 3 层" }, 4: { en: "Layer 4", zh: "第 4 层" } },
  subvariables: {
    interpersonal_stability: { en: "Interpersonal Stability", zh: "人际稳定性" },
    identity_stability: { en: "Identity Stability", zh: "身份稳定性" },
    power_stability: { en: "Power Stability", zh: "权力稳定性" },
    material_stability: { en: "Material Stability", zh: "物质稳定性" },
    existential_stability: { en: "Existential Stability", zh: "存在连续性" },
    health_stability: { en: "Health Stability", zh: "健康稳定性" },
    capability_flexibility: { en: "Capability Flexibility", zh: "能力灵活性" },
    belief_stability: { en: "Belief Stability", zh: "信念稳定性" },
    perceived_emotional_support: { en: "Perceived Emotional Support", zh: "感知情感支持" },
    perceived_structural_safety: { en: "Perceived Structural Safety", zh: "感知结构安全" },
    perceived_continuity: { en: "Perceived Continuity", zh: "感知连续性" },
    perceived_belonging: { en: "Perceived Belonging", zh: "感知归属感" },
    perceived_recoverability: { en: "Perceived Recoverability", zh: "感知可恢复性" },
    deficit_recognition: { en: "Deficit Recognition", zh: "缺口识别" },
    need_expression: { en: "Need Expression", zh: "需求表达" },
    help_seeking_capacity: { en: "Help-Seeking Capacity", zh: "求助能力" },
    relational_accessibility: { en: "Relational Accessibility", zh: "关系可及性" },
    support_acceptance: { en: "Support Acceptance", zh: "支持接受" },
    recovery_conversion: { en: "Recovery Conversion Capacity", zh: "恢复转化能力" },
    recovery_capacity: { en: "Recovery Capacity", zh: "恢复能力" },
    continuity_restoration: { en: "Continuity Restoration", zh: "连续性恢复" },
    action_reengagement: { en: "Action Re-engagement", zh: "行动再投入" },
    structural_reorganization: { en: "Structural Reorganization", zh: "结构重组" },
    functional_resilience: { en: "Functional Resilience", zh: "功能韧性" },
    long_term_direction_recovery: { en: "Long-Term Direction Recovery", zh: "长期方向恢复" },
    sustainable_restabilization: { en: "Sustainable Re-stabilization", zh: "可持续再稳定" },
  },
  frameworkSteps: [
    { en: "Contexts", zh: "背景情境", descEn: "Life structure, stressors, and available resources", descZh: "生活结构、压力源与可用资源" },
    { en: "Resource Existence", zh: "资源存在", descEn: "Foundational stability across life domains", descZh: "跨生活领域的基础稳定性" },
    { en: "Perceived Support Structures", zh: "感知支持结构", descEn: "Felt availability of emotional and structural support", descZh: "情感与结构支持的可感知可及性" },
    { en: "Support Accessibility", zh: "支持可及性", descEn: "Capacity to identify, request, and use support", descZh: "识别、请求与利用支持的能力" },
    { en: "Structural Recovery Capacity", zh: "结构恢复能力", descEn: "Reorganization and functional recovery after structural disruption", descZh: "结构破坏后的重组与功能恢复" },
  ],
  patterns: {
    integrated_continuity: {
      en: { label: "Integrated Continuity Pattern", desc: "Your responses suggest a relatively integrated support system — resources exist, support is perceived, accessibility is functional, and structural recovery capacity appears robust. This pattern indicates structural coherence across layers, though localized vulnerabilities may still exist under prolonged stress." },
      zh: { label: "整合连续性模式", desc: "您的回答显示支持系统相对整合——资源存在、支持被感知、可及性可用、结构恢复能力较为稳健。该模式表明跨层结构连贯，但在长期压力下仍可能存在局部脆弱点。" },
    },
    perception_gap: {
      en: { label: "Resource–Perception Gap", desc: "Resources appear to exist at a structural level, but perceived support may not fully register as emotionally available. This pattern sometimes reflects environmental mismatch, trust barriers, or periods when internal capacity to receive support is reduced." },
      zh: { label: "资源—感知差距", desc: "资源在结构层面似乎存在，但感知支持可能未完全注册为情感上可及。此模式有时反映环境错配、信任障碍，或接收支持的内在能力暂时降低。" },
    },
    accessibility_bottleneck: {
      en: { label: "Accessibility Bottleneck Pattern", desc: "Support may be perceived as present, but converting that into accessible, usable support appears structurally constrained. Possible bottlenecks include help-seeking barriers, relational distance, or difficulty accepting support when offered." },
      zh: { label: "可及性瓶颈模式", desc: "支持可能被感知为存在，但转化为可及、可用的支持似乎受到结构限制。瓶颈可能包括求助障碍、关系距离，或难以接受所提供的支持。" },
    },
    conversion_strain: {
      en: { label: "Recovery Conversion Strain", desc: "Support accessibility appears moderate, but structural recovery capacity suggests that support inputs may not fully translate into sustained reorganization and continuity. This can reflect compensatory patterns, environmental volatility, or cumulative stress load." },
      zh: { label: "恢复转化压力", desc: "支持可及性中等，但结构恢复能力表明支持输入可能未完全转化为持续重组与连续性。这可能反映补偿模式、环境波动或累积压力负荷。" },
    },
    structural_fragility: {
      en: { label: "Structural Fragility Pattern", desc: "Across multiple layers, current structural tendencies suggest vulnerability to continuity disruption under sustained stress. This is an interpretive pattern, not a fixed state — structural conditions can shift with context, support, and time." },
      zh: { label: "结构脆弱模式", desc: "跨多层，当前结构倾向表明在持续压力下易受连续性破坏。这是解释性模式而非固定状态——结构条件可随情境、支持与时间变化。" },
    },
    compensatory_resilience: {
      en: { label: "Compensatory Resilience Pattern", desc: "Recovery outcomes appear stronger than foundational resource scores might predict. This may reflect active compensatory strategies, adaptive capacity, or support sources not fully captured in resource-existence items." },
      zh: { label: "补偿性韧性模式", desc: "恢复结果似乎强于基础资源分数所预测。这可能反映积极的补偿策略、适应能力，或未在资源存在题项中充分捕捉的支持来源。" },
    },
    mixed_dynamics: {
      en: { label: "Mixed Support Dynamics", desc: "Your profile shows varied strengths and vulnerabilities across layers rather than a single dominant pattern. This is common — support systems are rarely uniform, and localized structural tendencies may matter more than overall averages under specific stress conditions." },
      zh: { label: "混合支持动力学", desc: "您的画像跨层呈现多样的优势与脆弱点，而非单一主导模式。这很常见——支持系统很少均匀，在特定压力条件下局部结构倾向可能比整体均值更重要。" },
    },
  },
  options: {
    "Under 18": { en: "Under 18", zh: "18 岁以下" },
    "18–24": { en: "18–24", zh: "18–24 岁" },
    "25–34": { en: "25–34", zh: "25–34 岁" },
    "35–44": { en: "35–44", zh: "35–44 岁" },
    "45–54": { en: "45–54", zh: "45–54 岁" },
    "55–64": { en: "55–64", zh: "55–64 岁" },
    "65+": { en: "65+", zh: "65 岁以上" },
    "Prefer not to say": { en: "Prefer not to say", zh: "不愿透露" },
    student: { en: "student", zh: "学生" },
    working: { en: "working", zh: "在职" },
    freelance: { en: "freelance", zh: "自由职业" },
    entrepreneur: { en: "entrepreneur", zh: "创业者" },
    caregiver: { en: "caregiver", zh: "照护者" },
    unemployed: { en: "unemployed", zh: "失业" },
    transitioning: { en: "transitioning", zh: "转型中" },
    "long-term unstable situation": { en: "long-term unstable situation", zh: "长期不稳定状况" },
    "local resident": { en: "local resident", zh: "本地居民" },
    immigrant: { en: "immigrant", zh: "移民" },
    "international student": { en: "international student", zh: "国际学生" },
    "temporary worker": { en: "temporary worker", zh: "临时工作者" },
    "refugee/asylum seeker": { en: "refugee/asylum seeker", zh: "难民/寻求庇护者" },
    "long-term traveler": { en: "long-term traveler", zh: "长期旅行者" },
    "mixed / complex identity": { en: "mixed / complex identity", zh: "混合/复杂身份" },
    financial: { en: "financial", zh: "经济" },
    academic: { en: "academic", zh: "学业" },
    work: { en: "work", zh: "工作" },
    health: { en: "health", zh: "健康" },
    "identity/meaning": { en: "identity/meaning", zh: "身份/意义" },
    family: { en: "family", zh: "家庭" },
    relationship: { en: "relationship", zh: "关系" },
    uncertainty: { en: "uncertainty", zh: "不确定性" },
    burnout: { en: "burnout", zh: "倦怠" },
    instability: { en: "instability", zh: "不稳定" },
    self: { en: "self", zh: "自我" },
    partner: { en: "partner", zh: "伴侣" },
    friends: { en: "friends", zh: "朋友" },
    "online communities": { en: "online communities", zh: "线上社群" },
    "work structure": { en: "work structure", zh: "工作结构" },
    "beliefs/meaning": { en: "beliefs/meaning", zh: "信念/意义" },
    "no stable support": { en: "no stable support", zh: "无稳定支持" },
    ADHD: { en: "ADHD", zh: "ADHD" },
    "Autism / ASD": { en: "Autism / ASD", zh: "自闭症/ASD" },
    Dyslexia: { en: "Dyslexia", zh: "阅读障碍" },
    Dyspraxia: { en: "Dyspraxia", zh: "动作协调障碍" },
    "Anxiety-related": { en: "Anxiety-related", zh: "焦虑相关" },
    "Depression-related": { en: "Depression-related", zh: "抑郁相关" },
    "Other neurodivergence": { en: "Other neurodivergence", zh: "其他神经多样性" },
  },
};

const SSDI18n = (() => {
  "use strict";

  const pack = (lang) => SSD_I18N[lang === "zh" ? "zh" : "en"];

  const ui = (lang, key, ...args) => {
    const val = pack(lang)[key];
    if (val == null) return String(key);
    return typeof val === "function" ? val(...args) : val;
  };

  const lbl = (obj, lang) => (lang === "zh" ? obj.zh : obj.en);

  const layerLabel = (lang, id) => lbl(SSD_LABELS.layers[id] || { en: `Layer ${id}`, zh: `第 ${id} 层` }, lang);
  const layerDesc = (lang, id) => lbl(SSD_LABELS.layerDesc[id] || { en: "", zh: "" }, lang);
  const layerShort = (lang, id) => lbl(SSD_LABELS.layerShort[id] || { en: `Layer ${id}`, zh: `第 ${id} 层` }, lang);
  const subvarLabel = (lang, key) => lbl(SSD_LABELS.subvariables[key] || { en: key, zh: key }, lang);
  const optionLabel = (lang, value) => lbl(SSD_LABELS.options[value] || { en: value, zh: value }, lang);
  const patternInfo = (lang, key) => {
    const p = SSD_LABELS.patterns[key];
    if (!p) return { label: key, desc: "" };
    return lang === "zh" ? p.zh : p.en;
  };

  const itemText = (lang, item) => {
    if (lang === "zh" && typeof SSD_ITEMS_ZH !== "undefined" && SSD_ITEMS_ZH[item.id]) {
      return SSD_ITEMS_ZH[item.id];
    }
    return item.text;
  };

  const tierLabel = (lang, pct) => {
    const p = pack(lang);
    if (pct >= 75) return p.tierRobust;
    if (pct >= 60) return p.tierModerate;
    if (pct >= 45) return p.tierVariable;
    if (pct >= 30) return p.tierConstrained;
    return p.tierFragile;
  };

  const likertLabels = (lang) => pack(lang).likert;

  return {
    pack,
    ui,
    layerLabel,
    layerDesc,
    layerShort,
    subvarLabel,
    optionLabel,
    patternInfo,
    itemText,
    tierLabel,
    likertLabels,
    frameworkSteps: (lang) =>
      SSD_LABELS.frameworkSteps.map((s) => ({
        label: lbl({ en: s.en, zh: s.zh }, lang),
        description: lang === "zh" ? s.descZh : s.descEn,
      })),
  };
})();
