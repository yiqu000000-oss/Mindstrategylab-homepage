/**
 * Generates item-bank.js from taxonomy definitions.
 * Run: node tools/build-item-bank.mjs
 */
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** @type {Array<{domain:string, subdomain:string, key:string, label:{en:string,zh:string}, items:Record<string,{en:string,zh:string}>}>} */
const MICROS = [];

function add(domain, subdomain, key, label, items) {
  MICROS.push({ domain, subdomain, key, label, items });
}

// —— 1. LINGUISTIC ——
add("linguistic", "vocabulary_precision", "precise_word_choice", { en: "Precise word choice", zh: "精准选词" }, {
  desired: { en: "I wish I could choose words with precise meaning when I speak or write.", zh: "我希望自己在说话或写作时能选择含义精准的词语。" },
  perceived: { en: "Others notice that I choose words with unusual precision.", zh: "他人注意到我选词异常精准。" },
  ease: { en: "I find it natural to select the most precise word available.", zh: "我觉得自然能选到最精准的词。" },
  constraint: { en: "Limited vocabulary exposure has slowed my ability to choose precise words.", zh: "词汇接触不足限制了我精准选词的能力发展。" },
});
add("linguistic", "vocabulary_precision", "nuanced_wording", { en: "Nuanced wording", zh: "措辞细腻" }, {
  desired: { en: "I wish I could express subtle distinctions through nuanced wording.", zh: "我希望自己能用细腻的措辞表达细微差别。" },
  perceived: { en: "Others comment on the nuance in how I phrase things.", zh: "他人会评价我措辞的细腻程度。" },
  ease: { en: "I easily adjust wording to capture fine distinctions.", zh: "我能轻松调整措辞以捕捉细微差别。" },
  constraint: { en: "I rarely get feedback that helps me refine nuanced wording.", zh: "我很少获得有助于磨练细腻措辞的反馈。" },
});
add("linguistic", "written_composition", "coherent_writing", { en: "Coherent written text", zh: "连贯书面表达" }, {
  desired: { en: "I wish I could write long passages that stay coherent from start to finish.", zh: "我希望自己能写出从头到尾都连贯的长文。" },
  perceived: { en: "Others say my written work reads clearly and coherently.", zh: "他人说我的文字清晰连贯。" },
  ease: { en: "When I write, ideas tend to connect smoothly on the page.", zh: "我写作时，观点往往在纸上顺畅衔接。" },
  constraint: { en: "Time pressure often prevents me from writing coherently.", zh: "时间压力常使我难以写出连贯的文字。" },
});
add("linguistic", "written_composition", "paragraph_structure", { en: "Paragraph structuring", zh: "段落结构组织" }, {
  desired: { en: "I wish I could structure paragraphs with clear internal logic.", zh: "我希望自己能组织出内部逻辑清晰的段落。" },
  perceived: { en: "Others notice that my paragraphs are well structured.", zh: "他人注意到我的段落结构良好。" },
  ease: { en: "I find it easy to decide how sentences belong in a paragraph.", zh: "我觉得容易判断句子应如何归属段落。" },
  constraint: { en: "I have not had enough practice organizing paragraph structure.", zh: "我缺乏足够的段落结构组织练习。" },
});
add("linguistic", "oral_fluency", "smooth_speaking", { en: "Smooth speaking", zh: "口语流畅" }, {
  desired: { en: "I wish I could speak smoothly without frequent pauses or repairs.", zh: "我希望自己说话流畅，不必频繁停顿或改口。" },
  perceived: { en: "Others describe my speech as fluent and smooth.", zh: "他人形容我的口语流畅顺滑。" },
  ease: { en: "My speech usually flows smoothly in conversation.", zh: "我在对话中的表达通常很流畅。" },
  constraint: { en: "Anxiety often interrupts my speaking fluency.", zh: "焦虑常打断我的口语流畅度。" },
});
add("linguistic", "oral_fluency", "spontaneous_expression", { en: "Spontaneous verbal expression", zh: "即兴口头表达" }, {
  desired: { en: "I wish I could express ideas spontaneously without long preparation.", zh: "我希望自己无需长时间准备就能即兴表达观点。" },
  perceived: { en: "Others notice that I express ideas well on the spot.", zh: "他人注意到我当场表达观点的能力。" },
  ease: { en: "I can articulate thoughts spontaneously in discussion.", zh: "我能在讨论中即兴组织语言。" },
  constraint: { en: "I avoid situations that require spontaneous speaking.", zh: "我回避需要即兴发言的情境。" },
});
add("linguistic", "storytelling", "narrative_construction", { en: "Narrative construction", zh: "叙事构建" }, {
  desired: { en: "I wish I could construct engaging narratives when I tell stories.", zh: "我希望自己讲故事时能构建引人入胜的叙事。" },
  perceived: { en: "Others enjoy listening when I tell stories.", zh: "他人喜欢听我讲故事。" },
  ease: { en: "I naturally shape events into a clear narrative arc.", zh: "我自然能把事件组织成清晰的叙事弧线。" },
  constraint: { en: "I lack opportunities to practice storytelling.", zh: "我缺乏练习叙事的机会。" },
});
add("linguistic", "rhetorical_persuasion", "verbal_persuasion", { en: "Verbal persuasion", zh: "语言说服" }, {
  desired: { en: "I wish I could persuade others effectively through spoken argument.", zh: "我希望自己能用口头论证有效说服他人。" },
  perceived: { en: "Others say I am persuasive when I speak.", zh: "他人说我发言时很有说服力。" },
  ease: { en: "I find it relatively easy to adjust my arguments to persuade listeners.", zh: "我觉得相对容易调整论证以说服听众。" },
  constraint: { en: "Audiences in my environment rarely reward persuasive speaking.", zh: "我所处环境很少认可说服性发言。" },
});
add("linguistic", "semantic_comprehension", "subtle_meaning", { en: "Subtle meaning comprehension", zh: "细微语义理解" }, {
  desired: { en: "I wish I could grasp subtle differences in word meaning instantly.", zh: "我希望自己能立刻把握词语意义的细微差别。" },
  perceived: { en: "Others notice that I catch subtle meaning differences in language.", zh: "他人注意到我能捕捉语言中的细微语义差别。" },
  ease: { en: "I quickly notice when two words carry different shades of meaning.", zh: "我能快速察觉两个词承载的不同语义色彩。" },
  constraint: { en: "My reading diet has not exposed me to enough subtle vocabulary.", zh: "我的阅读输入不足以接触足够多细微词汇。" },
});
add("linguistic", "pragmatic_sensitivity", "implied_meaning", { en: "Implied meaning detection", zh: "隐含意义识别" }, {
  desired: { en: "I wish I could detect what people imply beyond their literal words.", zh: "我希望自己能识别他人字面之外的隐含意思。" },
  perceived: { en: "Others say I understand what is implied but not stated.", zh: "他人说我能理解未明说的隐含意思。" },
  ease: { en: "I often infer speakers' implied intentions accurately.", zh: "我常能准确推断说话者的隐含意图。" },
  constraint: { en: "Direct communication norms in my context reduce practice with implication.", zh: "我所处环境偏直接沟通，较少练习理解隐含意义。" },
});
add("linguistic", "reading_comprehension", "text_meaning_extraction", { en: "Text meaning extraction", zh: "文本意义提取" }, {
  desired: { en: "I wish I could extract the core meaning from complex texts quickly.", zh: "我希望自己能从复杂文本中快速提取核心意义。" },
  perceived: { en: "Others rely on me to explain what difficult texts mean.", zh: "他人会依赖我解释难懂文本的含义。" },
  ease: { en: "I usually grasp the main point of a text on first reading.", zh: "我通常首次阅读就能把握文本要点。" },
  constraint: { en: "Fatigue often reduces my reading comprehension.", zh: "疲劳常降低我的阅读理解效率。" },
});
add("linguistic", "translation_ability", "cross_language_expression", { en: "Cross-language expression", zh: "跨语言表达" }, {
  desired: { en: "I wish I could express the same idea accurately across two languages.", zh: "我希望自己能在两种语言间准确表达同一想法。" },
  perceived: { en: "Others notice that I translate ideas well between languages.", zh: "他人注意到我能在语言间良好转译想法。" },
  ease: { en: "I can usually find an equivalent expression when switching languages.", zh: "我切换语言时通常能找到等价表达。" },
  constraint: { en: "I lack regular practice using more than one language.", zh: "我缺乏定期使用多语言的练习。" },
});
add("linguistic", "phonological_awareness", "speech_sound_distinction", { en: "Speech sound distinction", zh: "语音辨别" }, {
  desired: { en: "I wish I could notice small differences between speech sounds easily.", zh: "我希望自己能轻松察觉语音之间的细微差别。" },
  perceived: { en: "Others notice that I detect sound differences others miss.", zh: "他人注意到我能听出他人忽略的语音差别。" },
  ease: { en: "I quickly hear when two speech sounds differ.", zh: "我能快速听出两个语音音素的差异。" },
  constraint: { en: "Background noise often prevents me from hearing sound distinctions.", zh: "背景噪音常使我难以辨别语音差别。" },
});
add("linguistic", "pronunciation_accuracy", "clear_sound_production", { en: "Clear sound production", zh: "清晰发音" }, {
  desired: { en: "I wish I could produce speech sounds clearly and consistently.", zh: "我希望自己能清晰一致地发出语音。" },
  perceived: { en: "Others say my pronunciation is clear.", zh: "他人说我的发音清晰。" },
  ease: { en: "I can correct my pronunciation when I notice an error.", zh: "我发现错误时能纠正自己的发音。" },
  constraint: { en: "I have not received enough pronunciation coaching.", zh: "我未获得足够的发音指导。" },
});
add("linguistic", "accent_acquisition", "accent_acquisition", { en: "Accent acquisition", zh: "口音习得" }, {
  desired: { en: "I wish I could acquire new accents and pronunciation patterns more easily.", zh: "我希望自己能更轻松地习得新口音与发音模式。" },
  perceived: { en: "Others notice that I can imitate accents accurately.", zh: "他人注意到我能准确模仿口音。" },
  ease: { en: "I tend to improve quickly when practicing pronunciation patterns.", zh: "我练习发音模式时往往进步较快。" },
  constraint: { en: "Limited exposure or confidence has slowed my pronunciation development.", zh: "接触不足或信心不足拖慢了我的发音发展。" },
});

// —— 2. AUDITORY ——
const auditory = [
  ["pitch_discrimination", "Pitch discrimination", "音高辨别", {
    desired: ["I wish I could tell when two tones differ in pitch.", "我希望自己能分辨两个音高不同的音。"],
    perceived: ["Others notice that I detect pitch differences accurately.", "他人注意到我音高辨别准确。"],
    ease: ["I easily notice when a note is higher or lower than another.", "我容易察觉一个音比另一个更高或更低。"],
    constraint: ["I rarely practice listening for pitch differences.", "我很少练习听辨音高差别。"],
  }],
  ["relative_pitch_memory", "Relative pitch memory", "相对音高记忆", {
    desired: ["I wish I could remember a pitch after hearing it once.", "我希望自己听一次就能记住音高。"],
    perceived: ["Others say I remember melodies after hearing them briefly.", "他人说我短暂听后能记住旋律。"],
    ease: ["I can hold a pitch in mind for comparison with later sounds.", "我能在心中保持音高以便与后续声音比较。"],
    constraint: ["I lack training that develops relative pitch memory.", "我缺乏发展相对音高记忆的训练。"],
  }],
  ["rhythm_perception", "Rhythm perception", "节奏感知", {
    desired: ["I wish I had a strong sense of rhythm in music and speech.", "我希望自己在音乐与言语中都有强节奏感。"],
    perceived: ["Others notice my sensitivity to rhythm.", "他人注意到我对节奏敏感。"],
    ease: ["I quickly sense the beat in music or speech.", "我能快速感知音乐或言语中的节拍。"],
    constraint: ["I have not practiced rhythm perception enough.", "我对节奏感知的练习不足。"],
  }],
  ["beat_synchronization", "Beat synchronization", "节拍同步", {
    desired: ["I wish I could move or tap in perfect time with a beat.", "我希望自己能与节拍完美同步动作或敲击。"],
    perceived: ["Others notice that I stay on beat when clapping or moving.", "他人注意到我拍手或动作时能保持节拍。"],
    ease: ["I naturally synchronize my movements to an external beat.", "我自然能将动作与外部节拍同步。"],
    constraint: ["Coordination practice opportunities are limited for me.", "我缺乏协调练习机会。"],
  }],
  ["melody_recognition", "Melody recognition", "旋律识别", {
    desired: ["I wish I could recognize familiar melodies from short fragments.", "我希望自己能从短片段识别熟悉旋律。"],
    perceived: ["Others notice that I identify melodies quickly.", "他人注意到我识别旋律很快。"],
    ease: ["I recognize melodic contours after hearing them once.", "我听一次就能识别旋律轮廓。"],
    constraint: ["Limited musical exposure slows my melody recognition.", "音乐接触不足拖慢了我的旋律识别。"],
  }],
  ["harmonic_sensitivity", "Harmonic sensitivity", "和声敏感度", {
    desired: ["I wish I could sense when harmonies clash or blend well.", "我希望自己能感知和声冲突或和谐。"],
    perceived: ["Others say I notice harmonic tension in music.", "他人说我会注意音乐中的和声张力。"],
    ease: ["I detect when chords sound consonant or dissonant.", "我能察觉和弦听起来协和或不协和。"],
    constraint: ["I have not learned enough about harmony to refine this sensitivity.", "我未系统学习和声以磨练此敏感度。"],
  }],
  ["timbre_discrimination", "Timbre discrimination", "音色辨别", {
    desired: ["I wish I could distinguish instruments or voices by timbre alone.", "我希望自己仅凭音色就能区分乐器或嗓音。"],
    perceived: ["Others notice that I identify sounds by timbre accurately.", "他人注意到我靠音色识别声音很准。"],
    ease: ["I quickly tell apart similar sounds by their timbre.", "我能靠音色快速区分相似声音。"],
    constraint: ["My listening environment is too noisy for timbre practice.", "我的听音环境过于嘈杂。"],
  }],
  ["vocal_mimicry", "Vocal mimicry", "声音模仿", {
    desired: ["I wish I could imitate unfamiliar speech sounds quickly.", "我希望自己能快速模仿陌生语音。"],
    perceived: ["Others notice that I imitate voices or sounds accurately.", "他人注意到我模仿声音准确。"],
    ease: ["I can reproduce a heard sound after brief listening.", "我短暂听后能复现该声音。"],
    constraint: ["I feel self-conscious when attempting vocal mimicry.", "我在尝试声音模仿时会感到不自在。"],
  }],
];
auditory.forEach(([key, en, zh, t]) => {
  add("auditory", key.replace(/_/g, "_"), key, { en, zh }, {
    desired: { en: t.desired[0], zh: t.desired[1] },
    perceived: { en: t.perceived[0], zh: t.perceived[1] },
    ease: { en: t.ease[0], zh: t.ease[1] },
    constraint: { en: t.constraint[0], zh: t.constraint[1] },
  });
});

// Fix auditory subdomain keys - use same as micro key for flat subdomain
auditory.forEach(([key, en, zh, t]) => {
  const idx = MICROS.length - 1;
  MICROS[idx].subdomain = key;
});

// Continue with remaining domains in part 2 - I'll append via a function

function batchDomain(domain, entries) {
  entries.forEach(([subdomain, key, labelEn, labelZh, items]) => {
    add(domain, subdomain, key, { en: labelEn, zh: labelZh }, items);
  });
}

batchDomain("analytical", [
  ["abstract_reasoning", "abstract_reasoning", "Abstract reasoning", "抽象推理", {
    desired: { en: "I wish I could reason about abstract concepts with ease.", zh: "我希望自己能轻松进行抽象概念推理。" },
    perceived: { en: "Others say I think in abstract terms effectively.", zh: "他人说我善于抽象思考。" },
    ease: { en: "I stay engaged when working with abstract ideas.", zh: "我处理抽象想法时能保持投入。" },
    constraint: { en: "Concrete tasks in my role leave little room for abstract reasoning.", zh: "我的工作偏具体，较少锻炼抽象推理。" },
  }],
  ["deductive_logic", "deductive_logic", "Deductive logic", "演绎逻辑", {
    desired: { en: "I wish I could draw valid conclusions from stated premises.", zh: "我希望自己能从给定前提推出有效结论。" },
    perceived: { en: "Others notice that my arguments follow logical structure.", zh: "他人注意到我的论证有逻辑结构。" },
    ease: { en: "I naturally check whether conclusions follow from premises.", zh: "我自然检查结论是否由前提推出。" },
    constraint: { en: "I have not practiced formal deductive reasoning.", zh: "我缺乏形式演绎推理练习。" },
  }],
  ["inductive_pattern", "inductive_pattern", "Inductive pattern detection", "归纳模式识别", {
    desired: { en: "I wish I could spot patterns that support general conclusions.", zh: "我希望自己能发现支持概括结论的模式。" },
    perceived: { en: "Others notice that I find patterns in data or events.", zh: "他人注意到我能在数据或事件中发现模式。" },
    ease: { en: "I quickly see regularities in new information.", zh: "我能快速在新信息中看到规律性。" },
    constraint: { en: "Sparse data in my environment limits inductive practice.", zh: "环境中数据稀疏限制归纳练习。" },
  }],
  ["causal_inference", "causal_inference", "Causal inference", "因果推断", {
    desired: { en: "I wish I could judge which factors truly cause an outcome.", zh: "我希望自己能判断哪些因素真正导致结果。" },
    perceived: { en: "Others ask me to explain cause-and-effect relationships.", zh: "他人会请我解释因果关系。" },
    ease: { en: "I distinguish correlation from causation reliably.", zh: "我能可靠区分相关与因果。" },
    constraint: { en: "Complex systems around me make causal inference difficult to practice.", zh: "周围复杂系统使因果推断难以练习。" },
  }],
  ["probabilistic_thinking", "probabilistic_thinking", "Probabilistic thinking", "概率思维", {
    desired: { en: "I wish I could reason about uncertainty using probability.", zh: "我希望自己能用概率推理不确定性。" },
    perceived: { en: "Others notice that I estimate likelihoods realistically.", zh: "他人注意到我估算可能性较现实。" },
    ease: { en: "I think in terms of odds when facing uncertain outcomes.", zh: "面对不确定结果时我会用几率思考。" },
    constraint: { en: "I lack training in probabilistic reasoning.", zh: "我缺乏概率推理训练。" },
  }],
  ["mathematical_reasoning", "mathematical_reasoning", "Mathematical reasoning", "数学推理", {
    desired: { en: "I wish I could solve mathematical problems confidently.", zh: "我希望自己能自信解决数学问题。" },
    perceived: { en: "Others see me as strong at mathematical reasoning.", zh: "他人认为我数学推理强。" },
    ease: { en: "I enjoy working through mathematical arguments.", zh: "我喜欢推演数学论证。" },
    constraint: { en: "Gaps in early math education limit my mathematical reasoning.", zh: "早期数学基础缺口限制了我的数学推理。" },
  }],
  ["symbolic_manipulation", "symbolic_manipulation", "Symbolic manipulation", "符号运算", {
    desired: { en: "I wish I could manipulate symbols in formulas without error.", zh: "我希望自己能无误地进行公式符号运算。" },
    perceived: { en: "Others notice that I handle symbolic algebra accurately.", zh: "他人注意到我符号代数处理准确。" },
    ease: { en: "I can rearrange symbolic expressions fluently.", zh: "我能流畅重排符号表达式。" },
    constraint: { en: "I rarely practice symbolic manipulation.", zh: "我很少练习符号运算。" },
  }],
  ["algorithmic_thinking", "algorithmic_thinking", "Algorithmic thinking", "算法思维", {
    desired: { en: "I wish I could design step-by-step procedures to solve problems.", zh: "我希望自己能设计分步程序解决问题。" },
    perceived: { en: "Others notice that I break problems into clear steps.", zh: "他人注意到我能把问题分解为清晰步骤。" },
    ease: { en: "I naturally think in ordered procedural steps.", zh: "我自然按有序步骤思考。" },
    constraint: { en: "My work rarely requires designing algorithms.", zh: "我的工作很少需要设计算法。" },
  }],
]);

// Spatial, Memory, Creative, Systems, Cross-domain, Interpersonal, Leadership, Moral, Operational, Physical
// ... (truncated in script - will complete in full file)

console.log("Micro count:", MICROS.length);
