// Resource Ecology recommendations per domain module

const RESOURCE_ECOLOGY = (() => {
  "use strict";

  const pick = (en, zh, lang) => (lang === "zh" ? zh : en);

  /**
   * @param {string} domainKey
   * @param {{ percentages: object, means: object }} moduleResult
   * @param {string} lang
   */
  function getRecommendations(domainKey, moduleResult, lang) {
    const p = moduleResult.percentages || {};
    const items = [];

    const gap = (p.desired || 0) - Math.max(p.perceived || 0, p.ease || 0);
    const highConstraint = (p.constraint || 0) >= 60;
    const highEase = (p.ease || 0) >= 65;
    const highDesired = (p.desired || 0) >= 65;
    const lowPerceived = (p.perceived || 0) < 45;

    if (highConstraint) {
      items.push(
        pick(
          "Reduce environmental friction: secure dedicated practice time, mentorship, or tools before pushing for higher output in this domain.",
          "降低环境摩擦：在追求更高产出之前，先争取专用练习时间、导师反馈或工具支持。",
          lang,
        ),
      );
    }

    if (gap >= 15) {
      items.push(
        pick(
          "Your desired talent runs ahead of current ease and recognition—design small, visible projects that close the dream–reality gap.",
          "你的理想天赋领先于当前顺畅度与他人认可——通过小而可见的项目缩小梦想与现实的距离。",
          lang,
        ),
      );
    }

    if (highEase && lowPerceived) {
      items.push(
        pick(
          "Development feels natural but under-recognized—seek audiences or collaborators who can witness and validate this strength.",
          "发展相对顺畅但认可不足——寻找能见证并验证这一优势的受众或合作者。",
          lang,
        ),
      );
    }

    if (highDesired && !highEase) {
      items.push(
        pick(
          "Motivation is strong; build structured repetition and feedback loops rather than relying on inspiration alone.",
          "动机明确；应建立结构化重复与反馈循环，而非仅依赖灵感。",
          lang,
        ),
      );
    }

    const domainTips = {
      linguistic: pick(
        "Resource ecology: read widely, speak or write weekly, and collect feedback on precision—not just volume.",
        "资源生态：广泛阅读并坚持每周口头或书面输出，收集关于精准度而非数量的反馈。",
        lang,
      ),
      auditory: pick(
        "Resource ecology: use active listening drills, short imitation sessions, and low-noise environments.",
        "资源生态：进行主动聆听练习、短时模仿，并在低噪音环境中训练。",
        lang,
      ),
      analytical: pick(
        "Resource ecology: pair abstract study with applied problems and peer review of your reasoning.",
        "资源生态：将抽象学习与实际问题配对，并请他人审视你的推理过程。",
        lang,
      ),
      spatial: pick(
        "Resource ecology: sketch, model, or navigate real layouts—spatial talent grows through embodied practice.",
        "资源生态：通过草图、建模或真实空间导航来发展——空间天赋依赖具身练习。",
        lang,
      ),
      memory: pick(
        "Resource ecology: use spaced repetition and meaningful chunking instead of raw cramming.",
        "资源生态：使用间隔重复与有意义的分块，而非机械死记。",
        lang,
      ),
      creative: pick(
        "Resource ecology: protect unstructured time and cross-pollinate ideas from unrelated fields.",
        "资源生态：保护非结构化时间，并从无关领域引入灵感。",
        lang,
      ),
      systems: pick(
        "Resource ecology: document mechanisms from real cases and test models against new examples.",
        "资源生态：从真实案例中提取机制，并用新例子检验模型。",
        lang,
      ),
      cross_domain: pick(
        "Resource ecology: deliberately pair two disciplines (e.g., math + design) in one weekly project.",
        "资源生态：每周在一个项目中刻意配对两个学科（如数学与设计）。",
        lang,
      ),
      interpersonal: pick(
        "Resource ecology: practice reflective listening in low-stakes conversations before high-stakes settings.",
        "资源生态：在高风险情境前，先在低风险对话中练习反思式倾听。",
        lang,
      ),
      leadership: pick(
        "Resource ecology: lead small initiatives with clear outcomes to build influence evidence.",
        "资源生态：通过小规模、结果清晰的倡议积累影响力证据。",
        lang,
      ),
      moral: pick(
        "Resource ecology: study diverse ethical frameworks and apply them to concrete dilemmas you face.",
        "资源生态：学习多元伦理框架，并应用于你面临的具体困境。",
        lang,
      ),
      operational: pick(
        "Resource ecology: refine procedures with deliberate practice and quality checkpoints.",
        "资源生态：以刻意练习与质量检查点来精进流程。",
        lang,
      ),
      physical: pick(
        "Resource ecology: consistent bodily practice beats sporadic intensity—schedule recovery too.",
        "资源生态：持续的身体练习胜过偶发高强度——也要安排恢复。",
        lang,
      ),
    };

    if (domainTips[domainKey]) items.push(domainTips[domainKey]);

    if (!items.length) {
      items.push(
        pick(
          "Maintain balanced investment across practice, feedback, and rest in this domain.",
          "在该领域保持练习、反馈与休息的平衡投入。",
          lang,
        ),
      );
    }

    return items.slice(0, 5);
  }

  return { getRecommendations };
})();
