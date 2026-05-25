/* Support System Dynamics — typology labels (bilingual, second-person, human-readable) */

const SSD_TYPOLOGY = {
  archetypes: {
    hidden_isolation: {
      en: {
        label: "Hidden Isolation Pattern",
        summary: "You have resources — but they may not feel emotionally available when you need them.",
        human:
          "You may have real support in your life — relationships, stability, structure — yet still feel alone in moments that matter. Help might be there objectively, but not as something you can lean on under pressure.",
      },
      zh: {
        label: "隐性孤立模式",
        summary: "你有资源，但在关键时刻可能仍难以感到被真正承接。",
        human:
          "你的生活中可能有真实的关系、稳定与结构，但在重要时刻，你仍可能感到孤独或缺乏支持。帮助也许客观上存在，却在压力下难以变成可以依靠的东西。",
      },
    },
    reconstruction_driven: {
      en: {
        label: "Reconstruction-Driven Pattern",
        summary: "You rebuild after disruption — sometimes before your foundations feel secure.",
        human:
          "You may be good at putting life back together after things fall apart, even when your base feels thin. Direction often returns through effort and reorganization, not through stable support underneath.",
      },
      zh: {
        label: "重建驱动模式",
        summary: "你擅长在破坏后重建——有时基础尚未稳固时就开始重组。",
        human:
          "即使底层基础感觉还不牢靠，你也可能擅长在事物崩溃后重新拼起来。方向往往靠努力与重组恢复，而不是靠稳定的基础承托。",
      },
    },
    operational_dependency: {
      en: {
        label: "Operational Dependency Pattern",
        summary: "Support feels reachable — but recovery may not fully follow.",
        human:
          "You may often have usable support, yet still struggle to fully rely on it when pressure rises. Help can be available, but continuity after disruption may remain hard to restore.",
      },
      zh: {
        label: "运作依赖模式",
        summary: "支持感觉可及，但恢复未必能完全跟上。",
        human:
          "你经常拥有可用的支持，却在压力上升时仍难以完全依赖它。帮助可能找得到，但破坏后的连续性仍可能难以恢复。",
      },
    },
    self_reorganization: {
      en: {
        label: "Self-Reorganization Pattern",
        summary: "When outside support is thin, you rebuild through your own effort.",
        human:
          "When external structures weaken, you may still find ways to recover — often through your own work rather than dependable outside help. Recovery may feel like something you do alone.",
      },
      zh: {
        label: "自我重组模式",
        summary: "外部支持薄弱时，你更依靠自身努力重建。",
        human:
          "当外部结构减弱时，你仍可能找到恢复方式——往往靠自身努力，而非可靠的外部帮助。恢复有时更像是你独自完成的事。",
      },
    },
    cognitive_continuity: {
      en: {
        label: "Cognitive Continuity Pattern",
        summary: "Meaning and belief carry you when groundedness feels shakier.",
        human:
          "During instability, you may lean on beliefs, goals, or future direction to keep life coherent — even when your sense of being grounded feels weaker. Meaning may carry you when rhythm does not.",
      },
      zh: {
        label: "认知连续性模式",
        summary: "当扎根感不稳时，意义与信念更承托你。",
        human:
          "在不稳定中，你可能更依赖信念、目标或未来取向来维持生活连贯——即使扎根的自我感更脆弱。当节奏无法承托你时，意义可能先承托你。",
      },
    },
    high_functioning_low_safety: {
      en: {
        label: "High Functioning / Low Safety Pattern",
        summary: "You keep moving forward — while rarely feeling consistently held.",
        human:
          "You may appear capable, productive, or always moving — while rarely feeling truly safe or held. Function can outpace the sense that support is really there when you need it.",
      },
      zh: {
        label: "高功能 / 低安全模式",
        summary: "你持续向前——却很少感到被稳定承托。",
        human:
          "你可能显得能干、高产、一直在向前——却很少感到真正安全或被承托。外在功能可能超过「需要时支持真正在场」的感受。",
      },
    },
    integrated_continuity: {
      en: {
        label: "Integrated Continuity Pattern",
        summary: "What you have, what you feel, what you can use, and how you recover connect more coherently.",
        human:
          "Your support profile looks relatively connected — resources can often be felt, accessed, and turned into recovery when life is disrupted. Continuity may hold through linked strengths rather than one isolated fix.",
      },
      zh: {
        label: "整合连续性模式",
        summary: "你拥有的、感受到的、能调用的与如何恢复，大致能连起来。",
        human:
          "你的支持结构相对连贯——存在之物常能被感受、进入，并在破坏时转化为恢复。连续性更可能靠相互衔接的优势维持，而非靠单一支点硬撑。",
      },
    },
    accessibility_bottleneck: {
      en: {
        label: "Accessibility Bottleneck Pattern",
        summary: "You sense support — but struggle to enter it, use it, or convert it.",
        human:
          "You may feel that support exists, yet struggle to ask for it, accept it, or turn it into real recovery. The gap is often not absence — it's access.",
      },
      zh: {
        label: "可及性瓶颈模式",
        summary: "你感到支持存在——却难以进入、使用或转化它。",
        human:
          "你可能感到支持就在那里，却难以开口、接受，或把它变成真实恢复。缺口往往不在缺失，而在可及。",
      },
    },
    structural_fragility: {
      en: {
        label: "Distributed Fragility Pattern",
        summary: "Multiple areas feel thin at once — shock absorption is limited.",
        human:
          "Under prolonged pressure, several parts of your support profile may weaken together. When instability hits, it may be harder for any single area to compensate for the others.",
      },
      zh: {
        label: "分布式脆弱模式",
        summary: "多个部分同时偏薄——缓冲能力有限。",
        human:
          "在长期压力下，你支持结构的多个部分可能同时变弱。不稳定来临时，可能更难靠某一领域单独顶住。",
      },
    },
  },

  recoveryStyles: {
    reconstruction: {
      en: {
        label: "Reconstruction Type",
        human: "After collapse, you tend to rebuild life structure deliberately — reorganizing routines, priorities, and arrangements rather than waiting for continuity to return on its own.",
        detail:
          "When things fall apart, you may start rearranging how life works — schedules, roles, commitments — before inner stability fully returns. Recovery for you often looks like building a new structure, not returning to the old one unchanged.",
      },
      zh: {
        label: "重建型",
        human: "崩溃后，你倾向于主动重建生活结构——重组惯例、优先事项与安排，而非等待连续性自行回归。",
        detail:
          "当生活被打散时，你可能先重新安排日程、角色与承担，再等待内在稳定完全回来。你的恢复往往像搭建新结构，而不是原样回到旧结构。",
      },
    },
    inertial_return: {
      en: {
        label: "Inertial Return Type",
        human: "Continuity often returns gradually through habit and rhythm — functioning tends to restore over time without dramatic restructuring.",
        detail:
          "You may not need a full life redesign to recover. Steady rhythm, familiar routines, and time itself may bring you back — as long as disruption doesn't completely break your baseline patterns.",
      },
      zh: {
        label: "惯性回归型",
        human: "连续性常通过习惯与节奏逐渐回归——功能往往随时间恢复，无需剧烈重组。",
        detail:
          "你可能不需要彻底改写生活才能恢复。稳定的节奏、熟悉的惯例与时间本身，可能慢慢把你带回来——只要破坏没有完全打散你的基本模式。",
      },
    },
    external_restoration: {
      en: {
        label: "External Restoration Type",
        human: "Recovery appears strongly tied to people, relationships, institutions, or environmental conditions — continuity often returns when external structures re-engage.",
        detail:
          "You may recover best when someone shows up, an environment stabilizes, or a relationship re-engages. External holding may matter as much as — or more than — inner reframing alone.",
      },
      zh: {
        label: "外部恢复型",
        human: "恢复高度依赖他人、关系、制度或环境条件——当外部结构重新介入时，连续性常随之回归。",
        detail:
          "当有人在场、环境稳定、或关系重新连接时，你可能恢复得最好。外部的承托对你而言，可能与 —— 或超过 —— 内在重新解释同样重要。",
      },
    },
    meaning_reconstruction: {
      en: {
        label: "Meaning Reconstruction Type",
        human: "You seem to recover continuity by reinterpreting experience — through goals, philosophy, long-term direction, or worldview rather than short-term soothing alone.",
        detail:
          "When life loses direction, you may need to find a renewed answer to \"why continue\" — not just lower stress. Narrative, purpose, and belief may restore stability before rhythm fully returns.",
      },
      zh: {
        label: "意义重建型",
        human: "你似乎更容易通过「重新解释经历」来恢复连续性——目标、哲学、长期方向或世界观，可能比短期情绪安抚更能帮你稳定下来。",
        detail:
          "当生活失去方向时，你往往需要重新找到「为什么继续」的解释，而不仅仅是降低压力。叙事、目的与信念，可能在节奏完全恢复之前就先把你稳住。",
      },
    },
    rhythm_restoration: {
      en: {
        label: "Rhythm Restoration Type",
        human: "Continuity returns through sustainable rhythms — routine, bodily regulation, sleep, exercise, and environmental pattern rather than cognitive reframing alone.",
        detail:
          "You may recover best when daily rhythm returns — regular sleep, movement, predictable structure. Your body and schedule may need to stabilize before your mind fully trusts that life can continue coherently.",
      },
      zh: {
        label: "节奏恢复型",
        human: "连续性通过可持续节奏回归——惯例、身体调节、睡眠、运动与环境模式，而非仅靠认知重构。",
        detail:
          "当日常节奏回来——规律睡眠、运动、可预期的结构——你可能恢复得最好。身体与日程可能需要先稳定，你的心才更容易相信生活可以继续连贯地走下去。",
      },
    },
    functional_compensation: {
      en: {
        label: "Functional Compensation Type",
        human: "Recovery may occur through productivity and over-functioning — momentum restored before inner continuity feels fully rebuilt.",
        detail:
          "You may get moving again before you feel fully held or reorganized inside. Action can restore a sense of continuity — but if inner recovery lags, exhaustion may accumulate beneath the momentum.",
      },
      zh: {
        label: "功能补偿型",
        human: "恢复可能通过生产力与过度功能发生——在内层连续性完全重建前，动力已经恢复。",
        detail:
          "你可能在内在尚未完全承托、尚未完全重组时，就先重新动起来。行动能恢复连续感——但若内在恢复滞后，耗竭可能在动力之下悄悄累积。",
      },
    },
  },

  conversionStyles: {
    hyper_independent: {
      en: {
        label: "Hyper-Independent Support Style",
        human: "You may default to self-sufficiency even when support is available — help-seeking activates late or not at all.",
        watchFor: ["long-term depletion", "sudden collapse after prolonged self-reliance", "difficulty receiving care when finally offered"],
      },
      zh: {
        label: "超独立支持风格",
        human: "即使支持可用，你也可能默认自给自足——求助启动晚，或不启动。",
        watchFor: ["长期耗竭", "长期硬撑后的突然崩溃", "终于有人帮忙时仍难以接受"],
      },
    },
    delayed_help_seeking: {
      en: {
        label: "Delayed Help-Seeking Pattern",
        human: "You often recognize support gaps, but act on them only after strain has already accumulated.",
        watchFor: ["crisis-level help-seeking", "recovery starting too late", "shame or resistance after finally asking"],
      },
      zh: {
        label: "延迟求助模式",
        human: "你常能察觉自己需要什么，但往往在压力已经累积后才行动。",
        watchFor: ["到危机才求助", "恢复启动过晚", "终于开口后的羞耻或抗拒"],
      },
    },
    over_integration: {
      en: {
        label: "Over-Integration Pattern",
        human: "You may accept support readily, yet struggle to convert it into inner stability or lasting recovery.",
        watchFor: ["absorbing others' expectations", "feeling supported but not restored", "relational over-commitment"],
      },
      zh: {
        label: "过度整合模式",
        human: "你可能较易接受支持，却难以把它转化为内在稳定或持久恢复。",
        watchFor: ["吸收他人期待", "感到被帮助但未真正恢复", "关系过度投入"],
      },
    },
    relational_confirmation: {
      en: {
        label: "Relational Confirmation Seeking",
        human: "Support utilization may depend heavily on feeling secure in connection — needs become accessible when relationship feels safe.",
        watchFor: ["withholding needs when connection feels uncertain", "all-in attachment when finally held", "mood tied to relational validation"],
      },
      zh: {
        label: "关系确认寻求",
        human: "你是否能使用支持，可能高度依赖关系中的安全感——当连接感到稳定时，需求才变得可及。",
        watchFor: ["关系不确定时压抑需求", "一旦感到被承接就全情投入", "情绪与关系确认高度绑定"],
      },
    },
    high_access_low_trust: {
      en: {
        label: "High Accessibility / Low Trust",
        human: "Support pathways exist, but trust in their durability may limit full reliance under pressure.",
        watchFor: ["using support cautiously", "testing others' reliability", "pulling back after initial openness"],
      },
      zh: {
        label: "高可及 / 低信任",
        human: "支持路径存在，但你对它能否持续、是否真诚的信任，可能限制压力下的完全依赖。",
        watchFor: ["谨慎使用支持", "反复测试他人可靠性", "短暂开放后又收回"],
      },
    },
    resource_hoarding: {
      en: {
        label: "Resource Hoarding Pattern",
        human: "Material or structural resources may be maintained while relational or emotional support remains underutilized.",
        watchFor: ["solving problems alone with resources", "neglecting emotional needs", "stability without felt support"],
      },
      zh: {
        label: "资源囤积模式",
        human: "物质或结构资源可能维持得不错，而关系或情感支持仍利用不足。",
        watchFor: ["靠资源独自解决问题", "忽视情感需求", "有稳定却缺少被承接感"],
      },
    },
    self_sustained_recovery: {
      en: {
        label: "Self-Sustained Recovery Style",
        human: "You tend to recover through internal reorganization rather than relational or institutional support channels.",
        watchFor: ["long-term exhaustion", "over-independence", "difficulty being cared for", "sudden collapse after sustained self-management"],
      },
      zh: {
        label: "自我维持恢复型",
        human: "你更倾向于依靠内部重组恢复稳定，而不是依赖关系或外部结构。",
        watchFor: ["长期耗竭", "过度独立", "难以真正被照顾", "长期自我管理后的突然崩溃"],
      },
    },
  },

  compensations: {
    overwork: {
      en: { label: "Overwork", human: "When felt support is low, you may maintain momentum through productivity — function substitutes for safety." },
      zh: { label: "过度工作", human: "当可感支持偏低时，你可能靠生产力维持动力——用「还能运转」替代「感到安全」。" },
    },
    excessive_independence: {
      en: { label: "Excessive Independence", human: "You may manage gaps by refusing dependency — autonomy becomes your main way of staying continuous." },
      zh: { label: "过度独立", human: "你可能通过拒绝依赖来应对缺口——自主成为维持连续性的主要方式。" },
    },
    meaning_construction: {
      en: { label: "Meaning Construction", human: "Beliefs, philosophy, or narrative may compensate when grounded continuity feels weak — direction held through interpretation." },
      zh: { label: "意义建构", human: "当扎根的连续感偏弱时，信念、哲学或叙事可能替你承托方向。" },
    },
    emotional_overinvestment: {
      en: { label: "Emotional Overinvestment", human: "Relational intensity may substitute for stable belonging — all-in attachment compensates for inconsistent felt support." },
      zh: { label: "情感过度投入", human: "关系强度可能替代稳定归属——全情投入补偿不一致的可感支持。" },
    },
    self_reconstruction: {
      en: { label: "Chronic Self-Reconstruction", human: "You may repeatedly rebuild internally instead of activating support early — recovery comes, but often late and at a cost." },
      zh: { label: "慢性自我重建", human: "你可能反复在内部重建，而不是尽早激活支持——恢复会来，但往往偏晚且有代价。" },
    },
    selective_conversion: {
      en: { label: "Selective Conversion", human: "Some support types convert well for you; others you deflect — partial use masks full availability." },
      zh: { label: "选择性转化", human: "某些支持你能较好转化，另一些你会挡回去——部分使用掩盖了完整的可及性。" },
    },
    emotional_containment: {
      en: { label: "Emotional Self-Containment", human: "Resources exist, but you may hold emotional load privately — appearing stable while carrying unprocessed strain." },
      zh: { label: "情感自我封闭", human: "资源存在，但你可能把情感负荷独自收着——表面稳定，内里仍积压未处理的张力。" },
    },
  },

  continuityRisks: {
    burnout_collapse: {
      en: {
        label: "Burnout Collapse Risk",
        human: "Under sustained demand, you may keep functioning outwardly while inner reserves drain — collapse risk rises when momentum outpaces recovery.",
        triggers: ["prolonged high output", "burnout or overwork periods", "little structural rest", "functioning without felt safety"],
      },
      zh: {
        label: "倦怠崩溃风险",
        human: "在持续需求下，你可能继续运转，而内在储备被慢慢抽空——当动力超过恢复时，崩溃风险会上升。",
        triggers: ["长期高产出", "倦怠或过度工作", "缺乏结构性休息", "在没有安全感时仍硬撑功能"],
      },
    },
    reconstruction_fatigue: {
      en: {
        label: "Reconstruction Fatigue Risk",
        human: "Repeated rebuilding may work functionally while leaving you increasingly exhausted — you may work hard just to stay continuous.",
        triggers: ["repeated instability cycles", "life transitions without rhythm recovery", "reorganizing before resting", "weak embodied grounding"],
      },
      zh: {
        label: "重建疲劳风险",
        human: "反复重建可能在功能上有效，却让你越来越累——你可能需要持续费力，才能维持连续。",
        triggers: ["反复不稳定周期", "缺乏节奏恢复的生活变动", "尚未休息就开始重组", "扎根感偏弱"],
      },
    },
    relational_depletion: {
      en: {
        label: "Relational Depletion Risk",
        human: "You may have structural assets, yet feel emotionally alone over time — isolation within abundance.",
        triggers: ["relational strain under high demand", "support present but not felt", "long-term emotional self-containment", "high investment without reciprocity"],
      },
      zh: {
        label: "关系耗竭风险",
        human: "你可能拥有结构资源，却随时间仍感到情感上的孤独——富足中的孤立。",
        triggers: ["高需求下的关系张力", "支持存在却感受不到", "长期情感自我封闭", "高投入而缺少回应"],
      },
    },
    embodied_exhaustion: {
      en: {
        label: "Embodied Exhaustion Risk",
        human: "Direction may hold through meaning while bodily rhythm and self-coherence strain — exhaustion can accumulate beneath cognitive continuity.",
        triggers: ["identity stress", "prolonged uncertainty", "disrupted sleep or rhythm", "living by belief while body depletes"],
      },
      zh: {
        label: "具身耗竭风险",
        human: "方向可能靠意义维持，而身体节奏与自我连贯在受压——认知上的连续之下，耗竭可能悄悄累积。",
        triggers: ["身份压力", "长期不确定", "睡眠或节律被打乱", "靠信念撑着走而身体在耗"],
      },
    },
    identity_diffusion: {
      en: {
        label: "Identity Diffusion Under Relational Pressure",
        human: "When relational investment exceeds inner self-stability, you may gradually lose rhythm, direction, or boundaries.",
        triggers: ["long-term high relational investment", "social overload", "ongoing environmental change", "lack of solo recovery space"],
      },
      zh: {
        label: "关系压力下的身份扩散风险",
        human: "当关系投入超过内在自我稳定性时，你可能逐渐失去自己的节律、方向或边界感。",
        triggers: ["长期高度投入关系", "社交过载", "环境持续变化", "缺乏独处恢复空间"],
      },
    },
    prolonged_disruption: {
      en: {
        label: "Prolonged Continuity Disruption Risk",
        human: "Once stability breaks, re-entering structure and direction may become difficult — disruption may stretch across time.",
        triggers: ["compound stress", "isolation", "sequential losses", "no recovery windows"],
      },
      zh: {
        label: "长期连续性破坏风险",
        human: "一旦稳定被破坏，重新进入结构与方向可能变得困难——破坏可能在时间中被拉长。",
        triggers: ["复合压力", "孤立", "连续丧失", "没有恢复窗口"],
      },
    },
    conversion_drain: {
      en: {
        label: "Support Conversion Drain",
        human: "Energy spent seeking or receiving support may not translate into restored functioning — effort without proportional recovery return.",
        triggers: ["repeatedly accessing support without stabilizing", "accepting help but not recovering", "support mismatch", "conversion lag after help arrives"],
      },
      zh: {
        label: "支持转化耗损",
        human: "寻求或接受支持所耗的力，可能换不来对等的恢复——努力与回报不成比例。",
        triggers: ["反复获得支持却仍不稳定", "接受帮助但未恢复", "支持类型不匹配", "帮助到来后转化滞后"],
      },
    },
    self_reconstruction_fatigue: {
      en: {
        label: "Chronic Self-Reconstruction Fatigue",
        human: "You may recover through your own effort while rarely feeling held — over time, rebuilding alone can become exhausting.",
        triggers: ["low felt support with high recovery effort", "delayed help-seeking", "repeated solo recovery cycles", "pressure without relational buffering"],
      },
      zh: {
        label: "慢性自我重建疲劳",
        human: "你可能靠自身努力恢复，却很少感到被承接——长期独自重建，可能越来越耗竭。",
        triggers: ["可感支持偏低而恢复投入偏高", "延迟求助", "反复独自恢复", "压力下缺少关系缓冲"],
      },
    },
    grounding_loss: {
      en: {
        label: "Grounding Loss Under Stress",
        human: "During instability, you may find it harder to maintain a stable sense that life will continue coherently — self-continuity and safety may both feel shaky.",
        triggers: ["identity or meaning stress", "safety and continuity both low", "rapid life change", "loss of familiar structure"],
      },
      zh: {
        label: "压力下扎根感流失",
        human: "在不稳定中，你可能更难维持「生活会继续连贯下去」的稳定感——自我连续与安全可能同时摇晃。",
        triggers: ["身份或意义压力", "安全与连续同时偏低", "生活快速变动", "熟悉结构丧失"],
      },
    },
  },
};
