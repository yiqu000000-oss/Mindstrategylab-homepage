/* Reset Blueprint: Amygdala Reset Tool */

const I18N = {
  zh: {
    appTitle: '杏仁核重启',
    heroLabel: 'Signal Scan · 3 分钟',
    heroTitle: '杏仁核重启',
    heroDesc: '用 3 分钟，听懂焦虑想告诉你的信号。',
    enterLecture: '开始今天的重启',
    homeKicker: '从一个当下的焦虑开始',
    homeQuestion: '现在最牵动你的事情是什么？',
    homeConcernPlaceholder: '例如：我一想到明天的汇报，胸口就紧，脑子一直在想会不会搞砸。',
    homeFocusBody: '身体先警报',
    homeFocusThought: '思维停不下',
    homeFocusAction: '不知道怎么做',
    homeLevelLabel: '当前强度',
    homeResult1: '信号类型',
    homeResult2: '身体警报',
    homeResult3: '下一步行动',
    homePathKicker: '你现在需要哪一种帮助？',
    homePathTitle: '不用一次做完，选一个当下最需要的。',
    scanKicker: '信号扫描',
    scanQuestionState: '此刻，你更接近哪种状态？',
    scanProgressBody: '正在识别身体信号',
    scanProgressThought: '正在识别思维模式',
    scanProgressSource: '正在寻找焦虑来源',
    scanProgressAction: '正在生成下一步行动',
    scanContinue: '继续',
    scanNext: '下一步',
    scanSeeSignal: '看看信号',
    resultTitle: '你的重启路径',
    restartScan: '重新开始',
    saveScan: '保存这次扫描',
    disclaimerTitle: '非诊断声明',
    disclaimerDesc: '本工具仅用于心理教育与自我观察，不能替代专业心理或医疗诊断与治疗。若你感到持续困扰、功能受损或出现危机，请寻求持证心理健康专业人士的帮助。',
    outline1Title: '整理一个焦虑', outline1Desc: '把刚刚发生的事、身体反应和下一步放到一张小卡里。',
    outline2Title: '看见脑内循环', outline2Desc: '看看是哪一种念头让警报越来越响。',
    outline3Title: '先稳住身体', outline3Desc: '先让呼吸、肌肉和身体从警报里慢慢回来。',
    outline4Title: '带走一个行动', outline4Desc: '把焦虑缩小成现在就能做的一小步。',
    nav1: '整理信号', nav2: '看见想法', nav3: '先稳身体', nav4: '下一步', navHome: '首页',
    presenterMode: '演示模式',
    presenterPanelTitle: '演示者控制台',
    presenterHint: '在此输入案例，选择模式后记录到练习里。也可在各章节互动区直接操作。',
    caseLabel: '案例描述', patternLabel: '思维模式（可选）', sectionLabel: '所属章节',
    showOnScreen: '保存案例', clearBoard: '清空案例',
    footerText: '仅供心理教育 · 非临床诊断',
    section1Badge: '', section1Title: '杏仁核重启', section1Prompt: '现在先不用想明白全部。选一个最接近你的状态。', emergencyCalm: '我现在很急，先稳一下',
    section1Intro: '现在先不用想明白全部。选一个最接近你的状态。',
    signalTrigger: '触发事件', signalBody: '身体信号', signalMeaning: '意义解读', signalAction: '行动选择',
    signalHint: '点击各步骤展开/收起，可直接在示例文字上修改',
    signalDefaultTrigger: '被突然点名发言',
    signalDefaultBody: '心跳加速、手心出汗、脑子一片空白',
    signalDefaultMeaning: '「完了，我肯定会出丑」',
    signalDefaultAction: '低头回避目光，想发言但说不出口',
    positiveTitle: '正性焦虑', positiveTagline: '适度 · 与目标匹配 · 可行动',
    negativeTitle: '负性焦虑', negativeTagline: '过度 · 与目标失配 · 消耗性',
    positiveItems: ['面试前适度紧张，促使你认真准备', '重要项目截止前的紧迫感，提升专注力', '对健康的合理担忧，促使定期体检', '焦虑随任务完成而自然消退'],
    negativeItems: ['反复想象失败场景，却无法采取有效行动', '对身体正常感觉的灾难化解读', '长期失眠、反刍，影响日常功能', '焦虑程度远超事件实际风险'],
    snapshotExerciseTitle: '整理此刻这个焦虑',
    snapshotExerciseDesc: '不用写得完整，先把最明显的几件事放下来。',
    snapshotStep1: '描述你最近的一个焦虑状态',
    snapshotEventPlaceholder: '例如：最近总在睡前反复想工作上的事…',
    snapshotStep2: '这件事属于…',
    addCatSentence: '添加条目',
    removeCatSentence: '删除条目',
    catDaily: '日常生活', catRelation: '人际关系', catWork: '工作学业',
    catSentences: {
      daily: [
        '这种焦虑让我在日常小事上也很难放松。',
        '我发现自己反复担心一些不太可能发生的事。'
      ],
      relation: [
        '我担心别人对我的看法和评价。',
        '在某些关系中，我很难表达真实的想法。'
      ],
      work: [
        '在表现压力下，我很难发挥出正常水平。',
        '我担心自己的能力不足以应对当前的要求。'
      ]
    },
    snapshotStep3: '现在有多强烈',
    snapshotStep4: '面对这个焦虑，你的本能反应是？（可多选）',
    responseFight: '战斗（对抗、争辩、控制）',
    responseFlee: '逃跑（回避、拖延、离开）',
    responseFreeze: '木僵（脑子空白、无法行动）',
    snapshotStep5: '记录你在四个维度的具体状态',
    snapshotDimTriggerGuide: '什么情况让这种感觉出现了？',
    snapshotDimBodyGuide: '当时身体有什么反应？',
    snapshotDimMeaningGuide: '你当时告诉自己这意味着什么？',
    snapshotDimActionGuide: '你做了什么，或者想做什么却没做？',
    generateSnapshot: '看看这个信号',
    snapshotCardTitle: '这次焦虑小卡',
    projectSnapshot: '保存快照',
    snapshotMixed: '待进一步觉察',
    snapshotNotFilled: '请先填写焦虑事件',
    snapshotSelectCategory: '请选择事件类别',
    snapshotLabelCategory: '事件类别',
    snapshotLabelCategorySentences: '类别描述',
    snapshotLabelLevel: '当下强度',
    snapshotLabelResponses: '本能反应',
    snapshotLabelDimensions: '四维度记录',
    snapshotNoDim: '（未填写）',
    snapshotValidationHint: '请完成必填项后再生成',
    casePlaceholder: '例如：听众分享的一个具体情境…',
    section2Badge: '', section2Title: '看见脑内循环',
    section2Intro: '选择最像你的念头，看看警报是怎样被放大的。',
    patternIntensity: '这个念头有多响',
    generatePatternSnapshot: '整理这些念头',
    patternSnapshotCardTitle: '脑内循环小卡',
    projectPatternSnapshot: '保存快照',
    patternSeverityLabel: '严重程度',
    patternAltLabel: '替代性方案',
    scenarioLabel: '案例',
    scenarioPlaceholder: '写下或修改你的经历…',
    referenceStrategiesTitle: '参考应对策略',
    showReferenceStrategies: '查看参考策略',
    hideReferenceStrategies: '收起参考策略',
    displayAudienceSuggestions: '如果是你，你会怎么做？',
    originalThought: '原有想法（点击划掉）',
    suggestionsEmpty: '点击+分享你的想法',
    addSuggestion: '添加建议',
    section3Badge: '', section3Title: '看见警报通路',
    section3Intro: '感觉信息经丘脑分流：杏仁核「快车道」约 12ms 触发反应；皮层「慢车道」经前额叶与海马体评估后调节。选择皮层通道可练习 8 种思维模式。',
    thoughtModule1Title: '先看警报通路',
    thoughtModule1Desc: '看看焦虑更像身体快车道，还是脑内慢车道。',
    thoughtModule2Title: '找出放大的念头',
    thoughtModule2Desc: '选择最像你的脑内循环，把它写下来。',
    thoughtModule3Title: '画出触发地图',
    thoughtModule3Desc: '把事件、身体反应和防御方式放在一起。',
    amygdalaLabel: '杏仁核', cortexLabel: '前额叶皮层', thalamusLabel: '丘脑', hippocampusLabel: '海马体',
    sensoryInput: '感觉输入',
    fastPath: '快车道 ~12ms', slowPath: '慢车道 ~300ms',
    selectAmygdalaPath: '杏仁核通道', selectCortexPath: '皮层通道',
    amygdalaPathDesc: '感觉信息直达杏仁核，约12毫秒触发警报。大脑将危险经历与特定信号配对记忆，日后遇到相似信号就自动激活焦虑反应，不经过思考。',
    cortexPathDesc: '信息经过大脑皮层的分析和解读，约300毫秒后才到达杏仁核。皮层可以通过想象、预期、过度分析等方式主动制造威胁，即使没有真实危险也会触发焦虑。',
    brainHint: '选择通路或点击脑区查看详情',
    brainDefaultTitle: '选择通路', brainDefaultDesc: '点击「杏仁核通道」或「皮层通道」观看信号流动动画，下方显示生理反应与应对策略。',
    physioTitle: '生理反应', strategyTitle: '应对策略',
    triggerMapTitle: '我的触发点地图',
    triggerNegativeEvent: '负面事件',
    triggerNegativeEventHint: '什么情况触发了焦虑？',
    triggerSpontaneous: '自发情绪反应',
    triggerSpontaneousHint: '身体和情绪立刻出现了什么？',
    triggerLearnedDefense: '习得式防御反应',
    triggerLearnedDefenseHint: '你学会了用什么方式回避或应对？',
    triggerMapAnxiety: '当下强度',
    triggerDefaultNegative: '在团队会议上被突然点名发言',
    triggerDefaultSpontaneous: '心跳加速、脸发热、脑子一片空白，立刻想逃离房间',
    triggerDefaultLearned: '低头看笔记、尽量缩短回答、会后反复回想是否说错',
    exposurePracticeTitle: '练习：重新训练杏仁核',
    exposureTarget: '我想让杏仁核停止过度反应的事情',
    exposurePlan: '我打算如何面对它',
    exposureLevel: '暴露程度',
    exposureLevelLow: '0=仅想象',
    exposureLevelHigh: '10=完全暴露',
    distressLevel: '主观痛苦等级',
    exposureExamplesTitle: '同一事件 · 暴露程度渐增示例（可编辑）',
    exposureStepLabels: ['第 1 阶 · 想象', '第 2 阶 · 准备', '第 3 阶 · 模拟', '第 4 阶 · 实战'],
    exposureDefaultTarget: '在团队会议上发言',
    exposureDefaultPlan: '从想象暴露开始，配合呼吸，逐步升级面对方式',
    exposureExampleColumns: [
      { target: '在团队会议上发言', plan: '闭眼安静想象自己发言的场景约 1 分钟', exposure: 2, distress: 3 },
      { target: '在团队会议上发言', plan: '对着镜子练习开场白和第一句话', exposure: 4, distress: 4 },
      { target: '在团队会议上发言', plan: '在朋友面前模拟发言 2 分钟', exposure: 6, distress: 5 },
      { target: '在团队会议上发言', plan: '下次团队会上主动分享一个观点', exposure: 9, distress: 7 }
    ],
    exposureTipsTitle: '注意事项',
    exposureTips: '暴露练习适合作为自我探索工具，如有严重焦虑或创伤史，建议在专业治疗师的指导下进行。可以从痛苦程度4-5分的情境开始，既有挑战性，又在可承受范围内。',
    sectionCalmBadge: '', sectionCalmTitle: '先稳住身体',
    sectionCalmIntro: '如果现在已经很紧，先不用解释原因。让身体降一点点下来。',
    calmModule1Title: '60 秒先稳一下',
    calmModule1Desc: '跟着呼吸，把警报降一点点。',
    calmModule2Title: '回到安全感',
    calmModule2Desc: '写下一个身体可以想象得到的安全场所。',
    calmModule3Title: '松开一组肌肉',
    calmModule3Desc: '从身体紧绷处开始，一组一组松开。',
    calmModule4Title: '清单和指南',
    calmModule4Desc: '用睡眠、运动和饮食的小清单给身体更多支撑。',
    breathPracticeTitle: '60 秒先稳一下',
    breathInhale: '吸气', breathExhale: '呼气',
    breathCue1: '横膈膜下沉→肺部充分扩张',
    breathCue2: '迷走神经激活→副交感神经介入',
    breathCue3: '心率逐渐放缓→警报解除',
    breathStart: '开始练习', breathPause: '暂停',
    imaginedRelaxTitle: '想象放松',
    safePlaceTitle: '找到你的安全场所',
    safePlaceDefault: '想象一个让你感到平静安全的地方——也许是海边、森林、或者一个温暖的房间。感受那里的温度、声音和气味，让自己完全置身其中。',
    pmrTitle: '渐进式肌肉放松',
    pmrStepHint: '收紧5秒→放松',
    pmrTightenLabel: '收紧',
    pmrRelaxLabel: '放松',
    pmrNext: '下一步',
    pmrDone: '全部完成',
    sleepChecklistTitle: '健康睡眠清单',
    sleepChecklistItems: [
      '固定起床时间',
      '睡前1小时避免屏幕',
      '卧室只用于睡眠',
      '避免白天小睡超过20分钟',
      '睡前避免咖啡因和酒精',
      '保持卧室凉爽黑暗',
      '睡前做放松活动',
      '感到困倦才上床'
    ],
    exerciseChecklistTitle: '本周运动计划',
    exerciseChecklistItems: [
      '每周3次有氧运动（每次20分钟以上）',
      '选择自己喜欢的运动方式',
      '运动后记录焦虑程度变化'
    ],
    dietChecklistTitle: '稳定血糖指南',
    dietChecklistItems: [
      '减少精制糖和咖啡因摄入',
      '规律进食避免低血糖',
      '多摄入富含omega-3的食物',
      '注意咖啡因对自己焦虑的影响'
    ],
    section4Badge: '', section4Title: '带走一个行动',
    section4Intro: '不用解决全部。先找到一个和当下状态匹配的小动作。',
    actionModule1Title: '看下一步多大',
    actionModule1Desc: '让目标和紧绷程度匹配，不用一下做完。',
    actionModule2Title: '找到行动区间',
    actionModule2Desc: '看看现在更适合降低负荷，还是直接行动。',
    actionModule3Title: '写下一个小动作',
    actionModule3Desc: '把焦虑带来的信息，变成一个可开始的动作。',
    tableTitle: '现在适合做多大的一步', tableDescSlider: '滑块实时高亮对应格子；绿色区域为 Yerkes-Dodson 最佳匹配。',
    yerkesTitle: '焦虑和目标的匹配感',
    yerkesDesc: '拖动两个滑块，找到现在比较适合的一步。',
    yerkesOptimal: '最佳匹配 ✓', yerkesTooLow: '焦虑过低', yerkesTooHigh: '焦虑过高',
    yerkesRange: (lo, hi) => `此目标的最佳焦虑区间：${lo} – ${hi}`,
    yerkesDeltaOptimal: '当前处于最佳功能区',
    yerkesDeltaLow: (n) => `低于最佳区间 ${n} 分，可能缺乏动力`,
    yerkesDeltaHigh: (n) => `高于最佳区间 ${n} 分，可能过度消耗`,
    matrixCorner: '目标 \\ 焦虑', anxietyLow: '过低', anxietyOptimal: '最佳', anxietyHigh: '过高',
    goalLow: '日常 / 低', goalMedium: '重要 / 中', goalHigh: '关键 / 高',
    goalImportance: '目标重要性', currentAnxiety: '当前焦虑',
    myGoalLabel: '我的目标',
    myGoalPlaceholder: '写下你想用这个焦虑推动的具体目标…',
    useStepsTitle: '四步使用焦虑',
    useSteps: [
      ['觉察信号', '注意身体感受（心跳、呼吸、肌肉紧张），不急于评判。'],
      ['读懂信息', '问自己：「这个焦虑在提醒我什么重要的事？」'],
      ['看看大小', '这件事需要多大的一步？现在的紧绷是太高、太低，还是刚刚好？'],
      ['选择行动', '如果太满，先安抚身体；如果刚好，就把行动拆成一个很小的开始。']
    ],
    patternNone: '— 不指定 —',
    displayCase: '听众案例',
    displayDiscussion: '讨论要点',
    goals: { low: '日常任务', medium: '重要目标', high: '关键目标' }
  },
  en: {
    appTitle: 'Reset Blueprint',
    heroLabel: 'Signal Scan · 3 minutes',
    heroTitle: 'Amygdala Reset',
    heroDesc: 'A 3-minute reflection to understand what your anxiety is trying to signal.',
    enterLecture: 'Start today’s reset',
    homeKicker: 'Start with one live anxiety signal',
    homeQuestion: 'What is pulling on your nervous system right now?',
    homeConcernPlaceholder: 'Example: When I think about tomorrow’s presentation, my chest tightens and I keep imagining it going wrong.',
    homeFocusBody: 'Body alarm first',
    homeFocusThought: 'Thoughts won’t stop',
    homeFocusAction: 'Unsure what to do',
    homeLevelLabel: 'Current intensity',
    homeResult1: 'Signal type',
    homeResult2: 'Body alarm',
    homeResult3: 'Next action',
    homePathKicker: 'What kind of support do you need right now?',
    homePathTitle: 'You do not have to do everything. Pick what fits this moment.',
    scanKicker: 'Signal Scan',
    scanQuestionState: 'Which state feels closest right now?',
    scanProgressBody: 'Reading body signals',
    scanProgressThought: 'Identifying thought patterns',
    scanProgressSource: 'Locating the anxiety source',
    scanProgressAction: 'Generating your next step',
    scanContinue: 'Continue',
    scanNext: 'Next',
    scanSeeSignal: 'See the signal',
    resultTitle: 'Your Reset Path',
    restartScan: 'Start over',
    saveScan: 'Save this scan',
    disclaimerTitle: 'Disclaimer',
    disclaimerDesc: 'This tool is for psychoeducation and self-reflection only. It does not replace professional psychological or medical diagnosis or treatment. If you feel persistently distressed, impaired, or in crisis, please seek help from a licensed mental health professional.',
    outline1Title: 'Sort One Anxiety', outline1Desc: 'Put the moment, body signal, meaning, and next step onto one small card.',
    outline2Title: 'Notice the Loop', outline2Desc: 'See which thought is making the alarm louder.',
    outline3Title: 'Steady the Body', outline3Desc: 'Let breath, muscles, and body come back from alarm first.',
    outline4Title: 'Take One Step', outline4Desc: 'Shrink anxiety into one small thing you can do now.',
    nav1: 'Sort', nav2: 'Notice', nav3: 'Steady', nav4: 'Next Step', navHome: 'Home',
    presenterMode: 'Presenter',
    presenterPanelTitle: 'Presenter Console',
    presenterHint: 'Enter a case here and keep it with the practice. You can also interact directly in each section.',
    caseLabel: 'Case description', patternLabel: 'Pattern (optional)', sectionLabel: 'Section',
    showOnScreen: 'Save case', clearBoard: 'Clear case',
    footerText: 'Psychoeducation only · Not a clinical tool',
    section1Badge: '', section1Title: 'Amygdala Reset', section1Prompt: 'You do not have to understand everything right now. Choose what feels closest.', emergencyCalm: 'I need to steady myself first',
    section1Intro: 'You do not have to understand everything right now. Choose what feels closest.',
    signalTrigger: 'Trigger', signalBody: 'Body Signal', signalMeaning: 'Meaning', signalAction: 'Action',
    signalHint: 'Click each step to expand/collapse — edit the example text directly',
    signalDefaultTrigger: 'Suddenly called on to speak',
    signalDefaultBody: 'Heart racing, sweaty palms, mind going blank',
    signalDefaultMeaning: '"I\'m going to embarrass myself completely"',
    signalDefaultAction: 'Looked down to avoid eye contact; wanted to speak but couldn\'t',
    positiveTitle: 'Positive Anxiety', positiveTagline: 'Moderate · Goal-aligned · Actionable',
    negativeTitle: 'Negative Anxiety', negativeTagline: 'Excessive · Misaligned · Draining',
    positiveItems: ['Mild nerves before an interview, prompting preparation', 'Deadline urgency that boosts focus on important work', 'Reasonable health concerns leading to check-ups', 'Anxiety fades naturally once the task is done'],
    negativeItems: ['Replaying failure scenarios without effective action', 'Catastrophizing normal bodily sensations', 'Chronic insomnia and rumination affecting daily life', 'Anxiety far exceeds the actual risk of the event'],
    snapshotExerciseTitle: 'Sort This Anxiety',
    snapshotExerciseDesc: 'It does not have to be complete. Put down what is most noticeable first.',
    snapshotStep1: 'Describe a recent anxious state',
    snapshotEventPlaceholder: 'e.g. Lately I keep replaying work worries before sleep…',
    snapshotStep2: 'This belongs to…',
    addCatSentence: 'Add entry',
    removeCatSentence: 'Remove entry',
    catDaily: 'Daily life', catRelation: 'Relationships', catWork: 'Work / study',
    catSentences: {
      daily: [
        'This anxiety makes it hard to relax even over small everyday things.',
        'I keep worrying repeatedly about things that probably won\'t happen.'
      ],
      relation: [
        'I worry about what others think of me.',
        'In some relationships, I find it hard to express what I really think.'
      ],
      work: [
        'Under performance pressure, I struggle to perform at my normal level.',
        'I worry my abilities aren\'t enough for what\'s being asked of me.'
      ]
    },
    snapshotStep3: 'Anxiety level',
    snapshotStep4: 'Your instinctive response? (multi-select)',
    responseFight: 'Fight (argue, confront, control)',
    responseFlee: 'Flight (avoid, procrastinate, leave)',
    responseFreeze: 'Freeze (blank mind, unable to act)',
    snapshotStep5: 'Record your state in four dimensions',
    snapshotDimTriggerGuide: 'What situation brought on this feeling?',
    snapshotDimBodyGuide: 'What did your body do at the time?',
    snapshotDimMeaningGuide: 'What did you tell yourself it meant?',
    snapshotDimActionGuide: 'What did you do, or want to do but didn\'t?',
    generateSnapshot: 'See the signal',
    snapshotCardTitle: 'This Anxiety Card',
    projectSnapshot: 'Save snapshot',
    snapshotMixed: 'Needs further awareness',
    snapshotNotFilled: 'Please describe the anxious event first',
    snapshotSelectCategory: 'Please select a category',
    snapshotLabelCategory: 'Category',
    snapshotLabelCategorySentences: 'Category descriptions',
    snapshotLabelLevel: 'Anxiety level',
    snapshotLabelResponses: 'Instinctive responses',
    snapshotLabelDimensions: 'Four dimensions',
    snapshotNoDim: '(not filled)',
    snapshotValidationHint: 'Complete required fields before generating',
    casePlaceholder: 'e.g. A specific scenario shared by an audience member…',
    section2Badge: '', section2Title: 'Notice the Mental Loop',
    section2Intro: 'Choose the thought that feels closest and notice how the alarm gets louder.',
    scenarioLabel: 'Case',
    scenarioPlaceholder: 'Write or edit your experience…',
    patternIntensity: 'How loud is this thought?',
    generatePatternSnapshot: 'Sort these thoughts',
    patternSnapshotCardTitle: 'Mental Loop Card',
    projectPatternSnapshot: 'Save snapshot',
    patternSeverityLabel: 'Severity',
    patternAltLabel: 'Alternative approach',
    referenceStrategiesTitle: 'Reference Strategies',
    showReferenceStrategies: 'View reference strategies',
    hideReferenceStrategies: 'Hide reference strategies',
    displayAudienceSuggestions: 'What would you do?',
    originalThought: 'Original thought (click to strike through)',
    suggestionsEmpty: 'Click + to share your idea',
    addSuggestion: 'Add suggestion',
    section3Badge: '', section3Title: 'Notice the Alarm Pathway',
    section3Intro: 'Sensory input splits at the thalamus: amygdala fast lane (~12ms) vs. cortex slow lane via PFC and hippocampus. Select the cortex path to practice 8 thinking patterns.',
    thoughtModule1Title: 'Read the alarm route',
    thoughtModule1Desc: 'See whether this feels more like a body fast road or a mind slow road.',
    thoughtModule2Title: 'Name the amplified thought',
    thoughtModule2Desc: 'Choose the loop that fits and put it into words.',
    thoughtModule3Title: 'Map the trigger',
    thoughtModule3Desc: 'Place the event, body response, and learned defense together.',
    amygdalaLabel: 'Amygdala', cortexLabel: 'Prefrontal Cortex', thalamusLabel: 'Thalamus', hippocampusLabel: 'Hippocampus',
    sensoryInput: 'Sensory Input',
    fastPath: 'Fast ~12ms', slowPath: 'Slow ~300ms',
    selectAmygdalaPath: 'Amygdala Path', selectCortexPath: 'Cortex Path',
    amygdalaPathDesc: 'Sensory information goes straight to the amygdala, triggering an alarm in about 12 milliseconds. The brain pairs dangerous experiences with specific cues; later, similar cues automatically activate anxiety—without thinking.',
    cortexPathDesc: 'Information is analyzed and interpreted by the cortex before reaching the amygdala, about 300 milliseconds later. The cortex can create threats through imagination, anticipation, or over-analysis—even without real danger, triggering anxiety.',
    brainHint: 'Select a pathway or click a brain region',
    brainDefaultTitle: 'Select a Pathway', brainDefaultDesc: 'Click Amygdala or Cortex pathway to watch signal flow; responses and strategies appear below the diagram.',
    physioTitle: 'Physiological Response', strategyTitle: 'Coping Strategies',
    triggerMapTitle: 'My Trigger Map',
    triggerNegativeEvent: 'Negative event',
    triggerNegativeEventHint: 'What triggered the anxiety?',
    triggerSpontaneous: 'Spontaneous reaction',
    triggerSpontaneousHint: 'What showed up in body and emotion?',
    triggerLearnedDefense: 'Learned defense',
    triggerLearnedDefenseHint: 'How did you learn to avoid or cope?',
    triggerMapAnxiety: 'Anxiety level',
    triggerDefaultNegative: 'Suddenly called on to speak in a team meeting',
    triggerDefaultSpontaneous: 'Heart racing, face flushing, mind going blank, urge to leave the room',
    triggerDefaultLearned: 'Staring at notes, giving minimal answers, replaying mistakes afterward',
    exposurePracticeTitle: 'Practice: Retrain the Amygdala',
    exposureTarget: 'What I want my amygdala to stop overreacting to',
    exposurePlan: 'How I plan to face it',
    exposureLevel: 'Exposure level',
    exposureLevelLow: '0 = imaginal only',
    exposureLevelHigh: '10 = full exposure',
    distressLevel: 'Subjective distress',
    exposureExamplesTitle: 'Same event · Graduated exposure examples (editable)',
    exposureStepLabels: ['Step 1 · Imaginal', 'Step 2 · Prep', 'Step 3 · Simulation', 'Step 4 · Live'],
    exposureDefaultTarget: 'Speaking up in a team meeting',
    exposureDefaultPlan: 'Start with imaginal exposure and breathing, then step up gradually',
    exposureExampleColumns: [
      { target: 'Speaking up in a team meeting', plan: 'Close eyes and imagine the scene for about 1 minute', exposure: 2, distress: 3 },
      { target: 'Speaking up in a team meeting', plan: 'Practice opening lines in front of a mirror', exposure: 4, distress: 4 },
      { target: 'Speaking up in a team meeting', plan: 'Simulate a 2-minute talk in front of a friend', exposure: 6, distress: 5 },
      { target: 'Speaking up in a team meeting', plan: 'Share one point proactively at the next team meeting', exposure: 9, distress: 7 }
    ],
    exposureTipsTitle: 'Please note',
    exposureTips: 'Exposure practice works best as a self-exploration tool. If you have severe anxiety or a history of trauma, work with a licensed therapist. Start with situations rated 4–5 on subjective distress—challenging enough to matter, still within what you can tolerate.',
    sectionCalmBadge: '', sectionCalmTitle: 'Steady the Body First',
    sectionCalmIntro: 'If things feel intense, you do not need to explain it first. Let the body lower the alarm a little.',
    calmModule1Title: 'Steady for 60 seconds',
    calmModule1Desc: 'Follow the breath and lower the alarm a little.',
    calmModule2Title: 'Return to safety',
    calmModule2Desc: 'Write down a place your body can imagine as safe.',
    calmModule3Title: 'Release one muscle group',
    calmModule3Desc: 'Start where the body is tight and loosen it one group at a time.',
    calmModule4Title: 'Checklists and guides',
    calmModule4Desc: 'Use sleep, movement, and food checklists to give the body more support.',
    breathPracticeTitle: '60 Seconds to Steady',
    breathInhale: 'Inhale', breathExhale: 'Exhale',
    breathCue1: 'Diaphragm drops → lungs expand fully',
    breathCue2: 'Vagus nerve activates → parasympathetic system engages',
    breathCue3: 'Heart rate slows → alarm eases',
    breathStart: 'Start Practice', breathPause: 'Pause',
    imaginedRelaxTitle: 'Imagined Relaxation',
    safePlaceTitle: 'Find Your Safe Place',
    safePlaceDefault: 'Picture a place where you feel calm and safe—perhaps a beach, a forest, or a warm room. Notice the temperature, sounds, and scents there, and let yourself be fully present in that space.',
    pmrTitle: 'Progressive Muscle Relaxation',
    pmrStepHint: 'Tense 5 sec → release',
    pmrTightenLabel: 'Tense',
    pmrRelaxLabel: 'Release',
    pmrNext: 'Next',
    pmrDone: 'All complete',
    sleepChecklistTitle: 'Healthy Sleep Checklist',
    sleepChecklistItems: [
      'Fixed wake-up time',
      'No screens 1 hour before bed',
      'Bedroom for sleep only',
      'Daytime naps under 20 minutes',
      'Avoid caffeine and alcohol before bed',
      'Keep bedroom cool and dark',
      'Relaxing activity before bed',
      'Get in bed only when sleepy'
    ],
    exerciseChecklistTitle: 'Weekly Exercise Plan',
    exerciseChecklistItems: [
      'Aerobic exercise 3×/week (20+ minutes each)',
      'Choose activities you enjoy',
      'Track anxiety level changes after exercise'
    ],
    dietChecklistTitle: 'Blood Sugar Stability Guide',
    dietChecklistItems: [
      'Reduce refined sugar and caffeine',
      'Eat regularly to avoid low blood sugar',
      'Eat more omega-3 rich foods',
      'Notice how caffeine affects your anxiety'
    ],
    section4Badge: '', section4Title: 'Take One Step',
    section4Intro: 'You do not have to solve everything. Find one small action that fits your current state.',
    actionModule1Title: 'Size the next step',
    actionModule1Desc: 'Match the goal with your tension level. It does not need to be finished all at once.',
    actionModule2Title: 'Find the action range',
    actionModule2Desc: 'See whether now calls for lowering load or moving into action.',
    actionModule3Title: 'Write one small move',
    actionModule3Desc: 'Turn the signal in anxiety into one action you can begin.',
    tableTitle: 'How Small Should the Next Step Be?', tableDescSlider: 'Sliders highlight the matching cell in real time; green = Yerkes-Dodson optimal.',
    yerkesTitle: 'Anxiety and Goal Fit',
    yerkesDesc: 'Drag both sliders to compute the optimal anxiety range for the goal importance.',
    yerkesOptimal: 'Optimal Match ✓', yerkesTooLow: 'Anxiety Too Low', yerkesTooHigh: 'Anxiety Too High',
    yerkesRange: (lo, hi) => `Optimal anxiety range for this goal: ${lo} – ${hi}`,
    yerkesDeltaOptimal: 'Currently in the optimal performance zone',
    yerkesDeltaLow: (n) => `${n} points below optimal — may lack motivation`,
    yerkesDeltaHigh: (n) => `${n} points above optimal — may be draining`,
    matrixCorner: 'Goal \\ Anxiety', anxietyLow: 'Too Low', anxietyOptimal: 'Optimal', anxietyHigh: 'Too High',
    goalLow: 'Routine / Low', goalMedium: 'Important / Med', goalHigh: 'Critical / High',
    goalImportance: 'Goal importance', currentAnxiety: 'Current anxiety',
    myGoalLabel: 'My goal',
    myGoalPlaceholder: 'Write the specific goal you want this anxiety to drive…',
    useStepsTitle: 'Four Steps to Use Anxiety',
    useSteps: [
      ['Notice the signal', 'Observe body sensations (heartbeat, breath, tension) without judging.'],
      ['Read the message', 'Ask: "What important thing is this anxiety alerting me to?"'],
      ['Assess the match', 'Does anxiety level match goal importance? Too high or too low?'],
      ['Choose action', 'If matched, focus on action; if not, use regulation (breathing, reframing, task breakdown).']
    ],
    patternNone: '— None —',
    displayCase: 'Audience Case',
    displayDiscussion: 'Discussion Points',
    goals: { low: 'Routine task', medium: 'Important goal', high: 'Critical goal' }
  }
};

const SCAN_FLOW = {
  zh: {
    steps: [
      {
        key: 'state',
        progress: 'scanProgressBody',
        question: '此刻，你更接近哪种状态？',
        feedback: '收到。我们先不用急着消除焦虑，先看看它在提醒什么。',
        options: [
          ['tense', '只是有点紧张'],
          ['mind', '脑子停不下来'],
          ['body', '身体已经开始报警'],
          ['overwhelmed', '我快撑不住了']
        ]
      },
      {
        key: 'body',
        progress: 'scanProgressBody',
        question: '身体最先在哪里发出信号？',
        feedback: '好的。身体不是在捣乱，它是在帮你把注意力拉回当下。',
        options: [
          ['chest', '胸口或呼吸'],
          ['stomach', '胃部或喉咙'],
          ['muscle', '肩颈或肌肉'],
          ['numb', '麻木或空白']
        ]
      },
      {
        key: 'thought',
        progress: 'scanProgressThought',
        question: '此刻最强的念头更像哪一种？',
        feedback: '看见这个念头，就已经让杏仁核少了一点独自拉警报的压力。',
        options: [
          ['failure', '我会搞砸'],
          ['judged', '别人会怎么看我'],
          ['control', '我必须马上控制住'],
          ['uncertain', '我不知道会发生什么']
        ]
      },
      {
        key: 'source',
        progress: 'scanProgressSource',
        question: '这份焦虑可能在保护什么？',
        feedback: '这里有一个你很在乎的东西。我们把它变成一个小动作。',
        options: [
          ['care', '我很在乎的结果'],
          ['boundary', '一个还没说清的边界'],
          ['safety', '安全感或稳定感'],
          ['need', '一个没有被整理的需求']
        ]
      }
    ],
    result: {
      signal: '你现在的主要信号',
      protect: '你的焦虑可能在保护什么',
      action: '一个可以立刻做的小行动',
      reframe: '一句重新叙事的话',
      reframeText: '你的焦虑不是在证明你不够好，而是在提醒你：这里有一个你很在乎、但还没有被整理清楚的需求。'
    }
  },
  en: {
    steps: [
      {
        key: 'state',
        progress: 'scanProgressBody',
        question: 'Which state feels closest right now?',
        feedback: 'Got it. We do not have to erase the anxiety first. Let us listen for what it is signaling.',
        options: [
          ['tense', 'A little tense'],
          ['mind', 'My mind won’t stop'],
          ['body', 'My body is sounding the alarm'],
          ['overwhelmed', 'I feel close to overwhelmed']
        ]
      },
      {
        key: 'body',
        progress: 'scanProgressBody',
        question: 'Where is your body signaling first?',
        feedback: 'Your body is not getting in the way. It is trying to bring you back to the present.',
        options: [
          ['chest', 'Chest or breath'],
          ['stomach', 'Stomach or throat'],
          ['muscle', 'Shoulders or muscles'],
          ['numb', 'Numb or blank']
        ]
      },
      {
        key: 'thought',
        progress: 'scanProgressThought',
        question: 'Which thought feels loudest?',
        feedback: 'Noticing the thought already gives your alarm system a little less work to do alone.',
        options: [
          ['failure', 'I will fail'],
          ['judged', 'What will people think?'],
          ['control', 'I must control this now'],
          ['uncertain', 'I do not know what will happen']
        ]
      },
      {
        key: 'source',
        progress: 'scanProgressSource',
        question: 'What might this anxiety be protecting?',
        feedback: 'There is something you care about here. Let us turn it into one small action.',
        options: [
          ['care', 'An outcome I care about'],
          ['boundary', 'A boundary not yet clear'],
          ['safety', 'Safety or stability'],
          ['need', 'A need not yet organized']
        ]
      }
    ],
    result: {
      signal: 'Your main signal right now',
      protect: 'What your anxiety may be protecting',
      action: 'One small action you can do now',
      reframe: 'A new narrative sentence',
      reframeText: 'Your anxiety may not mean you are failing. It may be pointing to something you care about that has not been organized yet.'
    }
  }
};

const SCAN_RESULT_COPY = {
  zh: {
    tense: '轻度紧张：系统已经醒来，但还没有进入强警报。',
    mind: '思维反刍：皮层正在反复模拟风险。',
    body: '身体警报：杏仁核正在优先保护安全。',
    overwhelmed: '接近过载：现在最重要的是先降低负荷。',
    care: '一个你很在乎的结果，需要被拆小和整理。',
    boundary: '一个边界或期待可能还没有被说清。',
    safety: '你可能正在寻找更多稳定感和确定性。',
    need: '一个真实需求正在等待被命名。',
    actionDefault: '把下一步缩小到 2 分钟内能完成的一件事：喝水、写一句话、发一个澄清消息，或离开屏幕呼吸 6 次。'
  },
  en: {
    tense: 'Mild tension: your system is awake, but not in full alarm.',
    mind: 'Mental looping: your cortex is repeatedly simulating risk.',
    body: 'Body alarm: your amygdala is prioritizing safety.',
    overwhelmed: 'Near overload: the first task is to lower the load.',
    care: 'An outcome you care about may need to be made smaller and clearer.',
    boundary: 'A boundary or expectation may not be clear yet.',
    safety: 'You may be looking for more stability and certainty.',
    need: 'A real need may be waiting to be named.',
    actionDefault: 'Shrink the next step to something you can do in 2 minutes: drink water, write one sentence, send one clarifying message, or step away and take 6 breaths.'
  }
};

const PATTERNS = [
  {
    id: 'pessimism',
    zh: {
      name: '悲观主义',
      desc: '倾向于预期最坏结果',
      scenario: '项目汇报前，你确信一定会搞砸，即使之前多次成功。',
      definition: '大脑自动跳转到最坏结局，忽略中性或积极的可能性。这不是「看得远」，而是注意力被负面结果锁死，让人提前体验尚未发生的痛苦。'
    },
    en: {
      name: 'Pessimism',
      desc: 'Expecting the worst outcome',
      scenario: 'Before a presentation, you\'re sure it will fail — despite past successes.',
      definition: 'Your mind jumps to the worst outcome and filters out neutral or positive possibilities. It\'s not foresight — attention gets locked on negative endings, making you suffer in advance for events that haven\'t happened.'
    },
    referenceStrategies: {
      zh: ['列出支持与不支持最坏结果的证据，看看哪边更站得住脚', '分别写一写「最可能」和「最好」的情况，而不只看最坏', '每天记录一件还算顺利的小事，训练大脑接收积极信号'],
      en: ['List evidence for and against the worst outcome — which side is stronger?', 'Write out "most likely" and "best case," not just worst case', 'Record one small thing that went okay each day to train your brain to receive positive signals']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'support', label: '支持的证据', placeholder: '写下支持最坏结果的理由…' },
          { id: 'against', label: '不支持的证据', placeholder: '写下不支持最坏结果的理由…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'likely', label: '最可能', placeholder: '最可能发生的情况…' },
          { id: 'best', label: '最好', placeholder: '最好的情况…' }
        ]},
        { layout: 'single', fields: [
          { id: 'goodthing', label: '今天一件顺利的小事', placeholder: '今天发生的一件还算顺利的事…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'support', label: 'Evidence supporting', placeholder: 'Reasons the worst might happen…' },
          { id: 'against', label: 'Evidence against', placeholder: 'Reasons the worst might not happen…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'likely', label: 'Most likely', placeholder: 'The most likely outcome…' },
          { id: 'best', label: 'Best case', placeholder: 'The best realistic outcome…' }
        ]},
        { layout: 'single', fields: [
          { id: 'goodthing', label: 'One small thing that went okay today', placeholder: 'Something that went okay today…' }
        ]}
      ]
    },
    reframe: { zh: '列出支持/不支持最坏结果的证据；考虑「最可能」而非「最坏」结果。', en: 'List evidence for/against the worst case; consider "most likely" not "worst".' }
  },
  {
    id: 'anticipatory',
    zh: {
      name: '预期焦虑',
      desc: '对未来事件过度提前担忧',
      scenario: '面试还有一周，你已经连续几晚失眠，反复想象被问倒的场景。',
      definition: '在事件真正发生之前，大脑就开始「预演灾难」，把想象中的困难当成正在发生的现实。时间被焦虑占满，却未必转化为有效准备。'
    },
    en: {
      name: 'Anticipatory Anxiety',
      desc: 'Excessive advance worry about future events',
      scenario: 'A week before an interview, you lose sleep replaying scenarios of being stumped.',
      definition: 'Before an event even happens, your brain rehearses disasters and treats imagined difficulty as if it\'s already real. Time gets consumed by worry without necessarily turning into useful preparation.'
    },
    referenceStrategies: {
      zh: ['把担忧写下来，标出哪些能准备、哪些只能等待', '设定每天固定的「担心时间」，其余时间推迟处理', '回到当下：做一件与准备相关的具体小事'],
      en: ['Write worries down; mark what you can prepare vs. what you must wait for', 'Set a daily "worry time" and postpone the rest', 'Return to now: do one concrete small prep action']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'prepare', label: '能准备的部分', placeholder: '我可以提前准备什么…' },
          { id: 'wait', label: '只能等待的部分', placeholder: '我无法控制、只能等待什么…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'worrytime', label: '每天「担心时间」', placeholder: '例如：晚上 7:00–7:15' },
          { id: 'postpone', label: '其余时间推迟的担忧', placeholder: '先记下来，到担心时间再处理…' }
        ]},
        { layout: 'single', fields: [
          { id: 'prepaction', label: '一件与准备相关的具体小事', placeholder: '现在就能做的一小步…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'prepare', label: 'What I can prepare', placeholder: 'What I can do in advance…' },
          { id: 'wait', label: 'What I must wait for', placeholder: 'What I cannot control yet…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'worrytime', label: 'Daily "worry time"', placeholder: 'e.g. 7:00–7:15 PM' },
          { id: 'postpone', label: 'Worries to postpone', placeholder: 'Note them; handle at worry time…' }
        ]},
        { layout: 'single', fields: [
          { id: 'prepaction', label: 'One concrete prep action', placeholder: 'One small step I can take now…' }
        ]}
      ]
    },
    reframe: { zh: '设定「担心时间」；区分可控（准备）与不可控（结果）部分。', en: 'Set "worry time"; separate controllable (prep) from uncontrollable (outcome).' }
  },
  {
    id: 'perfectionism',
    zh: {
      name: '完美主义',
      desc: '过高标准，害怕犯错',
      scenario: '报告改了八版仍不满意，截止日期临近却迟迟不愿提交。',
      definition: '内心有一套极高的标准，认为「不够完美 = 失败」。害怕暴露瑕疵，于是拖延、反复修改，或干脆不开始——完美成了行动的敌人。'
    },
    en: {
      name: 'Perfectionism',
      desc: 'Excessively high standards, fear of mistakes',
      scenario: 'You\'ve revised a report eight times, deadline near, but won\'t submit.',
      definition: 'An internal bar set impossibly high — "not perfect = failure." Fear of flaws leads to procrastination, endless revisions, or never starting. Perfection becomes the enemy of action.'
    },
    referenceStrategies: {
      zh: ['先定义「足够好」的标准，而不是完美标准', '设定时间上限：到点就用当前版本', '完成一个小版本再迭代，而非从零追求满分'],
      en: ['Define "good enough" before aiming for perfect', 'Set a time cap — ship the current version when time\'s up', 'Complete a small version first, then iterate — don\'t chase 100% from zero']
    },
    strategyPanels: {
      zh: [
        { layout: 'single', fields: [
          { id: 'goodenough', label: '「足够好」的标准', placeholder: '什么程度算可以接受、可以提交…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'timelimit', label: '时间上限', placeholder: '到几点必须停止修改…' },
          { id: 'shipversion', label: '到点提交的版本', placeholder: '到点时就用当前这一版…' }
        ]},
        { layout: 'single', fields: [
          { id: 'mvp', label: '先完成的最小版本', placeholder: '最小可行、先交出去的一版…' }
        ]}
      ],
      en: [
        { layout: 'single', fields: [
          { id: 'goodenough', label: '"Good enough" standard', placeholder: 'What level is acceptable to submit…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'timelimit', label: 'Time cap', placeholder: 'When I must stop revising…' },
          { id: 'shipversion', label: 'Version to ship at deadline', placeholder: 'Use whatever exists at that time…' }
        ]},
        { layout: 'single', fields: [
          { id: 'mvp', label: 'Minimum version to complete first', placeholder: 'Smallest shippable version…' }
        ]}
      ]
    },
    reframe: { zh: '设定「足够好」标准；采用 80/20 原则，完成优于完美。', en: 'Set "good enough" standards; 80/20 rule — done beats perfect.' }
  },
  {
    id: 'catastrophizing',
    zh: {
      name: '小题大做',
      desc: '将小问题放大为灾难',
      scenario: '老板回复「我们需要谈谈」，你立刻想到会被解雇，整晚无法入睡。',
      definition: '从一个小的触发点，大脑快速串联出一连串最坏后果，仿佛灾难已经确定。中间步骤被跳过，概率和证据往往没有被认真评估。'
    },
    en: {
      name: 'Catastrophizing',
      desc: 'Magnifying small issues into disasters',
      scenario: 'Boss says "We need to talk" — you immediately assume firing and can\'t sleep.',
      definition: 'From a small trigger, the brain chains together worst outcomes as if disaster is certain. Middle steps get skipped; probability and evidence often aren\'t seriously weighed.'
    },
    referenceStrategies: {
      zh: ['问：「这件事实际发生的概率有多大？」用 0–100% 估计', '列出至少三种其他可能的解释', '即使最坏发生，写下「我可以怎么应对」'],
      en: ['Ask: "What\'s the actual probability?" Estimate 0–100%', 'List at least three alternative explanations', 'Even if worst happens, write "how would I cope?"']
    },
    strategyPanels: {
      zh: [
        { layout: 'single', fields: [
          { id: 'probability', label: '实际发生概率（0–100%）', placeholder: '我估计的概率是…%' }
        ]},
        { layout: 'stack', fields: [
          { id: 'alt1', label: '其他可能解释 ①', placeholder: '第一种可能…' },
          { id: 'alt2', label: '其他可能解释 ②', placeholder: '第二种可能…' },
          { id: 'alt3', label: '其他可能解释 ③', placeholder: '第三种可能…' }
        ]},
        { layout: 'single', fields: [
          { id: 'cope', label: '即使最坏发生，我可以怎么应对', placeholder: '我可以采取的行动…' }
        ]}
      ],
      en: [
        { layout: 'single', fields: [
          { id: 'probability', label: 'Actual probability (0–100%)', placeholder: 'I estimate…%' }
        ]},
        { layout: 'stack', fields: [
          { id: 'alt1', label: 'Alternative explanation ①', placeholder: 'First possibility…' },
          { id: 'alt2', label: 'Alternative explanation ②', placeholder: 'Second possibility…' },
          { id: 'alt3', label: 'Alternative explanation ③', placeholder: 'Third possibility…' }
        ]},
        { layout: 'single', fields: [
          { id: 'cope', label: 'Even if worst happens, how would I cope?', placeholder: 'Actions I could take…' }
        ]}
      ]
    },
    reframe: { zh: '问：「实际发生的概率有多大？」列出其他可能解释。', en: 'Ask: "What\'s the actual probability?" List alternative explanations.' }
  },
  {
    id: 'mindReading',
    zh: {
      name: '读心术',
      desc: '假设知道他人负面想法',
      scenario: '同事会议中沉默，你确信是因为觉得你能力差，但从未核实。',
      definition: '在没有足够证据的情况下，假定自己知道别人怎么想——而且往往假定是负面的。猜测被当成事实，直接沟通或验证的步骤被省略。'
    },
    en: {
      name: 'Mind Reading',
      desc: 'Assuming you know others\' negative thoughts',
      scenario: 'A colleague is quiet in a meeting — you\'re sure they think you\'re incompetent, never verified.',
      definition: 'Without enough evidence, you assume you know what others think — usually something negative. Guesses become facts; direct check-ins or verification get skipped.'
    },
    referenceStrategies: {
      zh: ['分两栏：「我确定知道的」vs「我在猜测的」', '找一个合适时机直接问，而非在脑中演绎', '提醒自己：他人注意力多半在自己身上'],
      en: ['Two columns: "what I know" vs. "what I\'m guessing"', 'Ask directly when appropriate instead of mental stories', 'Remind yourself: others\' attention is mostly on themselves']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'know', label: '我确定知道的', placeholder: '有证据支持的事实…' },
          { id: 'guess', label: '我在猜测的', placeholder: '没有证实的猜测…' }
        ]},
        { layout: 'single', fields: [
          { id: 'ask', label: '找一个合适时机直接问', placeholder: '我可以怎么问、问什么…' }
        ]},
        { layout: 'single', fields: [
          { id: 'remind', label: '提醒自己：他人注意力多半在自己身上', placeholder: '写一句提醒自己的话…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'know', label: 'What I know for sure', placeholder: 'Facts with evidence…' },
          { id: 'guess', label: 'What I\'m guessing', placeholder: 'Unverified assumptions…' }
        ]},
        { layout: 'single', fields: [
          { id: 'ask', label: 'Ask directly when appropriate', placeholder: 'What I could ask, and how…' }
        ]},
        { layout: 'single', fields: [
          { id: 'remind', label: 'Remind myself: others focus on themselves', placeholder: 'A sentence to remind myself…' }
        ]}
      ]
    },
    reframe: { zh: '区分事实与猜测；必要时直接沟通验证。', en: 'Separate facts from guesses; verify through direct communication.' }
  },
  {
    id: 'overgeneralizing',
    zh: {
      name: '过度概括',
      desc: '从单一事件得出广泛结论',
      scenario: '一次约会不顺利，你想「我永远不会找到合适的人」。',
      definition: '一次经历被放大成「总是」「从不」「每次」的全局结论。个别事件代替了整体图景，反例被自动忽略。'
    },
    en: {
      name: 'Overgeneralizing',
      desc: 'Broad conclusions from single events',
      scenario: 'One bad date → "I\'ll never find the right person."',
      definition: 'One experience gets blown up into global "always," "never," or "every time" conclusions. A single event replaces the big picture; counterexamples get ignored.'
    },
    referenceStrategies: {
      zh: ['把「总是/从不」改成具体次数或情境', '主动找一个不符合结论的反例', '用「这次」代替「永远」来表述'],
      en: ['Replace "always/never" with specific times or situations', 'Actively find one counterexample', 'Say "this time" instead of "forever"']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'general', label: '原来的「总是/从不」说法', placeholder: '例如：我永远不会…' },
          { id: 'specific', label: '改成具体次数或情境', placeholder: '例如：这次约会、最近三次…' }
        ]},
        { layout: 'single', fields: [
          { id: 'counter', label: '一个不符合结论的反例', placeholder: '什么时候结论不成立…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'forever', label: '「永远/总是」的表述', placeholder: '原来的绝对化说法…' },
          { id: 'thistime', label: '改成「这次」', placeholder: '仅指这一次的情况…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'general', label: 'Original "always/never" statement', placeholder: 'e.g. I will never…' },
          { id: 'specific', label: 'Specific times or situation', placeholder: 'e.g. this date, last three times…' }
        ]},
        { layout: 'single', fields: [
          { id: 'counter', label: 'One counterexample', placeholder: 'When the conclusion doesn\'t hold…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'forever', label: '"Forever/always" wording', placeholder: 'The absolute statement…' },
          { id: 'thistime', label: 'Rephrase as "this time"', placeholder: 'Only about this one occasion…' }
        ]}
      ]
    },
    reframe: { zh: '用具体语言替代「总是/从不」；寻找反例。', en: 'Replace "always/never" with specifics; find counterexamples.' }
  },
  {
    id: 'shouldStatements',
    zh: {
      name: '应该思维',
      desc: '僵化的「应该/必须」规则',
      scenario: '「我应该总是保持高效」，休息时有强烈内疚感。',
      definition: '用僵化的「应该」「必须」要求自己或他人，一旦达不到就产生内疚、愤怒或压力。这些规则很少被审视，却牢牢支配着情绪。'
    },
    en: {
      name: 'Should Statements',
      desc: 'Rigid "should/must" rules',
      scenario: '"I should always be productive" — strong guilt when resting.',
      definition: 'Rigid "should" and "must" rules for yourself or others — falling short triggers guilt, anger, or pressure. These rules are rarely examined but strongly drive emotions.'
    },
    referenceStrategies: {
      zh: ['把「我应该」改成「我选择」或「我希望」', '问：这条规则是谁定的？还适用吗？', '对朋友会用的语气，同样用在自己身上'],
      en: ['Change "I should" to "I choose" or "I prefer"', 'Ask: who made this rule? Does it still apply?', 'Use the same kind tone you\'d offer a friend']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'should', label: '原来的「我应该」', placeholder: '我应该…' },
          { id: 'choose', label: '改成「我选择」或「我希望」', placeholder: '我选择… / 我希望…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'whomade', label: '这条规则是谁定的？', placeholder: '谁、什么时候定的…' },
          { id: 'stillapply', label: '还适用吗？', placeholder: '现在的情况是否仍适用…' }
        ]},
        { layout: 'single', fields: [
          { id: 'friendtone', label: '对朋友会用的语气', placeholder: '我会对朋友说什么…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'should', label: 'Original "I should"', placeholder: 'I should…' },
          { id: 'choose', label: 'Change to "I choose" / "I prefer"', placeholder: 'I choose… / I prefer…' }
        ]},
        { layout: 'two-col', fields: [
          { id: 'whomade', label: 'Who made this rule?', placeholder: 'Who, and when…' },
          { id: 'stillapply', label: 'Does it still apply?', placeholder: 'Does it fit my situation now…' }
        ]},
        { layout: 'single', fields: [
          { id: 'friendtone', label: 'Tone I\'d use with a friend', placeholder: 'What I\'d say to a friend…' }
        ]}
      ]
    },
    reframe: { zh: '将「我应该」改为「我选择/我希望」。', en: 'Change "I should" to "I choose / I prefer".' }
  },
  {
    id: 'emotionalReasoning',
    zh: {
      name: '情绪推理',
      desc: '因为感到焦虑就认为危险真实',
      scenario: '心跳加快就认定身体出了严重问题，忽略其他解释。',
      definition: '因为强烈感受到某种情绪（尤其是恐惧），就推断外部情况一定同样危险。「感觉如此，便是如此」——感受代替了证据。'
    },
    en: {
      name: 'Emotional Reasoning',
      desc: 'Anxiety feelings = proof of danger',
      scenario: 'Heart racing means something is seriously wrong — ignoring other explanations.',
      definition: 'Because you feel a strong emotion (especially fear), you conclude the outside situation must be equally dangerous. "I feel it, so it must be true" — feelings replace evidence.'
    },
    referenceStrategies: {
      zh: ['写一句：「我感到…，但事实是…」', '用身体活动（散步、呼吸）先降低唤醒，再评估', '问自己：如果没有这份感受，我会怎么判断？'],
      en: ['Write: "I feel…, but the facts are…"', 'Use body activity (walk, breathe) to lower arousal before judging', 'Ask: without this feeling, how would I assess this?']
    },
    strategyPanels: {
      zh: [
        { layout: 'two-col', fields: [
          { id: 'feel', label: '我感到…', placeholder: '我现在的感受…' },
          { id: 'fact', label: '但事实是…', placeholder: '客观事实或证据…' }
        ]},
        { layout: 'single', fields: [
          { id: 'bodyact', label: '先做的身体活动（散步、呼吸等）', placeholder: '例如：慢走 5 分钟、4-7-8 呼吸…' }
        ]},
        { layout: 'single', fields: [
          { id: 'withoutfeel', label: '如果没有这份感受，我会怎么判断？', placeholder: '更中性的判断…' }
        ]}
      ],
      en: [
        { layout: 'two-col', fields: [
          { id: 'feel', label: 'I feel…', placeholder: 'What I\'m feeling…' },
          { id: 'fact', label: 'But the facts are…', placeholder: 'Objective facts or evidence…' }
        ]},
        { layout: 'single', fields: [
          { id: 'bodyact', label: 'Body activity first (walk, breathe…)', placeholder: 'e.g. 5-min walk, 4-7-8 breathing…' }
        ]},
        { layout: 'single', fields: [
          { id: 'withoutfeel', label: 'Without this feeling, how would I judge?', placeholder: 'A more neutral assessment…' }
        ]}
      ]
    },
    reframe: { zh: '提醒自己：感受是信号，不一定是事实；用客观证据检验。', en: 'Feelings are signals, not facts; test with objective evidence.' }
  }
];

const PATTERN_THRESHOLD = 7;

const PMR_PARTS = [
  {
    id: 'forehead',
    zh: { name: '前额', tighten: '皱起额头，尽量把眉毛向中间挤。', relax: '让额头完全舒展开，感受皮肤变得平滑。' },
    en: { name: 'Forehead', tighten: 'Frown and draw your eyebrows together.', relax: 'Let your forehead smooth out completely.' }
  },
  {
    id: 'mouth',
    zh: { name: '嘴部', tighten: '咬紧牙关，双唇用力抿在一起。', relax: '让下巴自然垂落，嘴唇微微分开。' },
    en: { name: 'Mouth', tighten: 'Clench your jaw and press your lips together.', relax: 'Let your jaw drop slightly; part your lips gently.' }
  },
  {
    id: 'neck',
    zh: { name: '颈部', tighten: '头微微后仰，绷紧颈前和颈后的肌肉。', relax: '让头回到正中，感受颈部重量自然下垂。' },
    en: { name: 'Neck', tighten: 'Tilt your head back slightly and tense your neck muscles.', relax: 'Return your head to center; feel the neck soften.' }
  },
  {
    id: 'shoulders',
    zh: { name: '肩部', tighten: '尽量把双肩耸向耳朵，保持用力。', relax: '让肩膀完全下沉，手臂自然垂落。' },
    en: { name: 'Shoulders', tighten: 'Raise your shoulders toward your ears and hold.', relax: 'Drop your shoulders completely; let arms hang loose.' }
  },
  {
    id: 'biceps',
    zh: { name: '二头肌', tighten: '弯曲手臂，用力绷紧二头肌。', relax: '伸直手臂，让二头肌完全放松。' },
    en: { name: 'Biceps', tighten: 'Bend your arms and tense your biceps hard.', relax: 'Straighten your arms and release the tension.' }
  },
  {
    id: 'chestAbdomen',
    zh: { name: '胸腹', tighten: '深吸气，绷紧胸部和腹部肌肉。', relax: '缓缓呼气，让胸腹随呼吸完全放松。' },
    en: { name: 'Chest & abdomen', tighten: 'Take a deep breath in and tighten chest and belly.', relax: 'Exhale slowly and let chest and abdomen soften.' }
  },
  {
    id: 'glutes',
    zh: { name: '臀部', tighten: '收紧臀部和大腿后侧肌肉。', relax: '让臀部完全放松，感受坐垫或椅面的支撑。' },
    en: { name: 'Glutes', tighten: 'Squeeze your glutes and the backs of your thighs.', relax: 'Release completely; feel support from the seat.' }
  },
  {
    id: 'thighs',
    zh: { name: '大腿', tighten: '绷直双腿，收紧大腿前侧肌肉。', relax: '让大腿完全放松，腿部变得沉重。' },
    en: { name: 'Thighs', tighten: 'Straighten legs and tense the front of your thighs.', relax: 'Let your thighs go heavy and loose.' }
  },
  {
    id: 'calves',
    zh: { name: '小腿', tighten: '脚尖朝向自己，绷紧小腿肌肉。', relax: '让小腿和脚完全放松。' },
    en: { name: 'Calves', tighten: 'Pull toes toward you and tense your calves.', relax: 'Release calves and feet completely.' }
  },
  {
    id: 'feet',
    zh: { name: '足部', tighten: '尽量卷曲脚趾，绷紧脚掌。', relax: '让脚趾自然舒展，感受与地面或鞋底的接触。' },
    en: { name: 'Feet', tighten: 'Curl your toes and tense the soles of your feet.', relax: 'Uncurl toes; notice contact with the ground.' }
  }
];

const CALM_CHECKLISTS = [
  { id: 'sleepChecklist', itemsKey: 'sleepChecklistItems' },
  { id: 'exerciseChecklist', itemsKey: 'exerciseChecklistItems' },
  { id: 'dietChecklist', itemsKey: 'dietChecklistItems' }
];

const BRAIN_REGIONS = {
  amygdala: {
    zh: { title: '杏仁核 — 情绪报警中心', desc: '杏仁核是大脑的「烟雾探测器」，快速标记威胁并触发战斗/逃跑/僵住反应。' },
    en: { title: 'Amygdala — Emotional Alarm', desc: 'The amygdala is the brain\'s "smoke detector," rapidly flagging threats and triggering fight/flight/freeze.' }
  },
  cortex: {
    zh: { title: '前额叶皮层 — 评估与调节中心', desc: '负责理性评估、计划、决策和情绪调节，可抑制杏仁核过度反应。' },
    en: { title: 'Prefrontal Cortex — Evaluation & Regulation', desc: 'Handles rational assessment, planning, decisions, and inhibiting amygdala overreactions.' }
  },
  thalamus: {
    zh: { title: '丘脑 — 感觉信息中转站', desc: '接收感官信息，同时向杏仁核（快车道）和皮层（慢车道）分流。' },
    en: { title: 'Thalamus — Sensory Relay', desc: 'Receives sensory input and routes it simultaneously to amygdala (fast) and cortex (slow).' }
  },
  hippocampus: {
    zh: { title: '海马体 — 情境记忆与背景', desc: '提供「以前遇到过吗？」的上下文，帮助皮层判断当前威胁是否真实、是否与以往经验相符。' },
    en: { title: 'Hippocampus — Context & Memory', desc: 'Provides "have we been here before?" context, helping the cortex judge if the threat is real and familiar.' }
  }
};

const BRAIN_PATHWAYS = {
  amygdala: {
    regions: ['thalamus', 'amygdala'],
    zh: {
      title: '杏仁核通道（快车道）',
      timing: '反应时间 ~12 毫秒',
      desc: '感觉信息从丘脑直连杏仁核，绕过详细分析，迅速触发全身警报。',
      physio: ['心跳骤升、呼吸加快', '肌肉瞬间紧绷，准备战斗或逃跑', '注意力窄化，只聚焦威胁', '消化、免疫等系统暂时抑制'],
      strategies: ['暂停 6 秒，让皮层有时间介入', '4-7-8 呼吸法降低唤醒', '5-4-3-2-1 grounding 回到当下', '事后复盘：「实际发生了什么？」']
    },
    en: {
      title: 'Amygdala Pathway (Fast Lane)',
      timing: 'Response time ~12ms',
      desc: 'Sensory input goes thalamus → amygdala directly, bypassing analysis — a full-body alarm in milliseconds.',
      physio: ['Heart rate surges, breathing accelerates', 'Muscles instantly tense for fight or flight', 'Attention narrows to the threat only', 'Digestion, immunity temporarily suppressed'],
      strategies: ['Pause 6 seconds to let cortex engage', '4-7-8 breathing to lower arousal', '5-4-3-2-1 grounding to return to present', 'Afterward: "What actually happened?"']
    }
  },
  cortex: {
    regions: ['thalamus', 'cortex', 'hippocampus', 'amygdala'],
    zh: {
      title: '皮层通道（慢车道）',
      timing: '反应时间 ~300 毫秒',
      desc: '信息经丘脑到前额叶皮层，海马体提供情境记忆，皮层评估后再调节杏仁核反应。',
      physio: ['唤醒水平较温和、可调节', '可进行复杂思考和计划', '情绪反应可被「重新校准」', '身体保持一定灵活性，非极端 fight/flight'],
      strategies: ['认知重评：「还有其他解释吗？」', '激活海马体：「上次类似情况结果如何？」', '前额叶训练：正念、冥想、延迟反应', '把焦虑能量导向具体行动步骤']
    },
    en: {
      title: 'Cortex Pathway (Slow Lane)',
      timing: 'Response time ~300ms',
      desc: 'Input goes thalamus → prefrontal cortex; hippocampus adds context; cortex then regulates the amygdala.',
      physio: ['Moderate, regulatable arousal', 'Complex thinking and planning possible', 'Emotional response can be "recalibrated"', 'Body stays flexible — not extreme fight/flight'],
      strategies: ['Cognitive reframe: "What other explanations exist?"', 'Activate hippocampus: "What happened last time?"', 'PFC training: mindfulness, meditation, delay response', 'Channel anxiety energy into concrete action steps']
    }
  }
};

function buildMatrix(lang) {
  const isZh = lang === 'zh';
  const goals = ['low', 'medium', 'high'];
  const anxieties = ['low', 'anxietyLow', 'optimal', 'anxietyOptimal', 'high', 'anxietyHigh'];
  const cells = {};

  const data = {
    'low-low': {
      optimal: false,
      zh: { title: '日常任务 × 焦虑过低', text: '缺乏必要关注，可能拖延或准备不足。可适度提升对任务重要性的认知，设定小截止日期制造合理紧迫感。' },
      en: { title: 'Routine × Too Low', text: 'Lacking necessary attention; may procrastinate or under-prepare. Raise awareness of task importance; set mini-deadlines for healthy urgency.' }
    },
    'low-optimal': {
      optimal: true,
      zh: { title: '日常任务 × 最佳焦虑 ✓', text: '理想状态：足够关注但不消耗。保持现有节奏，用清单和小目标维持轻量动力。' },
      en: { title: 'Routine × Optimal ✓', text: 'Ideal: enough attention without drain. Maintain rhythm; use checklists and small goals for light motivation.' }
    },
    'low-high': {
      optimal: false,
      zh: { title: '日常任务 × 焦虑过高', text: '资源浪费：小事消耗过多精力。练习「这有多重要？」的评估；用呼吸/grounding 降低唤醒；重新框架：「这不需要我全部注意力。」' },
      en: { title: 'Routine × Too High', text: 'Resource waste: small tasks drain too much energy. Ask "How important is this?"; use breathing/grounding; reframe: "This doesn\'t need my full attention."' }
    },
    'medium-low': {
      optimal: false,
      zh: { title: '重要目标 × 焦虑过低', text: '可能低估挑战，准备不足。可视化截止日期；分解任务；想象完成后的影响以增强动机。' },
      en: { title: 'Important × Too Low', text: 'May underestimate the challenge. Visualize deadlines; break down tasks; imagine impact of completion to boost motivation.' }
    },
    'medium-optimal': {
      optimal: true,
      zh: { title: '重要目标 × 最佳焦虑 ✓', text: 'Yerkes-Dodson 最佳点：焦虑转化为专注与行动。将能量导向具体步骤，而非反刍。' },
      en: { title: 'Important × Optimal ✓', text: 'Yerkes-Dodson sweet spot: anxiety becomes focus and action. Channel energy into concrete steps, not rumination.' }
    },
    'medium-high': {
      optimal: false,
      zh: { title: '重要目标 × 焦虑过高', text: '可能因完美主义或灾难化而瘫痪。用「足够好」标准；先完成最小可行版本；限制准备时间。' },
      en: { title: 'Important × Too High', text: 'May paralyze due to perfectionism or catastrophizing. Use "good enough" standards; ship a minimum viable version; cap prep time.' }
    },
    'high-low': {
      optimal: false,
      zh: { title: '关键目标 × 焦虑过低', text: '对高风险情境缺乏应有警觉。认真评估后果；寻求他人反馈；制定应急方案以增强准备度。' },
      en: { title: 'Critical × Too Low', text: 'Lacking appropriate alertness for high-stakes situations. Assess consequences seriously; seek feedback; create contingency plans.' }
    },
    'high-optimal': {
      optimal: true,
      zh: { title: '关键目标 × 最佳焦虑 ✓', text: '高风险情境中的理想唤醒：警觉但不恐慌。聚焦可控因素；预演关键步骤；信任准备过程。' },
      en: { title: 'Critical × Optimal ✓', text: 'Ideal arousal for high-stakes: alert but not panicked. Focus on controllables; rehearse key steps; trust your preparation.' }
    },
    'high-high': {
      optimal: false,
      zh: { title: '关键目标 × 焦虑过高', text: '高重要性 + 高焦虑 = 决策质量下降。暂停、呼吸、grounding；寻求支持；区分「准备」与「反刍」。' },
      en: { title: 'Critical × Too High', text: 'High importance + high anxiety = impaired decisions. Pause, breathe, ground; seek support; separate "preparation" from "rumination".' }
    }
  };

  return { goals, data };
}

const state = {
  lang: 'zh',
  currentSection: 1,
  signalStep: null,
  brainPathway: null,
  goalSlider: 5,
  anxietySlider: 5,
  patternScores: Object.fromEntries(PATTERNS.map(p => [p.id, 0])),
  matrixSelection: null,
  boardMode: null,
  boardPatternId: null,
  boardData: null,
  boardSnapshotData: null,
  patternBoardState: null,
  snapshotCategory: null,
  snapshotCatRows: null,
  snapshotCatPrevLang: null,
  useStepTexts: null,
  useStepPrevLang: null,
  exposureExampleData: null,
  amygdalaPrevLang: null,
  snapshotResponses: [],
  lastSnapshotData: null,
  lastPatternSnapshotData: null,
  signalUserEdited: { trigger: false, body: false, meaning: false, action: false },
  signalLastDefault: { trigger: '', body: '', meaning: '', action: '' },
  signalExpanded: { trigger: false, body: false, meaning: false, action: false },
  homeFocus: null,
  scanStep: 0,
  scanAnswers: {}
};

const els = {};

function initEls() {
  [
    'viewHome', 'viewLecture', 'enterLectureBtn', 'resetStartBtn', 'langToggle', 'backHomeBtn',
    'signalScan', 'scanStepCount', 'scanProgressText', 'scanFeedback', 'scanStage', 'scanQuestion', 'scanOptions',
    'scanResult', 'scanResultGrid', 'restartScanBtn', 'saveScanBtn',
    'sectionNav', 'positiveList', 'negativeList', 'patternsGrid', 'goalMatrix', 'matrixBody',
    'matrixDetail', 'matrixDetailTitle', 'matrixDetailDesc', 'useStepsGrid',
    'brainInfoTitle', 'brainInfoDesc', 'brainDiagram',
    'presenterPanel', 'presenterToggle', 'closePresenterPanel',
    'presenterCaseInput', 'presenterPattern', 'presenterSection', 'presenterShowBtn', 'presenterClearBtn',
    'displayBoard', 'closeDisplayBoard', 'displayBoardInner', 'displayLabel', 'displayTitle', 'displayQuote', 'displayMeta', 'displayAction',
    'myGoalInput',
    'signalFlow', 'signalAccordions',
    'goalSlider', 'anxietySlider', 'goalSliderVal', 'anxietySliderVal',
    'yerkesMatchBadge', 'yerkesOptimalRange', 'yerkesDelta',
    'cortexInteractive',
    'generatePatternSnapshotBtn', 'patternSnapshotResult', 'patternSnapshotContent', 'projectPatternSnapshotBtn',
    'pathwayDetail', 'pathwayTiming', 'pathwayPhysio', 'pathwayStrategy', 'brainSvg',
    'amygdalaInteractive',
    'triggerMapAnxiety', 'triggerMapAnxietyVal', 'exposureLevel', 'exposureLevelVal',
    'distressLevel', 'distressLevelVal',
    'exposureExamplesGrid',
    'displaySimpleMode', 'displayPatternMode', 'displayPatternCase', 'displaySnapshotMode', 'snapshotDisplayContent',
    'displayPatternSnapshotMode', 'patternSnapshotDisplayContent',
    'boardStrategyList', 'boardSuggestionsList', 'addSuggestionBtn',
    'toggleStrategiesBtn', 'boardStrategiesWrap',
    'snapshotEvent', 'snapshotLevel', 'snapshotLevelVal',
    'generateSnapshotBtn', 'snapshotResult', 'snapshotResultContent', 'projectSnapshotBtn',
    'snapshotCatPanels',
    'breathCircle', 'breathPhase', 'breathCountdown', 'breathStartBtn', 'breathPauseBtn',
    'pmrChecklist', 'pmrPartName', 'pmrTightenText', 'pmrRelaxText', 'pmrCountdown', 'pmrCountdownWrap', 'pmrStartBtn', 'pmrPauseBtn'
  ].forEach(id => { els[id] = document.getElementById(id); });
}

function t(key) {
  return I18N[state.lang][key];
}

function applyI18n() {
  const lang = state.lang;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang][key]) el.placeholder = I18N[lang][key];
    else if (key === 'casePlaceholder') el.placeholder = I18N[lang].casePlaceholder;
  });

  document.querySelectorAll('[data-i18n-svg]').forEach(el => {
    const key = el.getAttribute('data-i18n-svg');
    if (I18N[lang][key]) el.textContent = I18N[lang][key];
  });

  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  renderSignalScan();

  renderCompareLists();
  renderPatterns();
  renderMatrix();
  updateYerkesUI();
  syncUseStepTextsLang();
  renderUseSteps();
  if (state.matrixSelection) updateMatrixDetail(state.matrixSelection);
  populatePresenterPatterns();
  updateSelectOptions();
  syncSignalTextDefaults();
  syncSnapshotCatRowsLang();
  renderAllCategoryPanels();
  syncAmygdalaFormDefaults();
  syncSafePlaceDefault();
  if (state.brainPathway) selectBrainPathway(state.brainPathway, false);
  if (state.boardMode === 'pattern' && state.boardPatternId) {
    renderPatternBoard(state.boardPatternId);
  }
  if (state.boardMode === 'snapshot' && state.boardSnapshotData) {
    renderSnapshotBoard(state.boardSnapshotData);
  }
  if (state.lastSnapshotData) renderSnapshotResult(state.lastSnapshotData);
  if (state.lastPatternSnapshotData) renderPatternSnapshotResult(state.lastPatternSnapshotData);
  if (state.boardMode === 'patternSnapshot' && state.lastPatternSnapshotData) {
    renderPatternSnapshotBoard(state.lastPatternSnapshotData);
  }
  if (breathRuntime.running && els.breathPhase) {
    els.breathPhase.textContent = t(breathRuntime.phase === 'inhale' ? 'breathInhale' : 'breathExhale');
  }
  renderCalmChecklists();
  renderPMR();
}

const SIGNAL_STEP_KEYS = ['trigger', 'body', 'meaning', 'action'];
const SIGNAL_DEFAULT_I18N = {
  trigger: 'signalDefaultTrigger',
  body: 'signalDefaultBody',
  meaning: 'signalDefaultMeaning',
  action: 'signalDefaultAction'
};

function syncSignalTextDefaults() {
  SIGNAL_STEP_KEYS.forEach(step => {
    const ta = document.querySelector(`.signal-edit-input[data-step="${step}"]`);
    if (!ta) return;
    const defaultVal = t(SIGNAL_DEFAULT_I18N[step]);
    const unchanged = !state.signalUserEdited[step]
      || ta.value === state.signalLastDefault[step];
    if (unchanged) {
      ta.value = defaultVal;
      state.signalUserEdited[step] = false;
    }
    state.signalLastDefault[step] = defaultVal;
  });
}

function toggleSignalField(step) {
  const panel = document.querySelector(`.signal-accordion-panel[data-step="${step}"]`);
  const btn = els.signalFlow?.querySelector(`[data-step="${step}"]`);
  if (!panel || !btn) return;
  const willShow = panel.hidden;
  panel.hidden = !willShow;
  state.signalExpanded[step] = willShow;
  btn.classList.toggle('active', willShow);
  btn.setAttribute('aria-expanded', willShow ? 'true' : 'false');
  if (willShow) panel.querySelector('textarea')?.focus();
}

function bindSignalNodes() {
  els.signalFlow.querySelectorAll('.signal-node').forEach(btn => {
    btn.addEventListener('click', () => toggleSignalField(btn.dataset.step));
  });
  document.querySelectorAll('.signal-edit-input').forEach(ta => {
    ta.addEventListener('input', () => {
      state.signalUserEdited[ta.dataset.step] = true;
    });
  });
}

function updateSelectOptions() {
  const lang = state.lang;
  const sel = document.getElementById('presenterSection');
  if (!sel) return;
  const val = sel.value;
  ['nav1', 'nav2', 'nav3', 'nav4'].forEach((key, i) => {
    if (sel.options[i]) sel.options[i].textContent = I18N[lang][key];
  });
  sel.value = val;
}

function computeYerkesDodson(goal, anxiety) {
  const optimalCenter = 1.2 + goal * 0.68;
  const tolerance = 1.3;
  const rangeLo = Math.max(0, Math.round(optimalCenter - tolerance));
  const rangeHi = Math.min(10, Math.round(optimalCenter + tolerance));

  let anxietyLevel;
  if (anxiety < rangeLo) anxietyLevel = 'low';
  else if (anxiety > rangeHi) anxietyLevel = 'high';
  else anxietyLevel = 'optimal';

  let goalLevel;
  if (goal <= 3) goalLevel = 'low';
  else if (goal <= 7) goalLevel = 'medium';
  else goalLevel = 'high';

  const key = `${goalLevel}-${anxietyLevel}`;
  const delta = anxiety - optimalCenter;

  return { goalLevel, anxietyLevel, key, optimalCenter, rangeLo, rangeHi, delta, tolerance };
}

function renderCompareLists() {
  const lang = state.lang;
  if (els.positiveList) els.positiveList.innerHTML = I18N[lang].positiveItems.map(item => `<li>${item}</li>`).join('');
  if (els.negativeList) els.negativeList.innerHTML = I18N[lang].negativeItems.map(item => `<li>${item}</li>`).join('');
}

function renderPatterns() {
  const lang = state.lang;
  els.patternsGrid.innerHTML = PATTERNS.map((p) => {
    const loc = p[lang];
    const score = state.patternScores[p.id] ?? 0;
    const high = score >= PATTERN_THRESHOLD;
    const scenarioText = getPatternScenario(p.id);
    return `
      <article class="pattern-card card" data-pattern="${p.id}">
        <div class="pattern-header">
          <h3 class="pattern-name">${loc.name}</h3>
          <p class="pattern-def">${loc.definition}</p>
        </div>
        <div class="pattern-edit-row">
          <label class="pattern-case-cell">
            <span class="pattern-case-label">${t('scenarioLabel')}</span>
            <textarea class="pattern-scenario-input" data-pattern="${p.id}" rows="4" placeholder="${t('scenarioPlaceholder')}">${escapeHtml(scenarioText)}</textarea>
          </label>
          <div class="pattern-slider-cell pattern-slider-block${high ? ' high-threshold' : ''}" data-pattern="${p.id}">
            <div class="pattern-slider-header">
              <span>${t('patternIntensity')}</span>
              <span class="pattern-slider-val" data-val="${p.id}">${score}</span>
            </div>
            <input type="range" class="range-input pattern-score-slider" data-pattern="${p.id}" min="0" max="10" step="1" value="${score}">
            <div class="slider-ticks-row"><span>0</span><span>5</span><span>${PATTERN_THRESHOLD}+</span><span>10</span></div>
          </div>
        </div>
        <div class="pattern-actions">
        </div>
      </article>`;
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getDefaultScenario(id) {
  const p = PATTERNS.find(x => x.id === id);
  return p ? p[state.lang].scenario : '';
}

function getPatternScenario(id) {
  if (patternScenarios[id] !== undefined) return patternScenarios[id];
  return getDefaultScenario(id);
}

function savePatternScenario(id, text) {
  patternScenarios[id] = text.trim() || getDefaultScenario(id);
}

function createPatternBoardState() {
  return {
    expandedStrategy: null,
    strategies: {},
    suggestions: [],
    strategiesVisible: false
  };
}

function getStrategyState(pb, idx) {
  if (!pb.strategies[idx]) pb.strategies[idx] = { crossed: false, fields: {} };
  if (!pb.strategies[idx].fields) pb.strategies[idx].fields = {};
  return pb.strategies[idx];
}

function renderStrategyFields(panel, idx, st) {
  const layoutClass = panel.layout === 'two-col' ? 'board-fields-two-col' : 'board-fields-stack';
  const fieldsHtml = panel.fields.map(f => {
    const val = st.fields[f.id] || '';
    return `
      <label class="board-field">
        <span class="board-field-label">${escapeHtml(f.label)}</span>
        <textarea class="board-field-input" data-idx="${idx}" data-field="${f.id}" rows="2" placeholder="${escapeHtml(f.placeholder)}">${escapeHtml(val)}</textarea>
      </label>`;
  }).join('');
  return `<div class="${layoutClass}">${fieldsHtml}</div>`;
}

function updateStrategiesToggleBtn() {
  const pb = getPatternBoardState();
  if (!els.toggleStrategiesBtn) return;
  els.toggleStrategiesBtn.textContent = pb.strategiesVisible ? t('hideReferenceStrategies') : t('showReferenceStrategies');
}

function toggleBoardStrategiesVisible() {
  const pb = getPatternBoardState();
  pb.strategiesVisible = !pb.strategiesVisible;
  renderPatternBoard(state.boardPatternId);
}

function getPatternBoardState() {
  if (!state.patternBoardState) state.patternBoardState = createPatternBoardState();
  return state.patternBoardState;
}

function showPatternBoard(patternId) {
  const p = PATTERNS.find(x => x.id === patternId);
  if (!p) return;

  state.boardMode = 'pattern';
  state.boardPatternId = patternId;
  state.boardSnapshotData = null;
  state.patternBoardState = loadPatternBoardState(patternId);

  els.displaySimpleMode.hidden = true;
  els.displayPatternMode.hidden = false;
  els.displaySnapshotMode.hidden = true;
  els.displayPatternSnapshotMode.hidden = true;
  els.displayBoardInner?.classList.remove('display-board-inner--snapshot', 'display-board-inner--pattern-snapshot');
  els.displayBoard.hidden = false;
  document.body.style.overflow = 'hidden';

  renderPatternBoard(patternId);
}

function renderPatternBoard(patternId) {
  const p = PATTERNS.find(x => x.id === patternId);
  if (!p) return;
  const scenario = getPatternScenario(patternId);
  const strategies = p.referenceStrategies[state.lang];
  const panels = p.strategyPanels[state.lang];
  const pb = getPatternBoardState();

  els.displayPatternCase.textContent = scenario ? `「${scenario}」` : '';

  renderBoardSuggestions();
  updateStrategiesToggleBtn();

  if (els.boardStrategiesWrap) {
    els.boardStrategiesWrap.hidden = !pb.strategiesVisible;
  }

  if (!pb.strategiesVisible) {
    if (els.boardStrategyList) els.boardStrategyList.innerHTML = '';
    return;
  }

  els.boardStrategyList.innerHTML = strategies.map((text, idx) => {
    const st = getStrategyState(pb, idx);
    const panel = panels[idx];
    const expanded = pb.expandedStrategy === idx;
    return `
      <div class="board-strategy-item${expanded ? ' expanded' : ''}" data-idx="${idx}">
        <button type="button" class="board-strategy-toggle" aria-expanded="${expanded}">
          <span class="board-strategy-num">${idx + 1}</span>
          <span class="board-strategy-text">${escapeHtml(text)}</span>
          <span class="board-strategy-chevron">▼</span>
        </button>
        <div class="board-strategy-panel" ${expanded ? '' : 'hidden'}>
          <p class="board-panel-label">${t('originalThought')}</p>
          <p class="board-original-thought${st.crossed ? ' struck' : ''}" data-idx="${idx}" role="button" tabindex="0">${escapeHtml(scenario)}</p>
          ${renderStrategyFields(panel, idx, st)}
        </div>
      </div>`;
  }).join('');
}

function renderBoardSuggestions() {
  const pb = getPatternBoardState();
  if (pb.suggestions.length === 0) {
    els.boardSuggestionsList.innerHTML = `<li class="board-suggestions-empty">${t('suggestionsEmpty')}</li>`;
    return;
  }
  els.boardSuggestionsList.innerHTML = pb.suggestions.map((text, i) => `
    <li class="board-suggestion-item" data-idx="${i}">
      <span class="board-suggestion-num">${i + 1}.</span>
      <input type="text" class="board-suggestion-input" data-idx="${i}" value="${escapeHtml(text)}">
      <button type="button" class="board-suggestion-delete" data-idx="${i}" aria-label="Delete">×</button>
    </li>`).join('');
}

function toggleBoardStrategy(idx) {
  const pb = getPatternBoardState();
  pb.expandedStrategy = pb.expandedStrategy === idx ? null : idx;
  renderPatternBoard(state.boardPatternId);
}

function toggleBoardOriginalCrossed(idx) {
  const pb = getPatternBoardState();
  const st = getStrategyState(pb, idx);
  st.crossed = !st.crossed;
  const el = els.boardStrategyList.querySelector(`.board-original-thought[data-idx="${idx}"]`);
  if (el) el.classList.toggle('struck', st.crossed);
}

function addBoardSuggestion() {
  const pb = getPatternBoardState();
  pb.suggestions.push('');
  renderBoardSuggestions();
  const inputs = els.boardSuggestionsList.querySelectorAll('.board-suggestion-input');
  inputs[inputs.length - 1]?.focus();
}

function removeBoardSuggestion(idx) {
  const pb = getPatternBoardState();
  pb.suggestions.splice(idx, 1);
  renderBoardSuggestions();
}

const patternScenarios = {};
const patternStrategyResponses = {};

function loadPatternBoardState(patternId) {
  const saved = patternStrategyResponses[patternId];
  if (!saved) return createPatternBoardState();
  return {
    expandedStrategy: saved.expandedStrategy ?? null,
    strategies: JSON.parse(JSON.stringify(saved.strategies || {})),
    suggestions: [...(saved.suggestions || [])],
    strategiesVisible: saved.strategiesVisible ?? false
  };
}

function persistPatternBoardState(patternId) {
  if (!patternId || !state.patternBoardState) return;
  const pb = state.patternBoardState;
  patternStrategyResponses[patternId] = {
    expandedStrategy: pb.expandedStrategy,
    strategies: JSON.parse(JSON.stringify(pb.strategies)),
    suggestions: [...pb.suggestions],
    strategiesVisible: pb.strategiesVisible
  };
}

function getPatternStrategyResponseText(patternId) {
  const saved = patternStrategyResponses[patternId];
  if (!saved?.strategies) return '';
  const p = PATTERNS.find(x => x.id === patternId);
  if (!p) return '';
  const panels = p.strategyPanels[state.lang];
  const parts = [];
  panels.forEach((panel, idx) => {
    const st = saved.strategies[idx];
    if (!st?.fields) return;
    panel.fields.forEach(f => {
      const val = (st.fields[f.id] || '').trim();
      if (val) parts.push(`${f.label}：${val}`);
    });
  });
  return parts.join('\n');
}

function getPatternAlternativeText(patternId) {
  const userText = getPatternStrategyResponseText(patternId);
  if (userText) return userText;
  const p = PATTERNS.find(x => x.id === patternId);
  return p ? p.reframe[state.lang] : '';
}

function setPatternScore(id, val) {
  state.patternScores[id] = val;
  const block = els.patternsGrid.querySelector(`.pattern-slider-block[data-pattern="${id}"]`);
  const valEl = els.patternsGrid.querySelector(`.pattern-slider-val[data-val="${id}"]`);
  if (valEl) valEl.textContent = val;
  if (block) block.classList.toggle('high-threshold', val >= PATTERN_THRESHOLD);
  if (state.lastPatternSnapshotData && !els.patternSnapshotResult?.hidden) {
    state.lastPatternSnapshotData = collectPatternSnapshotData();
    renderPatternSnapshotResult(state.lastPatternSnapshotData);
  }
}

function collectPatternSnapshotData() {
  const lang = state.lang;
  return PATTERNS.map(p => {
    const loc = p[lang];
    return {
      id: p.id,
      name: loc.name,
      score: state.patternScores[p.id] ?? 0,
      scenario: getPatternScenario(p.id),
      reframe: getPatternAlternativeText(p.id)
    };
  });
}

function getPatternScoreClass(score) {
  if (score >= PATTERN_THRESHOLD) return 'high';
  if (score >= 5) return 'mid';
  return 'low';
}

function renderPatternSnapshotResult(data) {
  if (!els.patternSnapshotContent) return;
  els.patternSnapshotContent.innerHTML = data.map(item => {
    const scoreClass = getPatternScoreClass(item.score);
    const scorePct = (item.score / 10) * 100;
    return `
      <article class="pattern-snapshot-item${item.score >= PATTERN_THRESHOLD ? ' pattern-snapshot-item--flagged' : ''}">
        <div class="pattern-snapshot-item-head">
          <h4 class="pattern-snapshot-item-name">${escapeHtml(item.name)}</h4>
          <span class="pattern-snapshot-score pattern-snapshot-score--${scoreClass}">${item.score}/10</span>
        </div>
        <div class="pattern-snapshot-score-bar">
          <div class="pattern-snapshot-score-fill pattern-snapshot-score-fill--${scoreClass}" style="width:${scorePct}%"></div>
        </div>
        ${item.scenario ? `<p class="pattern-snapshot-scenario">「${escapeHtml(item.scenario)}」</p>` : ''}
        <p class="pattern-snapshot-alt"><strong>${escapeHtml(t('patternAltLabel'))}：</strong>${escapeHtml(item.reframe)}</p>
      </article>`;
  }).join('');
  if (els.patternSnapshotResult) {
    els.patternSnapshotResult.hidden = false;
    els.patternSnapshotResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function renderPatternSnapshotBoard(data) {
  if (!els.patternSnapshotDisplayContent) return;
  els.patternSnapshotDisplayContent.innerHTML = `
    <p class="pattern-snapshot-display-label">${escapeHtml(t('patternSnapshotCardTitle'))}</p>
    <div class="pattern-snapshot-display-grid">
      ${data.map(item => {
        const scoreClass = getPatternScoreClass(item.score);
        const scorePct = (item.score / 10) * 100;
        return `
          <article class="pattern-snapshot-display-item${item.score >= PATTERN_THRESHOLD ? ' flagged' : ''}">
            <div class="pattern-snapshot-display-head">
              <h3 class="pattern-snapshot-display-name">${escapeHtml(item.name)}</h3>
              <div class="pattern-snapshot-display-score">
                <span class="pattern-snapshot-display-score-num score-${scoreClass}">${item.score}</span>
                <span class="pattern-snapshot-display-score-label">${escapeHtml(t('patternSeverityLabel'))}</span>
              </div>
            </div>
            <div class="pattern-snapshot-display-bar-track">
              <div class="pattern-snapshot-display-bar-fill score-${scoreClass}" style="width:${scorePct}%"></div>
            </div>
            ${item.scenario ? `<p class="pattern-snapshot-display-scenario">「${escapeHtml(item.scenario)}」</p>` : ''}
            <div class="pattern-snapshot-display-alt">
              <span class="pattern-snapshot-display-alt-label">${escapeHtml(t('patternAltLabel'))}</span>
              <p>${escapeHtml(item.reframe)}</p>
            </div>
          </article>`;
      }).join('')}
    </div>`;
}

function showPatternSnapshotBoard(data) {
  state.boardMode = 'patternSnapshot';
  state.boardSnapshotData = null;
  state.boardPatternId = null;

  els.displayPatternMode.hidden = true;
  els.displaySimpleMode.hidden = true;
  els.displaySnapshotMode.hidden = true;
  els.displayPatternSnapshotMode.hidden = false;
  els.displayBoardInner?.classList.add('display-board-inner--pattern-snapshot');

  renderPatternSnapshotBoard(data);
  els.displayBoard.hidden = false;
  document.body.style.overflow = 'hidden';
}

function generatePatternSnapshot() {
  const data = collectPatternSnapshotData();
  state.lastPatternSnapshotData = data;
  renderPatternSnapshotResult(data);
}

function projectPatternSnapshot() {
  if (!state.lastPatternSnapshotData) return;
  showPatternSnapshotBoard(state.lastPatternSnapshotData);
}

function updateYerkesUI() {
  const goal = state.goalSlider;
  const anxiety = state.anxietySlider;
  const yd = computeYerkesDodson(goal, anxiety);
  const lang = state.lang;
  const i18n = I18N[lang];

  if (els.goalSlider) els.goalSlider.value = goal;
  if (els.anxietySlider) els.anxietySlider.value = anxiety;
  if (els.goalSliderVal) els.goalSliderVal.textContent = goal;
  if (els.anxietySliderVal) els.anxietySliderVal.textContent = anxiety;

  const badge = els.yerkesMatchBadge;
  badge.className = 'yerkes-match-badge';
  if (yd.anxietyLevel === 'optimal') {
    badge.classList.add('match-optimal');
    badge.textContent = i18n.yerkesOptimal;
  } else if (yd.anxietyLevel === 'low') {
    badge.classList.add('match-low');
    badge.textContent = i18n.yerkesTooLow;
  } else {
    badge.classList.add('match-high');
    badge.textContent = i18n.yerkesTooHigh;
  }

  els.yerkesOptimalRange.textContent = i18n.yerkesRange(yd.rangeLo, yd.rangeHi);

  if (yd.anxietyLevel === 'optimal') {
    els.yerkesDelta.textContent = i18n.yerkesDeltaOptimal;
  } else if (yd.delta < 0) {
    els.yerkesDelta.textContent = i18n.yerkesDeltaLow(Math.abs(Math.round(yd.delta)));
  } else {
    els.yerkesDelta.textContent = i18n.yerkesDeltaHigh(Math.round(yd.delta));
  }

  state.matrixSelection = yd.key;
  renderMatrix();
  updateMatrixDetail(yd.key);
}

function renderMatrix() {
  const lang = state.lang;
  const { goals, data } = buildMatrix(lang);
  const goalLabels = [t('goalLow'), t('goalMedium'), t('goalHigh')];
  const anxKeys = ['low', 'optimal', 'high'];
  const anxLabels = [t('anxietyLow'), t('anxietyOptimal'), t('anxietyHigh')];
  const liveKey = state.matrixSelection;

  let html = '';
  goals.forEach((goal, gi) => {
    html += `<tr><td class="row-label">${goalLabels[gi]}</td>`;
    anxKeys.forEach(anx => {
      const key = `${goal}-${anx}`;
      const cell = data[key];
      const loc = cell[lang];
      const isOpt = cell.optimal;
      const isLive = liveKey === key;
      html += `<td class="matrix-cell${isOpt ? ' optimal' : ''}${isLive ? ' live selected' : ''}" data-key="${key}" title="${loc.text}">${isOpt ? '✓ ' : ''}${anxLabels[anxKeys.indexOf(anx)]}</td>`;
    });
    html += '</tr>';
  });
  els.matrixBody.innerHTML = html;

  els.matrixBody.querySelectorAll('.matrix-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      state.matrixSelection = cell.dataset.key;
      updateMatrixDetail(cell.dataset.key);
      renderMatrix();
    });
  });
}

function updateMatrixDetail(key) {
  const { data } = buildMatrix(state.lang);
  const cell = data[key];
  if (!cell) return;
  const loc = cell[state.lang];
  els.matrixDetailTitle.textContent = loc.title;
  els.matrixDetailDesc.textContent = loc.text;
}

function initUseStepTexts() {
  if (!state.useStepTexts) {
    state.useStepTexts = I18N[state.lang].useSteps.map(([title, desc]) => ({ title, desc }));
    state.useStepPrevLang = state.lang;
  }
}

function syncUseStepTextsLang() {
  if (!state.useStepTexts) return;
  const prevLang = state.useStepPrevLang || state.lang;
  if (prevLang === state.lang) return;

  const oldSteps = I18N[prevLang].useSteps;
  const newSteps = I18N[state.lang].useSteps;
  state.useStepTexts = state.useStepTexts.map((item, i) => {
    const old = oldSteps[i];
    const neu = newSteps[i];
    if (!old || !neu) return item;
    return {
      title: item.title === old[0] ? neu[0] : item.title,
      desc: item.desc === old[1] ? neu[1] : item.desc
    };
  });
  state.useStepPrevLang = state.lang;
}

function renderUseSteps() {
  if (!els.useStepsGrid) return;
  if (!state.useStepTexts) initUseStepTexts();

  els.useStepsGrid.innerHTML = state.useStepTexts.map((step, i) => `
    <article class="use-step-card">
      <span class="use-step-edit-icon" aria-hidden="true">✏️</span>
      <textarea class="use-step-title" data-idx="${i}" data-field="title" rows="1">${escapeHtml(step.title)}</textarea>
      <textarea class="use-step-desc" data-idx="${i}" data-field="desc" rows="2">${escapeHtml(step.desc)}</textarea>
    </article>
  `).join('');
}

function bindUseStepCards() {
  els.useStepsGrid?.addEventListener('input', e => {
    const ta = e.target.closest('.use-step-title, .use-step-desc');
    if (!ta || !state.useStepTexts) return;
    const idx = parseInt(ta.dataset.idx, 10);
    const field = ta.dataset.field;
    if (state.useStepTexts[idx] && (field === 'title' || field === 'desc')) {
      state.useStepTexts[idx][field] = ta.value;
    }
  });
}

function populatePresenterPatterns() {
  const lang = state.lang;
  const sel = els.presenterPattern;
  const val = sel.value;
  sel.innerHTML = `<option value="">${t('patternNone')}</option>` +
    PATTERNS.map(p => `<option value="${p.id}">${p[lang].name}</option>`).join('');
  sel.value = val;
}

function showView(name) {
  els.viewHome.classList.toggle('active', name === 'home');
  els.viewHome.hidden = name !== 'home';
  els.viewLecture.hidden = name !== 'lecture';
  if (name === 'lecture') els.viewLecture.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToSection(num) {
  if (state.currentSection === 3 && num !== 3) {
    pauseBreathPractice();
    pausePMRPractice();
  }
  state.currentSection = num;
  document.querySelectorAll('.lecture-section').forEach(sec => {
    const n = parseInt(sec.dataset.section, 10);
    sec.hidden = n !== num;
    sec.classList.toggle('active', n === num);
  });
  document.querySelectorAll('.section-tab[data-section]').forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.section, 10) === num);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showBoard({ label, title, quote, meta, action, actionLabel }) {
  state.boardMode = 'simple';
  state.boardData = { label, title, quote, meta, action, actionLabel };
  state.boardSnapshotData = null;

  els.displayPatternMode.hidden = true;
  els.displaySimpleMode.hidden = false;
  els.displaySnapshotMode.hidden = true;
  els.displayPatternSnapshotMode.hidden = true;
  els.displayBoardInner?.classList.remove('display-board-inner--snapshot', 'display-board-inner--pattern-snapshot');

  els.displayLabel.textContent = label;
  els.displayTitle.textContent = title;
  els.displayQuote.textContent = quote ? `「${quote}」` : '';
  els.displayMeta.textContent = meta || '';
  els.displayAction.textContent = action
    ? `${actionLabel ?? t('displayDiscussion')}：${action}`
    : '';
  els.displayBoard.hidden = false;
  document.body.style.overflow = 'hidden';
}

function hideBoard() {
  if (state.boardMode === 'pattern' && state.boardPatternId) {
    persistPatternBoardState(state.boardPatternId);
  }
  els.displayBoard.hidden = true;
  document.body.style.overflow = '';
  els.displaySnapshotMode.hidden = true;
  els.displayPatternSnapshotMode.hidden = true;
  els.displayBoardInner?.classList.remove('display-board-inner--snapshot', 'display-board-inner--pattern-snapshot');
  state.boardMode = null;
  state.boardPatternId = null;
  state.boardSnapshotData = null;
  state.patternBoardState = null;
}

function getAnxietyLevelClass(level) {
  if (level >= 8) return 'high';
  if (level >= 5) return 'mid';
  return 'low';
}

function renderSnapshotBoard(data) {
  const levelClass = getAnxietyLevelClass(data.level);
  const levelPct = (data.level / 10) * 100;

  const tagsHtml = data.responses.length
    ? data.responses.map(r =>
        `<span class="snapshot-display-tag">${escapeHtml(snapshotResponseLabel(r))}</span>`
      ).join('')
    : `<span class="snapshot-display-tag snapshot-display-tag--empty">${escapeHtml(t('snapshotNoDim'))}</span>`;

  const dimKeys = [
    ['trigger', 'signalTrigger'],
    ['body', 'signalBody'],
    ['meaning', 'signalMeaning'],
    ['action', 'signalAction']
  ];
  const dimCardsHtml = dimKeys.map(([key, i18nKey]) => {
    const val = data.dimensions[key] || t('snapshotNoDim');
    return `
      <article class="snapshot-display-dim-card">
        <h4 class="snapshot-display-dim-title">${escapeHtml(t(i18nKey))}</h4>
        <p class="snapshot-display-dim-text">${escapeHtml(val)}</p>
      </article>`;
  }).join('');

  els.snapshotDisplayContent.innerHTML = `
    <p class="snapshot-display-label">${escapeHtml(t('snapshotCardTitle'))}</p>
    <p class="snapshot-display-event">${escapeHtml(data.event)}</p>
    <div class="snapshot-display-row">
      <section class="snapshot-display-block snapshot-display-level-block">
        <h3 class="snapshot-display-block-title">${escapeHtml(t('snapshotLabelLevel'))}</h3>
        <div class="snapshot-display-level">
          <span class="snapshot-display-level-num level-${levelClass}">${data.level}</span>
          <div class="snapshot-display-level-bar-wrap">
            <div class="snapshot-display-bar-track">
              <div class="snapshot-display-bar-fill level-${levelClass}" style="width:${levelPct}%"></div>
            </div>
            <span class="snapshot-display-level-scale"><span>0</span><span>10</span></span>
          </div>
        </div>
      </section>
      <section class="snapshot-display-block snapshot-display-responses-block">
        <h3 class="snapshot-display-block-title">${escapeHtml(t('snapshotLabelResponses'))}</h3>
        <div class="snapshot-display-tags">${tagsHtml}</div>
      </section>
    </div>
    <section class="snapshot-display-dimensions">
      <h3 class="snapshot-display-section-title">${escapeHtml(t('snapshotLabelDimensions'))}</h3>
      <div class="snapshot-display-dim-grid">${dimCardsHtml}</div>
    </section>
  `;
}

function showSnapshotBoard(data) {
  state.boardMode = 'snapshot';
  state.boardSnapshotData = data;

  els.displayPatternMode.hidden = true;
  els.displaySimpleMode.hidden = true;
  els.displaySnapshotMode.hidden = false;
  els.displayPatternSnapshotMode.hidden = true;
  els.displayBoardInner?.classList.remove('display-board-inner--pattern-snapshot');
  els.displayBoardInner?.classList.add('display-board-inner--snapshot');

  renderSnapshotBoard(data);
  els.displayBoard.hidden = false;
  document.body.style.overflow = 'hidden';
}

const BREATH_PHASE_SEC = 12;
const breathRuntime = {
  running: false,
  phase: 'inhale',
  secondsLeft: BREATH_PHASE_SEC,
  phaseTimeout: null,
  tickInterval: null
};

function resetBreathVisual() {
  if (!els.breathCircle) return;
  els.breathCircle.classList.remove('breathing-in', 'breathing-out');
  els.breathCircle.style.animationPlayState = '';
  if (els.breathPhase) els.breathPhase.textContent = t('breathInhale');
  if (els.breathCountdown) els.breathCountdown.textContent = String(BREATH_PHASE_SEC);
}

function clearBreathTimers() {
  if (breathRuntime.phaseTimeout) {
    clearTimeout(breathRuntime.phaseTimeout);
    breathRuntime.phaseTimeout = null;
  }
  if (breathRuntime.tickInterval) {
    clearInterval(breathRuntime.tickInterval);
    breathRuntime.tickInterval = null;
  }
}

function applyBreathPhase(phase) {
  breathRuntime.phase = phase;
  breathRuntime.secondsLeft = BREATH_PHASE_SEC;
  if (els.breathPhase) {
    els.breathPhase.textContent = t(phase === 'inhale' ? 'breathInhale' : 'breathExhale');
  }
  if (els.breathCountdown) {
    els.breathCountdown.textContent = String(breathRuntime.secondsLeft);
  }
  if (els.breathCircle) {
    els.breathCircle.classList.remove('breathing-in', 'breathing-out');
    void els.breathCircle.offsetWidth;
    els.breathCircle.classList.add(phase === 'inhale' ? 'breathing-in' : 'breathing-out');
    els.breathCircle.style.animationPlayState = 'running';
  }
}

function scheduleBreathPhaseFlip() {
  breathRuntime.phaseTimeout = setTimeout(() => {
    if (!breathRuntime.running) return;
    applyBreathPhase(breathRuntime.phase === 'inhale' ? 'exhale' : 'inhale');
    scheduleBreathPhaseFlip();
  }, BREATH_PHASE_SEC * 1000);
}

function startBreathPractice() {
  clearBreathTimers();
  breathRuntime.running = true;
  applyBreathPhase('inhale');
  breathRuntime.tickInterval = setInterval(() => {
    if (!breathRuntime.running) return;
    if (breathRuntime.secondsLeft > 1) breathRuntime.secondsLeft -= 1;
    if (els.breathCountdown) {
      els.breathCountdown.textContent = String(breathRuntime.secondsLeft);
    }
  }, 1000);
  scheduleBreathPhaseFlip();
}

function pauseBreathPractice() {
  breathRuntime.running = false;
  clearBreathTimers();
  if (els.breathCircle) els.breathCircle.style.animationPlayState = 'paused';
}

function bindBreathPractice() {
  els.breathStartBtn?.addEventListener('click', startBreathPractice);
  els.breathPauseBtn?.addEventListener('click', pauseBreathPractice);
  resetBreathVisual();
}

const pmrRuntime = {
  stepIndex: 0,
  completed: new Set(),
  running: false,
  countdownInterval: null,
  secondsLeft: 5
};

const calmChecklistState = {};

function renderCalmChecklists() {
  CALM_CHECKLISTS.forEach(({ id, itemsKey }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const items = I18N[state.lang][itemsKey];
    if (!calmChecklistState[id] || calmChecklistState[id].length !== items.length) {
      const prev = calmChecklistState[id] || [];
      calmChecklistState[id] = items.map((_, i) => prev[i] || false);
    }
    el.innerHTML = items.map((text, i) => {
      const checked = calmChecklistState[id][i];
      return `
        <li class="calm-checklist-item${checked ? ' is-checked' : ''}">
          <label class="calm-checklist-label">
            <input type="checkbox" class="calm-checklist-input" data-list="${id}" data-idx="${i}"${checked ? ' checked' : ''}>
            <span class="calm-checklist-box" aria-hidden="true"></span>
            <span class="calm-checklist-text">${escapeHtml(text)}</span>
          </label>
        </li>`;
    }).join('');
  });
}

function clearPMRCountdown() {
  if (pmrRuntime.countdownInterval) {
    clearInterval(pmrRuntime.countdownInterval);
    pmrRuntime.countdownInterval = null;
  }
  els.pmrCountdownWrap?.classList.remove('is-finished');
}

function startPMRCountdown() {
  clearPMRCountdown();
  pmrRuntime.secondsLeft = 5;
  if (els.pmrCountdown) els.pmrCountdown.textContent = '5';
  if (els.pmrCountdownWrap) {
    els.pmrCountdownWrap.hidden = false;
    els.pmrCountdownWrap.classList.remove('is-finished');
  }
  pmrRuntime.countdownInterval = setInterval(() => {
    pmrRuntime.secondsLeft -= 1;
    if (els.pmrCountdown) {
      els.pmrCountdown.textContent = String(Math.max(pmrRuntime.secondsLeft, 0));
    }
    if (pmrRuntime.secondsLeft <= 0) {
      clearPMRCountdown();
      els.pmrCountdownWrap?.classList.add('is-finished');
      pmrRuntime.completed.add(pmrRuntime.stepIndex);
      renderPMRList();
    }
  }, 1000);
}

function updatePMRPanel() {
  const part = PMR_PARTS[pmrRuntime.stepIndex];
  if (!part) return;
  const loc = part[state.lang];
  if (els.pmrPartName) els.pmrPartName.textContent = loc.name;
  if (els.pmrTightenText) els.pmrTightenText.textContent = loc.tighten;
  if (els.pmrRelaxText) els.pmrRelaxText.textContent = loc.relax;
  if (els.pmrCountdownWrap && !pmrRuntime.running) {
    els.pmrCountdownWrap.classList.remove('is-finished');
    if (els.pmrCountdown) els.pmrCountdown.textContent = '5';
  }
}

function renderPMRList() {
  if (!els.pmrChecklist) return;
  els.pmrChecklist.innerHTML = PMR_PARTS.map((part, i) => {
    const loc = part[state.lang];
    const done = pmrRuntime.completed.has(i);
    const current = i === pmrRuntime.stepIndex;
    return `
      <li>
        <button type="button" class="pmr-part-btn${done ? ' is-done' : ''}${current ? ' is-current' : ''}" data-step="${i}">
          <span class="pmr-check-box${done ? ' is-checked' : ''}" aria-hidden="true"></span>
          <span class="pmr-check-label">${escapeHtml(loc.name)}</span>
          <span class="pmr-check-hint">${escapeHtml(t('pmrStepHint'))}</span>
        </button>
      </li>`;
  }).join('');
}

function selectPMRPart(index) {
  if (index < 0 || index >= PMR_PARTS.length) return;
  pmrRuntime.stepIndex = index;
  updatePMRPanel();
  renderPMRList();
  if (pmrRuntime.running) startPMRCountdown();
}

function startPMRPractice() {
  pmrRuntime.running = true;
  updatePMRPanel();
  startPMRCountdown();
}

function pausePMRPractice() {
  pmrRuntime.running = false;
  clearPMRCountdown();
}

function renderPMR() {
  renderPMRList();
  updatePMRPanel();
}

function bindCalmSection() {
  els.pmrStartBtn?.addEventListener('click', startPMRPractice);
  els.pmrPauseBtn?.addEventListener('click', pausePMRPractice);
  els.pmrChecklist?.addEventListener('click', e => {
    const btn = e.target.closest('.pmr-part-btn');
    if (!btn) return;
    selectPMRPart(parseInt(btn.dataset.step, 10));
  });
  document.getElementById('safePlaceInput')?.addEventListener('input', () => {
    state.safePlaceEdited = true;
  });
  document.getElementById('sectionCalm')?.addEventListener('change', e => {
    if (!e.target.classList.contains('calm-checklist-input')) return;
    const listId = e.target.dataset.list;
    const idx = parseInt(e.target.dataset.idx, 10);
    if (!calmChecklistState[listId] || Number.isNaN(idx)) return;
    calmChecklistState[listId][idx] = e.target.checked;
    e.target.closest('.calm-checklist-item')?.classList.toggle('is-checked', e.target.checked);
  });
}

function openAppModule(moduleKey) {
  const modules = {
    brainRoutes: { target: 'brainRoutesModule' },
    thinkingPatterns: { target: 'thinkingPatternsModule', pathway: 'cortex' },
    triggerMap: { target: 'triggerMapModule', pathway: 'amygdala' },
    breathPractice: { target: 'breathPractice' },
    safePlace: { target: 'safePlaceModule' },
    pmrPractice: { target: 'pmrPractice' },
    calmGuides: { target: 'calmGuidesModule' },
    goalMatch: { target: 'yerkesPanel' },
    goalMatrix: { target: 'goalMatrixModule' },
    useSteps: { target: 'useStepsModule' }
  };
  const config = modules[moduleKey];
  if (!config) return;

  document.querySelectorAll('.app-module-card').forEach(card => {
    card.classList.toggle('active', card.dataset.openModule === moduleKey);
  });

  if (config.pathway) selectBrainPathway(config.pathway, false);

  window.setTimeout(() => {
    const target = document.getElementById(config.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function bindAppModulePickers() {
  document.querySelectorAll('[data-open-module]').forEach(btn => {
    btn.addEventListener('click', () => openAppModule(btn.dataset.openModule));
  });
}

function bindBrainRegions() {
  els.brainDiagram.querySelectorAll('.brain-region').forEach(region => {
    region.addEventListener('click', () => selectBrainRegion(region.dataset.region));
    region.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectBrainRegion(region.dataset.region);
      }
    });
  });

  document.querySelectorAll('.pathway-btn').forEach(btn => {
    btn.addEventListener('click', () => selectBrainPathway(btn.dataset.pathway));
  });
}

function updatePathwayInteractiveSections(pathway) {
  if (els.amygdalaInteractive) els.amygdalaInteractive.hidden = pathway !== 'amygdala';
  if (els.cortexInteractive) els.cortexInteractive.hidden = pathway !== 'cortex';
}

function updateAmygdalaInteractiveVisibility(show) {
  updatePathwayInteractiveSections(show ? 'amygdala' : null);
}

function initExposureExampleData() {
  if (!state.exposureExampleData) {
    state.exposureExampleData = I18N[state.lang].exposureExampleColumns.map(col => ({ ...col }));
    state.amygdalaPrevLang = state.lang;
  }
}

function syncTriggerMapDefaults() {
  const fields = [
    ['triggerNegativeEvent', 'triggerDefaultNegative', 'negative'],
    ['triggerSpontaneous', 'triggerDefaultSpontaneous', 'spontaneous'],
    ['triggerLearnedDefense', 'triggerDefaultLearned', 'learned']
  ];
  if (!state.triggerMapEdited) state.triggerMapEdited = {};
  if (!state.triggerMapLastDefault) state.triggerMapLastDefault = {};

  fields.forEach(([id, i18nKey, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const defaultVal = t(i18nKey);
    const unchanged = !state.triggerMapEdited[key] || el.value === state.triggerMapLastDefault[key];
    if (unchanged) {
      el.value = defaultVal;
      state.triggerMapEdited[key] = false;
    }
    state.triggerMapLastDefault[key] = defaultVal;
  });
}

function syncExposureUserDefaults() {
  const targetEl = document.getElementById('exposureTarget');
  const planEl = document.getElementById('exposurePlan');
  if (!state.exposureUserEdited) state.exposureUserEdited = {};
  if (!state.exposureUserLastDefault) state.exposureUserLastDefault = {};

  const targetDefault = t('exposureDefaultTarget');
  const planDefault = t('exposureDefaultPlan');

  if (targetEl) {
    const unchanged = !state.exposureUserEdited.target
      || targetEl.value === state.exposureUserLastDefault.target;
    if (unchanged) {
      targetEl.value = targetDefault;
      state.exposureUserEdited.target = false;
    }
    state.exposureUserLastDefault.target = targetDefault;
  }
  if (planEl) {
    const unchanged = !state.exposureUserEdited.plan
      || planEl.value === state.exposureUserLastDefault.plan;
    if (unchanged) {
      planEl.value = planDefault;
      state.exposureUserEdited.plan = false;
    }
    state.exposureUserLastDefault.plan = planDefault;
  }
}

function syncExposureExampleDataLang() {
  if (!state.exposureExampleData) return;
  const prevLang = state.amygdalaPrevLang || state.lang;
  if (prevLang === state.lang) return;

  const oldCols = I18N[prevLang].exposureExampleColumns;
  const newCols = I18N[state.lang].exposureExampleColumns;
  state.exposureExampleData = state.exposureExampleData.map((col, i) => {
    const oldC = oldCols[i];
    const newC = newCols[i];
    if (!oldC || !newC) return col;
    return {
      target: col.target === oldC.target ? newC.target : col.target,
      plan: col.plan === oldC.plan ? newC.plan : col.plan,
      exposure: col.exposure,
      distress: col.distress
    };
  });
  state.amygdalaPrevLang = state.lang;
}

function renderExposureExampleColumns() {
  if (!els.exposureExamplesGrid) return;
  initExposureExampleData();

  const labels = I18N[state.lang].exposureStepLabels;
  els.exposureExamplesGrid.innerHTML = state.exposureExampleData.map((col, i) => `
    <article class="exposure-example-col">
      <span class="exposure-step-badge">${escapeHtml(labels[i] || `Step ${i + 1}`)}</span>
      <label class="exposure-ex-field field-label">
        <span>${escapeHtml(t('exposureTarget'))}</span>
        <textarea class="input-field exposure-ex-input amygdala-editable-example" data-col="${i}" data-field="target" rows="2">${escapeHtml(col.target)}</textarea>
      </label>
      <label class="exposure-ex-field field-label">
        <span>${escapeHtml(t('exposurePlan'))}</span>
        <textarea class="input-field exposure-ex-input amygdala-editable-example" data-col="${i}" data-field="plan" rows="2">${escapeHtml(col.plan)}</textarea>
      </label>
      <div class="exposure-ex-levels">
        <label class="exposure-ex-level-field">
          <span>${escapeHtml(t('exposureLevel'))}</span>
          <input type="number" class="input-field exposure-ex-level amygdala-editable-example" data-col="${i}" data-field="exposure" min="0" max="10" value="${col.exposure}">
        </label>
        <label class="exposure-ex-level-field">
          <span>${escapeHtml(t('distressLevel'))}</span>
          <input type="number" class="input-field exposure-ex-level amygdala-editable-example" data-col="${i}" data-field="distress" min="0" max="10" value="${col.distress}">
        </label>
      </div>
    </article>
  `).join('');
}

function syncSafePlaceDefault() {
  const el = document.getElementById('safePlaceInput');
  if (!el) return;
  const defaultVal = t('safePlaceDefault');
  if (state.safePlaceEdited === undefined) state.safePlaceEdited = false;
  if (state.safePlaceLastDefault === undefined) state.safePlaceLastDefault = '';
  const unchanged = !state.safePlaceEdited || el.value === state.safePlaceLastDefault;
  if (unchanged) {
    el.value = defaultVal;
    state.safePlaceEdited = false;
  }
  state.safePlaceLastDefault = defaultVal;
}

function syncAmygdalaFormDefaults() {
  syncTriggerMapDefaults();
  syncExposureUserDefaults();
  syncExposureExampleDataLang();
  renderExposureExampleColumns();
}

function bindAmygdalaSliders() {
  [
    ['triggerMapAnxiety', 'triggerMapAnxietyVal'],
    ['exposureLevel', 'exposureLevelVal'],
    ['distressLevel', 'distressLevelVal']
  ].forEach(([sliderId, valId]) => {
    const slider = document.getElementById(sliderId);
    const valEl = document.getElementById(valId);
    if (!slider || !valEl) return;
    slider.addEventListener('input', () => {
      valEl.textContent = slider.value;
    });
  });

  const triggerFields = [
    ['triggerNegativeEvent', 'negative'],
    ['triggerSpontaneous', 'spontaneous'],
    ['triggerLearnedDefense', 'learned']
  ];
  triggerFields.forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener('input', () => {
      if (!state.triggerMapEdited) state.triggerMapEdited = {};
      state.triggerMapEdited[key] = true;
    });
  });

  document.getElementById('exposureTarget')?.addEventListener('input', () => {
    if (!state.exposureUserEdited) state.exposureUserEdited = {};
    state.exposureUserEdited.target = true;
  });
  document.getElementById('exposurePlan')?.addEventListener('input', () => {
    if (!state.exposureUserEdited) state.exposureUserEdited = {};
    state.exposureUserEdited.plan = true;
  });

  els.exposureExamplesGrid?.addEventListener('input', e => {
    const ta = e.target.closest('.exposure-ex-input');
    const num = e.target.closest('.exposure-ex-level');
    const el = ta || num;
    if (!el || !state.exposureExampleData) return;
    const col = parseInt(el.dataset.col, 10);
    const field = el.dataset.field;
    if (state.exposureExampleData[col] && field) {
      state.exposureExampleData[col][field] = field === 'target' || field === 'plan'
        ? el.value
        : Math.min(10, Math.max(0, parseInt(el.value, 10) || 0));
    }
  });
}

function selectBrainPathway(pathway, scrollInfo = true) {
  state.brainPathway = pathway;
  const data = BRAIN_PATHWAYS[pathway][state.lang];
  const svg = els.brainSvg;

  document.querySelectorAll('.pathway-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pathway === pathway);
  });

  if (svg) {
    svg.querySelectorAll('.flow-path').forEach(p => p.classList.remove('flow-active'));
    svg.querySelectorAll(`.flow-path.path-${pathway}`).forEach(p => p.classList.add('flow-active'));
    svg.querySelectorAll('.brain-region').forEach(r => {
      r.classList.remove('region-active', 'region-amygdala-active');
    });
    BRAIN_PATHWAYS[pathway].regions.forEach(reg => {
      const el = svg.querySelector(`[data-region="${reg}"]`);
      if (el) {
        el.classList.add('region-active');
        if (reg === 'amygdala') el.classList.add('region-amygdala-active');
      }
    });
  }

  els.brainInfoTitle.textContent = data.title;
  els.brainInfoDesc.textContent = data.desc;
  els.pathwayDetail.hidden = false;
  els.pathwayTiming.textContent = data.timing;
  els.pathwayPhysio.innerHTML = data.physio.map(s => `<li>${s}</li>`).join('');
  els.pathwayStrategy.innerHTML = data.strategies.map(s => `<li>${s}</li>`).join('');
  updatePathwayInteractiveSections(pathway);
}

function selectBrainRegion(key) {
  const info = BRAIN_REGIONS[key][state.lang];
  els.brainInfoTitle.textContent = info.title;
  els.brainInfoDesc.textContent = info.desc;
  els.pathwayDetail.hidden = true;
  updatePathwayInteractiveSections(null);
  document.querySelectorAll('.pathway-btn').forEach(b => b.classList.remove('active'));
  const svg = els.brainSvg;
  if (svg) {
    svg.querySelectorAll('.flow-path').forEach(p => p.classList.remove('flow-active'));
    svg.querySelectorAll('.brain-region').forEach(r => {
      r.classList.toggle('region-active', r.dataset.region === key);
      r.classList.toggle('region-amygdala-active', r.dataset.region === key && key === 'amygdala');
    });
  }
}

function resetBrainInfo() {
  state.brainPathway = null;
  els.brainInfoTitle.textContent = t('brainDefaultTitle');
  els.brainInfoDesc.textContent = t('brainDefaultDesc');
  els.pathwayDetail.hidden = true;
  updatePathwayInteractiveSections(null);
  document.querySelectorAll('.pathway-btn').forEach(b => b.classList.remove('active'));
  const svg = els.brainSvg;
  if (svg) {
    svg.querySelectorAll('.flow-path').forEach(p => p.classList.remove('flow-active'));
    svg.querySelectorAll('.brain-region').forEach(r => {
      r.classList.remove('region-active', 'region-amygdala-active');
    });
  }
}

const SNAPSHOT_CATS = ['daily', 'relation', 'work'];

function initSnapshotCatRows() {
  if (!state.snapshotCatRows) {
    state.snapshotCatRows = {};
    SNAPSHOT_CATS.forEach(cat => {
      state.snapshotCatRows[cat] = [...I18N[state.lang].catSentences[cat]];
    });
    state.snapshotCatPrevLang = state.lang;
  }
  renderAllCategoryPanels();
}

function syncSnapshotCatRowsLang() {
  if (!state.snapshotCatRows) return;
  const prevLang = state.snapshotCatPrevLang || state.lang;
  if (prevLang === state.lang) return;

  SNAPSHOT_CATS.forEach(cat => {
    const oldDefaults = I18N[prevLang].catSentences[cat];
    const newDefaults = I18N[state.lang].catSentences[cat];
    state.snapshotCatRows[cat] = state.snapshotCatRows[cat].map((val, idx) => {
      if (idx < oldDefaults.length && val === oldDefaults[idx]) {
        return newDefaults[idx] ?? val;
      }
      return val;
    });
  });
  state.snapshotCatPrevLang = state.lang;
}

function renderCategoryPanel(cat) {
  const container = document.querySelector(`.snapshot-cat-rows[data-cat="${cat}"]`);
  if (!container || !state.snapshotCatRows?.[cat]) return;

  const rows = state.snapshotCatRows[cat];
  const canRemove = rows.length > 1;
  const removeLabel = escapeHtml(t('removeCatSentence'));

  container.innerHTML = rows.map((text, idx) => `
    <div class="snapshot-cat-row">
      <textarea class="input-field snapshot-cat-sentence" data-cat="${cat}" data-idx="${idx}" rows="2">${escapeHtml(text)}</textarea>
      <button type="button" class="snapshot-cat-remove-btn" data-cat="${cat}" data-idx="${idx}" aria-label="${removeLabel}"${canRemove ? '' : ' disabled'}>−</button>
    </div>
  `).join('');

  const addBtn = document.querySelector(`.snapshot-cat-add-btn[data-cat="${cat}"]`);
  if (addBtn) addBtn.setAttribute('aria-label', t('addCatSentence'));
}

function renderAllCategoryPanels() {
  if (!state.snapshotCatRows) return;
  SNAPSHOT_CATS.forEach(renderCategoryPanel);
}

function addCategoryRow(cat) {
  if (!state.snapshotCatRows) initSnapshotCatRows();
  state.snapshotCatRows[cat].push('');
  renderCategoryPanel(cat);
  const container = document.querySelector(`.snapshot-cat-rows[data-cat="${cat}"]`);
  container?.lastElementChild?.querySelector('textarea')?.focus();
}

function removeCategoryRow(cat, idx) {
  const rows = state.snapshotCatRows?.[cat];
  if (!rows || rows.length <= 1) return;
  rows.splice(idx, 1);
  renderCategoryPanel(cat);
}

function collectCategorySentences(cat) {
  if (!cat || !state.snapshotCatRows?.[cat]) return [];
  return state.snapshotCatRows[cat].map(s => s.trim()).filter(Boolean);
}

function handleSnapshotCategoryClick(cat) {
  const panel = document.querySelector(`.snapshot-cat-panel[data-cat="${cat}"]`);
  const btn = document.querySelector(`.snapshot-cat-btn[data-cat="${cat}"]`);
  if (!panel || !btn) return;

  const isOpen = !panel.hidden && state.snapshotCategory === cat;

  if (isOpen) {
    panel.hidden = true;
    btn.classList.remove('active');
    return;
  }

  document.querySelectorAll('.snapshot-cat-panel').forEach(p => { p.hidden = true; });
  document.querySelectorAll('.snapshot-cat-btn').forEach(b => b.classList.remove('active'));

  state.snapshotCategory = cat;
  panel.hidden = false;
  btn.classList.add('active');
  panel.querySelector('textarea')?.focus();
}

function collectSnapshotData() {
  const dims = {};
  document.querySelectorAll('.snapshot-dim-input').forEach(input => {
    dims[input.dataset.dim] = input.value.trim();
  });
  const category = state.snapshotCategory;
  return {
    event: els.snapshotEvent.value.trim(),
    category,
    categorySentences: collectCategorySentences(category),
    level: parseInt(els.snapshotLevel.value, 10),
    responses: [...state.snapshotResponses],
    dimensions: dims
  };
}

function snapshotCatLabel(key) {
  const map = { daily: 'catDaily', relation: 'catRelation', work: 'catWork' };
  return t(map[key] || 'catDaily');
}

function snapshotResponseLabel(key) {
  const map = { fight: 'responseFight', flee: 'responseFlee', freeze: 'responseFreeze' };
  return t(map[key] || key);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatSnapshotCategorySentences(data) {
  if (!data.categorySentences?.length) return t('snapshotNoDim');
  return data.categorySentences.join('\n');
}

function formatSnapshotDimensions(data) {
  const dimKeys = [
    ['trigger', 'signalTrigger'],
    ['body', 'signalBody'],
    ['meaning', 'signalMeaning'],
    ['action', 'signalAction']
  ];
  return dimKeys.map(([key, i18nKey]) => {
    const val = data.dimensions[key] || t('snapshotNoDim');
    return `${t(i18nKey)}：${val}`;
  }).join('\n');
}


function classifySnapshotAnxiety(data) {
  const drainingResponses = data.responses.includes('freeze') || data.responses.includes('flee');
  const highLoad = data.level >= 7;
  const actionBlocked = drainingResponses || (data.dimensions.action || '').length < 4;
  return highLoad || actionBlocked ? 'negative' : 'positive';
}

function revealSnapshotKnowledge(data) {
  const gate = document.getElementById('anxietyKnowledgeGate');
  if (!gate) return;
  const kind = classifySnapshotAnxiety(data);
  const positive = gate.querySelector('.compare-positive');
  const negative = gate.querySelector('.compare-negative');
  if (positive) positive.hidden = kind !== 'positive';
  if (negative) negative.hidden = kind !== 'negative';
  gate.hidden = false;
  gate.classList.toggle('knowledge-positive', kind === 'positive');
  gate.classList.toggle('knowledge-negative', kind === 'negative');
}

function renderSnapshotResult(data) {
  const levelClass = data.level >= 8 ? 'level-high' : 'level-mid';
  const responsesHtml = data.responses.length
    ? data.responses.map(r =>
        `<span class="snapshot-response-chip">${snapshotResponseLabel(r)}</span>`
      ).join('')
    : `<span class="snapshot-response-chip">${t('snapshotNoDim')}</span>`;

  const dimKeys = [
    ['trigger', 'signalTrigger'],
    ['body', 'signalBody'],
    ['meaning', 'signalMeaning'],
    ['action', 'signalAction']
  ];
  const dimsHtml = dimKeys.map(([key, i18nKey]) => {
    const val = data.dimensions[key] || t('snapshotNoDim');
    return `<div class="snapshot-dim-item"><dt>${t(i18nKey)}</dt><dd>${escapeHtml(val)}</dd></div>`;
  }).join('');

  const catSentencesHtml = data.categorySentences?.length
    ? `<ul class="snapshot-cat-sentences-list">${data.categorySentences.map(s =>
        `<li>${escapeHtml(s)}</li>`
      ).join('')}</ul>`
    : `<p class="snapshot-cat-sentences-empty">${t('snapshotNoDim')}</p>`;

  els.snapshotResultContent.innerHTML = `
    <p class="snapshot-card-event">「${escapeHtml(data.event)}」</p>
    <div class="snapshot-card-meta">
      <span class="snapshot-badge">${t('snapshotLabelCategory')}：${snapshotCatLabel(data.category)}</span>
      <span class="snapshot-badge ${levelClass}">${t('snapshotLabelLevel')}：${data.level}/10</span>
    </div>
    <p class="snapshot-step-label" style="margin-bottom:8px;font-size:0.8125rem">${t('snapshotLabelCategorySentences')}</p>
    ${catSentencesHtml}
    <p class="snapshot-step-label" style="margin-bottom:8px;margin-top:16px;font-size:0.8125rem">${t('snapshotLabelResponses')}</p>
    <div class="snapshot-responses-list">${responsesHtml}</div>
    <p class="snapshot-step-label" style="margin-bottom:8px;font-size:0.8125rem">${t('snapshotLabelDimensions')}</p>
    <dl class="snapshot-dimensions-grid">${dimsHtml}</dl>
  `;

  els.snapshotResult.hidden = false;
  revealSnapshotKnowledge(data);
  els.snapshotResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateSnapshot() {
  const data = collectSnapshotData();
  if (!data.event) {
    alert(t('snapshotNotFilled'));
    els.snapshotEvent.focus();
    return;
  }
  if (!data.category) {
    alert(t('snapshotSelectCategory'));
    return;
  }
  state.lastSnapshotData = data;
  renderSnapshotResult(data);
}

function projectSnapshot() {
  if (!state.lastSnapshotData) return;
  showSnapshotBoard(state.lastSnapshotData);
}

function toggleSnapshotDim(dim) {
  const field = document.querySelector(`.snapshot-dim-field[data-dim="${dim}"]`);
  const btn = document.querySelector(`.snapshot-dim-btn[data-dim="${dim}"]`);
  if (!field || !btn) return;
  const willShow = field.hidden;
  field.hidden = !willShow;
  btn.classList.toggle('active', willShow);
  if (willShow) field.querySelector('textarea')?.focus();
}

function bindSnapshotExercise() {
  document.querySelectorAll('.snapshot-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => handleSnapshotCategoryClick(btn.dataset.cat));
  });

  els.snapshotCatPanels?.addEventListener('click', e => {
    const addBtn = e.target.closest('.snapshot-cat-add-btn');
    if (addBtn) {
      addCategoryRow(addBtn.dataset.cat);
      return;
    }
    const removeBtn = e.target.closest('.snapshot-cat-remove-btn');
    if (removeBtn && !removeBtn.disabled) {
      removeCategoryRow(removeBtn.dataset.cat, parseInt(removeBtn.dataset.idx, 10));
    }
  });

  els.snapshotCatPanels?.addEventListener('input', e => {
    const ta = e.target.closest('.snapshot-cat-sentence');
    if (!ta || !state.snapshotCatRows) return;
    const cat = ta.dataset.cat;
    const idx = parseInt(ta.dataset.idx, 10);
    if (state.snapshotCatRows[cat]) state.snapshotCatRows[cat][idx] = ta.value;
  });

  document.querySelectorAll('.snapshot-response-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.response;
      btn.classList.toggle('active');
      const idx = state.snapshotResponses.indexOf(key);
      if (idx >= 0) state.snapshotResponses.splice(idx, 1);
      else state.snapshotResponses.push(key);
    });
  });

  document.querySelectorAll('.snapshot-dim-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleSnapshotDim(btn.dataset.dim));
  });

  els.snapshotLevel?.addEventListener('input', () => {
    els.snapshotLevelVal.textContent = els.snapshotLevel.value;
  });

  els.generateSnapshotBtn?.addEventListener('click', generateSnapshot);
  els.projectSnapshotBtn?.addEventListener('click', projectSnapshot);
  els.generatePatternSnapshotBtn?.addEventListener('click', generatePatternSnapshot);
  els.projectPatternSnapshotBtn?.addEventListener('click', projectPatternSnapshot);
}

function getScanCopy() {
  return SCAN_FLOW[state.lang];
}

function resetSignalScan() {
  state.scanStep = 0;
  state.scanAnswers = {};
  if (els.scanResult) els.scanResult.hidden = true;
  if (els.scanStage) els.scanStage.hidden = false;
  if (els.scanFeedback) {
    els.scanFeedback.hidden = true;
    els.scanFeedback.textContent = '';
  }
  renderSignalScan();
}

function renderSignalScan() {
  if (!els.scanQuestion || !els.scanOptions) return;
  const copy = getScanCopy();
  const step = copy.steps[state.scanStep];
  if (!step) return renderScanResult();
  els.scanStepCount.textContent = `${state.scanStep + 1} / ${copy.steps.length}`;
  els.scanProgressText.textContent = t(step.progress);
  document.querySelectorAll('.scan-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx <= state.scanStep);
  });
  els.scanStage.classList.remove('scan-stage-enter');
  void els.scanStage.offsetWidth;
  els.scanStage.classList.add('scan-stage-enter');
  els.scanQuestion.textContent = step.question;
  els.scanOptions.innerHTML = step.options.map(([value, label]) => `
    <button type="button" class="scan-option-card" data-scan-value="${value}">
      <span>${escapeHtml(label)}</span>
    </button>
  `).join('');
}

function chooseScanOption(value) {
  const copy = getScanCopy();
  const step = copy.steps[state.scanStep];
  state.scanAnswers[step.key] = value;
  els.scanFeedback.textContent = step.feedback;
  els.scanFeedback.hidden = false;
  setTimeout(() => {
    state.scanStep += 1;
    if (state.scanStep >= copy.steps.length) renderScanResult();
    else renderSignalScan();
  }, 520);
}

function getResultDoodle(kind) {
  const doodles = {
    signal: '<svg viewBox="0 0 96 76" focusable="false"><path class="crayon-fill fill-sky" d="M36 63 43 23h18l8 40c-10 4-23 4-33 0Z"/><path class="crayon-jitter" d="M35 63 43 23h18l8 40M43 23l9-10 9 10"/><path d="M36 63 43 23h18l8 40M43 23l9-10 9 10M41 37c9 2 19 2 26 0M39 51c11 3 22 3 31 0"/><path class="doodle-beam" d="M61 27c13-6 22-8 32-7M61 32c14 2 23 7 31 15"/><path class="doodle-water" d="M8 70c15-5 24 4 39 0 16-5 25 5 40 0"/></svg>',
    protect: '<svg viewBox="0 0 96 76" focusable="false"><path class="crayon-scribble fill-heart" d="M48 62C27 47 19 35 22 25c4-10 15-10 26 2 10-12 22-12 26-1 5 11-6 23-26 36Z"/><path class="crayon-jitter" d="M48 61C28 47 20 35 23 26c4-11 15-9 25 2 10-12 22-12 25-2 5 11-5 23-25 35Z"/><path d="M48 62C27 47 19 35 22 25c4-10 15-10 26 2 10-12 22-12 26-1 5 11-6 23-26 36Z"/><path class="doodle-ground" d="M20 67c17-4 39-4 57 0"/></svg>',
    action: '<svg viewBox="0 0 96 76" focusable="false"><path class="crayon-fill fill-cup" d="M22 35h35v16c0 11-7 18-18 18S22 62 22 51Z"/><path class="crayon-jitter" d="M23 35h34v17c0 10-7 17-18 17s-17-7-16-18Z"/><path d="M22 35h35v16c0 11-7 18-18 18S22 62 22 51Z"/><path d="M57 40h10c7 0 7 15-4 16h-6"/><path class="doodle-steam" d="M29 27c-5-8 6-8 3-17M43 27c-5-8 6-8 3-17"/><path class="doodle-ground" d="M17 70h58"/></svg>',
    reframe: '<svg viewBox="0 0 96 76" focusable="false"><path class="crayon-fill fill-leaf" d="M48 68V39"/><path class="crayon-fill fill-leaf" d="M48 41c-16-1-23-10-23-24 14 1 22 10 23 24Z"/><path class="crayon-fill fill-leaf" d="M50 47c17-4 26-14 27-30-16 2-25 12-27 30Z"/><path class="crayon-jitter" d="M48 68V39M48 41c-16-1-23-10-23-24 14 1 22 10 23 24ZM50 47c17-4 26-14 27-30-16 2-25 12-27 30Z"/><path d="M48 68V39M48 41c-16-1-23-10-23-24 14 1 22 10 23 24ZM50 47c17-4 26-14 27-30-16 2-25 12-27 30Z"/><path class="doodle-ground" d="M18 70c17-5 40-5 60 0"/></svg>'
  };
  return doodles[kind] || doodles.signal;
}

function renderScanResult() {
  const copy = getScanCopy();
  const resultCopy = SCAN_RESULT_COPY[state.lang];
  const answers = state.scanAnswers;
  const signal = resultCopy[answers.state] || resultCopy.tense;
  const protect = resultCopy[answers.source] || resultCopy.need;
  const action = resultCopy.actionDefault;
  const cards = [
    ['signal', copy.result.signal, signal],
    ['protect', copy.result.protect, protect],
    ['action', copy.result.action, action],
    ['reframe', copy.result.reframe, copy.result.reframeText]
  ];
  els.scanProgressText.textContent = t('scanProgressAction');
  els.scanStepCount.textContent = '4 / 4';
  document.querySelectorAll('.scan-dot').forEach(dot => dot.classList.add('active'));
  if (els.scanStage) els.scanStage.hidden = true;
  if (els.scanFeedback) {
    els.scanFeedback.textContent = state.lang === 'zh'
      ? '已经生成。你可以先带着一个小动作离开这里。'
      : 'Generated. You can leave with one small action for now.';
    els.scanFeedback.hidden = false;
  }
  els.scanResultGrid.innerHTML = cards.map(([kind, title, body]) => `
    <section class="scan-result-item scan-result-${kind}">
      <span class="scan-result-doodle" aria-hidden="true">${getResultDoodle(kind)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(body)}</p>
    </section>
  `).join('');
  els.scanResult.hidden = false;
}

function bindSignalScan() {
  els.resetStartBtn?.addEventListener('click', () => {
    els.signalScan?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    resetSignalScan();
  });
  document.getElementById('emergencyCalmBtn')?.addEventListener('click', () => {
    showView('lecture');
    goToSection(3);
    setTimeout(() => {
      document.getElementById('breathPractice')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  });
  els.scanOptions?.addEventListener('click', e => {
    const option = e.target.closest('[data-scan-value]');
    if (!option) return;
    chooseScanOption(option.dataset.scanValue);
  });
  els.restartScanBtn?.addEventListener('click', resetSignalScan);
  els.saveScanBtn?.addEventListener('click', () => {
    const text = els.scanResultGrid?.innerText || '';
    if (navigator.clipboard && text) navigator.clipboard.writeText(text).catch(() => {});
    els.saveScanBtn.textContent = state.lang === 'zh' ? '已复制' : 'Copied';
    setTimeout(() => { els.saveScanBtn.textContent = t('saveScan'); }, 1400);
  });
  resetSignalScan();
}

function startResetPath() {
  const concern = els.homeConcern?.value.trim() || '';
  const level = els.homeLevel?.value || '5';
  if (els.snapshotEvent && concern) els.snapshotEvent.value = concern;
  if (els.snapshotLevel) {
    els.snapshotLevel.value = level;
    if (els.snapshotLevelVal) els.snapshotLevelVal.textContent = level;
  }
  const targetSection = state.homeFocus === 'thought' ? 2 : state.homeFocus === 'body' ? 3 : state.homeFocus === 'action' ? 4 : 1;
  showView('lecture');
  goToSection(targetSection);
  setTimeout(() => {
    const target = targetSection === 1
      ? (document.getElementById('snapshotExercise') || document.getElementById('section1'))
      : document.querySelector(`[data-section="${targetSection}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (targetSection === 1 && !concern) els.snapshotEvent?.focus();
  }, 80);
}

function bindEvents() {
  els.enterLectureBtn?.addEventListener('click', e => {
    e.preventDefault();
    startResetPath();
  });

  els.homeLevel?.addEventListener('input', () => {
    els.homeLevelVal.textContent = els.homeLevel.value;
  });

  document.querySelectorAll('.quick-focus-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quick-focus-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.homeFocus = btn.dataset.focus;
    });
  });

  document.querySelectorAll('.outline-card').forEach(card => {
    card.addEventListener('click', () => {
      showView('lecture');
      goToSection(parseInt(card.dataset.goto, 10));
    });
  });

  els.backHomeBtn?.addEventListener('click', () => showView('home'));

  document.querySelectorAll('.section-tab[data-section]').forEach(tab => {
    tab.addEventListener('click', () => goToSection(parseInt(tab.dataset.section, 10)));
  });

  els.langToggle?.addEventListener('click', () => {
    state.lang = state.lang === 'zh' ? 'en' : 'zh';
    applyI18n();
    resetSignalScan();
  });

  if (els.goalSlider) {
    els.goalSlider.addEventListener('input', () => {
      state.goalSlider = parseInt(els.goalSlider.value, 10);
      updateYerkesUI();
    });
  }
  if (els.anxietySlider) {
    els.anxietySlider.addEventListener('input', () => {
      state.anxietySlider = parseInt(els.anxietySlider.value, 10);
      updateYerkesUI();
    });
  }

  els.patternsGrid?.addEventListener('input', e => {
    if (e.target.classList.contains('pattern-scenario-input')) {
      savePatternScenario(e.target.dataset.pattern, e.target.value);
    }
    if (e.target.classList.contains('pattern-score-slider')) {
      setPatternScore(e.target.dataset.pattern, parseInt(e.target.value, 10));
    }
  });

  els.patternsGrid?.addEventListener('click', e => {
    const showBtn = e.target.closest('.pattern-show-btn');
    if (showBtn) {
      const id = showBtn.dataset.pattern;
      const textarea = els.patternsGrid.querySelector(`.pattern-scenario-input[data-pattern="${id}"]`);
      if (textarea) savePatternScenario(id, textarea.value);
      showPatternBoard(id);
    }
  });

  els.boardStrategyList?.addEventListener('click', e => {
    const toggle = e.target.closest('.board-strategy-toggle');
    if (toggle) {
      const item = toggle.closest('.board-strategy-item');
      toggleBoardStrategy(parseInt(item.dataset.idx, 10));
      return;
    }
    const original = e.target.closest('.board-original-thought');
    if (original) {
      toggleBoardOriginalCrossed(parseInt(original.dataset.idx, 10));
    }
  });

  els.boardStrategyList?.addEventListener('keydown', e => {
    if (e.target.classList.contains('board-original-thought') && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggleBoardOriginalCrossed(parseInt(e.target.dataset.idx, 10));
    }
  });

  els.boardStrategyList?.addEventListener('input', e => {
    if (e.target.classList.contains('board-field-input')) {
      const idx = parseInt(e.target.dataset.idx, 10);
      const fieldId = e.target.dataset.field;
      const pb = getPatternBoardState();
      const st = getStrategyState(pb, idx);
      st.fields[fieldId] = e.target.value;
      persistPatternBoardState(state.boardPatternId);
    }
  });

  els.toggleStrategiesBtn?.addEventListener('click', toggleBoardStrategiesVisible);

  els.addSuggestionBtn?.addEventListener('click', addBoardSuggestion);

  els.boardSuggestionsList?.addEventListener('click', e => {
    const del = e.target.closest('.board-suggestion-delete');
    if (del) removeBoardSuggestion(parseInt(del.dataset.idx, 10));
  });

  els.boardSuggestionsList?.addEventListener('input', e => {
    if (e.target.classList.contains('board-suggestion-input')) {
      const pb = getPatternBoardState();
      pb.suggestions[parseInt(e.target.dataset.idx, 10)] = e.target.value;
    }
  });

  // Presenter panel
  els.presenterToggle?.addEventListener('click', () => {
    els.presenterPanel.hidden = !els.presenterPanel.hidden;
  });
  els.closePresenterPanel?.addEventListener('click', () => {
    els.presenterPanel.hidden = true;
  });

  els.presenterShowBtn?.addEventListener('click', () => {
    const caseText = els.presenterCaseInput.value.trim();
    const patternId = els.presenterPattern.value;
    const section = els.presenterSection.value;
    let title = t('displayCase');
    let meta = '';
    let action = '';

    if (patternId) {
      const p = PATTERNS.find(x => x.id === patternId);
      title = p[state.lang].name;
      meta = p[state.lang].desc;
      action = p.reframe[state.lang];
    } else {
      const sectionTitles = {
        '1': t('section1Title'),
        '2': t('section3Title'),
        '3': t('sectionCalmTitle'),
        '4': t('section4Title')
      };
      meta = sectionTitles[section] || '';
    }

    showBoard({
      label: t('displayCase'),
      title,
      quote: caseText || (state.lang === 'zh' ? '（请输入案例）' : '(Please enter a case)'),
      meta,
      action
    });
  });

  els.presenterClearBtn?.addEventListener('click', hideBoard);

  els.closeDisplayBoard?.addEventListener('click', hideBoard);
  els.displayBoard?.addEventListener('click', e => {
    if (e.target === els.displayBoard) hideBoard();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hideBoard();
      if (els.presenterPanel) els.presenterPanel.hidden = true;
    }
  });
}

function safely(label, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[Reset Blueprint] ${label} failed`, error);
  }
}

function init() {
  initEls();
  renderSignalScan();
  bindSignalScan();
  safely('bindEvents', bindEvents);
  safely('bindSnapshotExercise', bindSnapshotExercise);
  safely('bindUseStepCards', bindUseStepCards);
  safely('bindAppModulePickers', bindAppModulePickers);
  safely('initSnapshotCatRows', initSnapshotCatRows);
  safely('initUseStepTexts', initUseStepTexts);
  safely('bindBrainRegions', bindBrainRegions);
  safely('bindAmygdalaSliders', bindAmygdalaSliders);
  safely('bindBreathPractice', bindBreathPractice);
  safely('bindCalmSection', bindCalmSection);
  safely('bindSignalNodes', bindSignalNodes);
  safely('applyI18n', applyI18n);
  safely('updateYerkesUI', updateYerkesUI);
}

init();



