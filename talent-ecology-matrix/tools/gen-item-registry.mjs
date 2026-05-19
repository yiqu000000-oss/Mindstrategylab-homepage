/**
 * Generates item-registry.js — 87 micro-abilities × 4 perspectives
 * Run: node tools/gen-item-registry.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** @type {Array<{domain:string, subdomain:string, key:string, label:{en:string,zh:string}, items:{desired:{en:string,zh:string}, perceived:{en:string,zh:string}, ease:{en:string,zh:string}, constraint:{en:string,zh:string}}}>} */
const ITEM_REGISTRY = [];

function add(domain, subdomain, key, label, items) {
  ITEM_REGISTRY.push({ domain, subdomain, key, label, items });
}

// —— 1. LINGUISTIC (15) ——
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

// —— 2. AUDITORY (8) ——
[
  ["pitch_discrimination", { en: "Pitch discrimination", zh: "音高辨别" }, {
    desired: { en: "I wish I could tell when two tones differ in pitch.", zh: "我希望自己能分辨两个音高不同的音。" },
    perceived: { en: "Others notice that I detect pitch differences accurately.", zh: "他人注意到我音高辨别准确。" },
    ease: { en: "I easily notice when a note is higher or lower than another.", zh: "我容易察觉一个音比另一个更高或更低。" },
    constraint: { en: "I rarely practice listening for pitch differences.", zh: "我很少练习听辨音高差别。" },
  }],
  ["relative_pitch_memory", { en: "Relative pitch memory", zh: "相对音高记忆" }, {
    desired: { en: "I wish I could remember a pitch after hearing it once.", zh: "我希望自己听一次就能记住音高。" },
    perceived: { en: "Others say I remember melodies after hearing them briefly.", zh: "他人说我短暂听后能记住旋律。" },
    ease: { en: "I can hold a pitch in mind for comparison with later sounds.", zh: "我能在心中保持音高以便与后续声音比较。" },
    constraint: { en: "I lack training that develops relative pitch memory.", zh: "我缺乏发展相对音高记忆的训练。" },
  }],
  ["rhythm_perception", { en: "Rhythm perception", zh: "节奏感知" }, {
    desired: { en: "I wish I had a strong sense of rhythm in music and speech.", zh: "我希望自己在音乐与言语中都有强节奏感。" },
    perceived: { en: "Others notice my sensitivity to rhythm.", zh: "他人注意到我对节奏敏感。" },
    ease: { en: "I quickly sense the beat in music or speech.", zh: "我能快速感知音乐或言语中的节拍。" },
    constraint: { en: "I have not practiced rhythm perception enough.", zh: "我对节奏感知的练习不足。" },
  }],
  ["beat_synchronization", { en: "Beat synchronization", zh: "节拍同步" }, {
    desired: { en: "I wish I could move or tap in perfect time with a beat.", zh: "我希望自己能与节拍完美同步动作或敲击。" },
    perceived: { en: "Others notice that I stay on beat when clapping or moving.", zh: "他人注意到我拍手或动作时能保持节拍。" },
    ease: { en: "I naturally synchronize my movements to an external beat.", zh: "我自然能将动作与外部节拍同步。" },
    constraint: { en: "Coordination practice opportunities are limited for me.", zh: "我缺乏协调练习机会。" },
  }],
  ["melody_recognition", { en: "Melody recognition", zh: "旋律识别" }, {
    desired: { en: "I wish I could recognize familiar melodies from short fragments.", zh: "我希望自己能从短片段识别熟悉旋律。" },
    perceived: { en: "Others notice that I identify melodies quickly.", zh: "他人注意到我识别旋律很快。" },
    ease: { en: "I recognize melodic contours after hearing them once.", zh: "我听一次就能识别旋律轮廓。" },
    constraint: { en: "Limited musical exposure slows my melody recognition.", zh: "音乐接触不足拖慢了我的旋律识别。" },
  }],
  ["harmonic_sensitivity", { en: "Harmonic sensitivity", zh: "和声敏感度" }, {
    desired: { en: "I wish I could sense when harmonies clash or blend well.", zh: "我希望自己能感知和声冲突或和谐。" },
    perceived: { en: "Others say I notice harmonic tension in music.", zh: "他人说我会注意音乐中的和声张力。" },
    ease: { en: "I detect when chords sound consonant or dissonant.", zh: "我能察觉和弦听起来协和或不协和。" },
    constraint: { en: "I have not learned enough about harmony to refine this sensitivity.", zh: "我未系统学习和声以磨练此敏感度。" },
  }],
  ["timbre_discrimination", { en: "Timbre discrimination", zh: "音色辨别" }, {
    desired: { en: "I wish I could distinguish instruments or voices by timbre alone.", zh: "我希望自己仅凭音色就能区分乐器或嗓音。" },
    perceived: { en: "Others notice that I identify sounds by timbre accurately.", zh: "他人注意到我靠音色识别声音很准。" },
    ease: { en: "I quickly tell apart similar sounds by their timbre.", zh: "我能靠音色快速区分相似声音。" },
    constraint: { en: "My listening environment is too noisy for timbre practice.", zh: "我的听音环境过于嘈杂。" },
  }],
  ["vocal_mimicry", { en: "Vocal mimicry", zh: "声音模仿" }, {
    desired: { en: "I wish I could imitate unfamiliar speech sounds quickly.", zh: "我希望自己能快速模仿陌生语音。" },
    perceived: { en: "Others notice that I imitate voices or sounds accurately.", zh: "他人注意到我模仿声音准确。" },
    ease: { en: "I can reproduce a heard sound after brief listening.", zh: "我短暂听后能复现该声音。" },
    constraint: { en: "I feel self-conscious when attempting vocal mimicry.", zh: "我在尝试声音模仿时会感到不自在。" },
  }],
].forEach(([key, label, items]) => add("auditory", key, key, label, items));

// —— 3. ANALYTICAL (8) ——
[
  ["abstract_reasoning", { en: "Abstract reasoning", zh: "抽象推理" }, {
    desired: { en: "I wish I could reason about abstract concepts with ease.", zh: "我希望自己能轻松进行抽象概念推理。" },
    perceived: { en: "Others say I think in abstract terms effectively.", zh: "他人说我善于抽象思考。" },
    ease: { en: "I stay engaged when working with abstract ideas.", zh: "我处理抽象想法时能保持投入。" },
    constraint: { en: "Concrete tasks in my role leave little room for abstract reasoning.", zh: "我的工作偏具体，较少锻炼抽象推理。" },
  }],
  ["deductive_logic", { en: "Deductive logic", zh: "演绎逻辑" }, {
    desired: { en: "I wish I could draw valid conclusions from stated premises.", zh: "我希望自己能从给定前提推出有效结论。" },
    perceived: { en: "Others notice that my arguments follow logical structure.", zh: "他人注意到我的论证有逻辑结构。" },
    ease: { en: "I naturally check whether conclusions follow from premises.", zh: "我自然检查结论是否由前提推出。" },
    constraint: { en: "I have not practiced formal deductive reasoning.", zh: "我缺乏形式演绎推理练习。" },
  }],
  ["inductive_pattern", { en: "Inductive pattern detection", zh: "归纳模式识别" }, {
    desired: { en: "I wish I could spot patterns that support general conclusions.", zh: "我希望自己能发现支持概括结论的模式。" },
    perceived: { en: "Others notice that I find patterns in data or events.", zh: "他人注意到我能在数据或事件中发现模式。" },
    ease: { en: "I quickly see regularities in new information.", zh: "我能快速在新信息中看到规律性。" },
    constraint: { en: "Sparse data in my environment limits inductive practice.", zh: "环境中数据稀疏限制归纳练习。" },
  }],
  ["causal_inference", { en: "Causal inference", zh: "因果推断" }, {
    desired: { en: "I wish I could judge which factors truly cause an outcome.", zh: "我希望自己能判断哪些因素真正导致结果。" },
    perceived: { en: "Others ask me to explain cause-and-effect relationships.", zh: "他人会请我解释因果关系。" },
    ease: { en: "I distinguish correlation from causation reliably.", zh: "我能可靠区分相关与因果。" },
    constraint: { en: "Complex systems around me make causal inference difficult to practice.", zh: "周围复杂系统使因果推断难以练习。" },
  }],
  ["probabilistic_thinking", { en: "Probabilistic thinking", zh: "概率思维" }, {
    desired: { en: "I wish I could reason about uncertainty using probability.", zh: "我希望自己能用概率推理不确定性。" },
    perceived: { en: "Others notice that I estimate likelihoods realistically.", zh: "他人注意到我估算可能性较现实。" },
    ease: { en: "I think in terms of odds when facing uncertain outcomes.", zh: "面对不确定结果时我会用几率思考。" },
    constraint: { en: "I lack training in probabilistic reasoning.", zh: "我缺乏概率推理训练。" },
  }],
  ["mathematical_reasoning", { en: "Mathematical reasoning", zh: "数学推理" }, {
    desired: { en: "I wish I could solve mathematical problems confidently.", zh: "我希望自己能自信解决数学问题。" },
    perceived: { en: "Others see me as strong at mathematical reasoning.", zh: "他人认为我数学推理强。" },
    ease: { en: "I enjoy working through mathematical arguments.", zh: "我喜欢推演数学论证。" },
    constraint: { en: "Gaps in early math education limit my mathematical reasoning.", zh: "早期数学基础缺口限制了我的数学推理。" },
  }],
  ["symbolic_manipulation", { en: "Symbolic manipulation", zh: "符号运算" }, {
    desired: { en: "I wish I could manipulate symbols in formulas without error.", zh: "我希望自己能无误地进行公式符号运算。" },
    perceived: { en: "Others notice that I handle symbolic algebra accurately.", zh: "他人注意到我符号代数处理准确。" },
    ease: { en: "I can rearrange symbolic expressions fluently.", zh: "我能流畅重排符号表达式。" },
    constraint: { en: "I rarely practice symbolic manipulation.", zh: "我很少练习符号运算。" },
  }],
  ["algorithmic_thinking", { en: "Algorithmic thinking", zh: "算法思维" }, {
    desired: { en: "I wish I could design step-by-step procedures to solve problems.", zh: "我希望自己能设计分步程序解决问题。" },
    perceived: { en: "Others notice that I break problems into clear steps.", zh: "他人注意到我能把问题分解为清晰步骤。" },
    ease: { en: "I naturally think in ordered procedural steps.", zh: "我自然按有序步骤思考。" },
    constraint: { en: "My work rarely requires designing algorithms.", zh: "我的工作很少需要设计算法。" },
  }],
].forEach(([key, label, items]) => add("analytical", key, key, label, items));

// —— 4. SPATIAL (6) ——
[
  ["mental_rotation", { en: "Mental rotation", zh: "心理旋转" }, {
    desired: { en: "I wish I could rotate shapes in my mind to match a target orientation.", zh: "我希望自己能在心中旋转图形以匹配目标朝向。" },
    perceived: { en: "Others notice that I solve rotation puzzles quickly.", zh: "他人注意到我解旋转类谜题很快。" },
    ease: { en: "I can picture an object turning in space without moving it.", zh: "我能在脑中想象物体在空间中转动的样子。" },
    constraint: { en: "I rarely encounter tasks that require mental rotation practice.", zh: "我很少遇到需要心理旋转练习的任务。" },
  }],
  ["geometric_visualization", { en: "Geometric visualization", zh: "几何可视化" }, {
    desired: { en: "I wish I could visualize geometric relationships in problems clearly.", zh: "我希望自己能在问题中清晰想象几何关系。" },
    perceived: { en: "Others say I explain geometric ideas with clear mental pictures.", zh: "他人说我解释几何概念时画面感清晰。" },
    ease: { en: "I form clear mental images of lines, angles, and surfaces.", zh: "我能对线条、角度与曲面形成清晰心像。" },
    constraint: { en: "Flat screen work limits how often I practice geometric visualization.", zh: "平面屏幕工作限制了几何可视化练习。" },
  }],
  ["layout_planning", { en: "Spatial layout planning", zh: "空间布局规划" }, {
    desired: { en: "I wish I could plan how objects fit together in a space before arranging them.", zh: "我希望自己能在摆放前规划物体在空间中的布局。" },
    perceived: { en: "Others ask me to arrange rooms or displays effectively.", zh: "他人会请我有效布置房间或陈列。" },
    ease: { en: "I naturally imagine where items should go before I place them.", zh: "我摆放前自然能想象物品应放何处。" },
    constraint: { en: "I lack access to spaces where I can practice layout planning.", zh: "我缺乏可练习布局规划的实际空间。" },
  }],
  ["map_orientation", { en: "Map orientation", zh: "地图定向" }, {
    desired: { en: "I wish I could orient myself quickly using maps in unfamiliar places.", zh: "我希望自己能在陌生地点借助地图快速定向。" },
    perceived: { en: "Others rely on me to read maps and find directions.", zh: "他人依赖我看地图找方向。" },
    ease: { en: "I match my position to a map without getting turned around.", zh: "我能将自身位置与地图对应而不迷失方向。" },
    constraint: { en: "Navigation apps reduce how often I practice map orientation.", zh: "导航应用减少了我练习地图定向的机会。" },
  }],
  ["structural_visualization", { en: "Structural visualization", zh: "结构可视化" }, {
    desired: { en: "I wish I could picture how parts connect inside a structure.", zh: "我希望自己能想象结构内部零件如何连接。" },
    perceived: { en: "Others notice that I visualize internal structure well.", zh: "他人注意到我善于想象内部结构。" },
    ease: { en: "I see how components fit together when looking at an assembly.", zh: "我看装配体时能看出零件如何配合。" },
    constraint: { en: "I rarely handle physical assemblies that build structural visualization.", zh: "我很少接触能锻炼结构可视化的实体装配。" },
  }],
  ["engineering_intuition", { en: "Engineering intuition", zh: "工程直觉" }, {
    desired: { en: "I wish I could sense whether a design will work before building it.", zh: "我希望自己能在建造前判断设计是否可行。" },
    perceived: { en: "Others notice that I spot design flaws early.", zh: "他人注意到我能及早发现设计缺陷。" },
    ease: { en: "I quickly judge whether a mechanism or structure seems sound.", zh: "我能快速判断机构或结构是否可靠。" },
    constraint: { en: "My projects rarely involve hands-on engineering judgment.", zh: "我的项目很少涉及实体工程判断。" },
  }],
].forEach(([key, label, items]) => add("spatial", key, key, label, items));

// —— 5. MEMORY (6) ——
[
  ["rote_memorization", { en: "Rote memorization", zh: "机械记忆" }, {
    desired: { en: "I wish I could memorize lists or passages through repetition with ease.", zh: "我希望自己能通过重复轻松记住列表或段落。" },
    perceived: { en: "Others notice that I recall memorized material accurately.", zh: "他人注意到我背诵内容准确。" },
    ease: { en: "Repeated reading helps me lock information into memory.", zh: "反复阅读能帮我将信息牢固记住。" },
    constraint: { en: "I find rote repetition tedious and avoid it.", zh: "我觉得机械重复枯燥而回避。" },
  }],
  ["long_term_retention", { en: "Long-term retention", zh: "长期保持" }, {
    desired: { en: "I wish I could retain learned material over months without forgetting.", zh: "我希望自己数月后仍能记住所学内容。" },
    perceived: { en: "Others say I remember details from long ago.", zh: "他人说我能记住很久以前的细节。" },
    ease: { en: "Information I learned years ago often stays accessible.", zh: "我多年前学过的信息往往仍可调取。" },
    constraint: { en: "Infrequent review causes long-term retention to fade for me.", zh: "复习不足使我的长期记忆逐渐消退。" },
  }],
  ["pattern_recall", { en: "Pattern recall", zh: "模式回忆" }, {
    desired: { en: "I wish I could recall recurring patterns in data or sequences.", zh: "我希望自己能回忆数据或序列中的重复模式。" },
    perceived: { en: "Others notice that I remember patterns others overlook.", zh: "他人注意到我能记住他人忽略的模式。" },
    ease: { en: "I recognize a familiar pattern when it appears again.", zh: "模式再次出现时我能认出。" },
    constraint: { en: "Noisy information makes pattern recall harder for me.", zh: "嘈杂信息使我更难回忆模式。" },
  }],
  ["formula_retention", { en: "Formula retention", zh: "公式保持" }, {
    desired: { en: "I wish I could keep formulas in memory and apply them when needed.", zh: "我希望自己能将公式记在脑中并在需要时运用。" },
    perceived: { en: "Others rely on me to recall formulas during work or study.", zh: "他人依赖我在工作或学习中回忆公式。" },
    ease: { en: "Formulas tend to stick in my memory after I use them.", zh: "公式用过之后往往能留在记忆里。" },
    constraint: { en: "I rarely use formulas, so they do not stay in memory.", zh: "我很少使用公式，因而难以保持。" },
  }],
  ["sequential_memory", { en: "Sequential memory", zh: "顺序记忆" }, {
    desired: { en: "I wish I could remember the exact order of steps or items.", zh: "我希望自己能记住步骤或项目的准确顺序。" },
    perceived: { en: "Others notice that I reproduce sequences in the right order.", zh: "他人注意到我能按正确顺序复现序列。" },
    ease: { en: "I retain step-by-step procedures in the correct sequence.", zh: "我能按正确顺序记住分步流程。" },
    constraint: { en: "Interruptions often break my sequential memory.", zh: "打断常破坏我的顺序记忆。" },
  }],
  ["retrieval_speed", { en: "Memory retrieval speed", zh: "提取速度" }, {
    desired: { en: "I wish I could retrieve stored facts quickly under pressure.", zh: "我希望自己在压力下能快速提取已记信息。" },
    perceived: { en: "Others notice that I answer from memory with little delay.", zh: "他人注意到我凭记忆回答几乎不迟疑。" },
    ease: { en: "Known facts come to mind quickly when I need them.", zh: "需要时已知事实往往很快浮现。" },
    constraint: { en: "Stress slows my memory retrieval speed.", zh: "压力会拖慢我的记忆提取速度。" },
  }],
].forEach(([key, label, items]) => add("memory", key, key, label, items));

// —— 6. CREATIVE (5) ——
[
  ["novel_idea_generation", { en: "Novel idea generation", zh: "新颖想法生成" }, {
    desired: { en: "I wish I could generate ideas that feel genuinely new to me.", zh: "我希望自己能产生对自己而言真正新颖的想法。" },
    perceived: { en: "Others describe my ideas as original or unexpected.", zh: "他人形容我的想法原创或出人意料。" },
    ease: { en: "Fresh ideas often appear when I brainstorm without filtering.", zh: "我不加过滤地头脑风暴时常冒出新点子。" },
    constraint: { en: "Fear of judgment blocks my novel idea generation.", zh: "怕被评价阻碍了我产生新颖想法。" },
  }],
  ["symbolic_transformation", { en: "Symbolic transformation", zh: "符号转化" }, {
    desired: { en: "I wish I could transform one symbol or image into another meaning creatively.", zh: "我希望自己能将一种符号或意象创造性地转化为另一种含义。" },
    perceived: { en: "Others notice that I rework symbols in inventive ways.", zh: "他人注意到我以发明性方式改造符号。" },
    ease: { en: "I enjoy reshaping symbols to express new meanings.", zh: "我喜欢重塑符号以表达新义。" },
    constraint: { en: "My daily tasks rarely call for symbolic transformation.", zh: "日常任务很少需要符号转化。" },
  }],
  ["artistic_visualization", { en: "Artistic visualization", zh: "艺术意象" }, {
    desired: { en: "I wish I could picture vivid scenes or compositions before creating them.", zh: "我希望自己能在创作前想象生动场景或构图。" },
    perceived: { en: "Others say my creative work shows strong inner imagery.", zh: "他人说我的创作呈现强烈内心意象。" },
    ease: { en: "I see colors, forms, or scenes clearly in my mind before making art.", zh: "我动手前能在心中清晰看见色彩、形态或场景。" },
    constraint: { en: "I lack time and space to develop artistic visualization.", zh: "我缺乏发展艺术意象的时间与空间。" },
  }],
  ["metaphorical_thinking", { en: "Metaphorical thinking", zh: "隐喻思维" }, {
    desired: { en: "I wish I could explain difficult ideas through apt metaphors.", zh: "我希望自己能用贴切隐喻解释难懂概念。" },
    perceived: { en: "Others notice that I use metaphors that clarify complex topics.", zh: "他人注意到我的隐喻能澄清复杂话题。" },
    ease: { en: "I spontaneously compare unfamiliar ideas to familiar images.", zh: "我自然会把陌生概念比作熟悉意象。" },
    constraint: { en: "Technical environments discourage metaphorical expression around me.", zh: "我所处技术环境不鼓励隐喻表达。" },
  }],
  ["divergent_thinking", { en: "Divergent thinking", zh: "发散思维" }, {
    desired: { en: "I wish I could list many different solutions to a single problem.", zh: "我希望自己能为同一问题列出多种不同解法。" },
    perceived: { en: "Others notice that I propose many alternatives in brainstorming.", zh: "他人注意到我在头脑风暴中提出多种备选。" },
    ease: { en: "One prompt often leads me to several distinct solution paths.", zh: "一个提示常能引我走向几条不同解决路径。" },
    constraint: { en: "Early convergence on one answer limits my divergent thinking practice.", zh: "过早锁定单一答案限制了我的发散练习。" },
  }],
].forEach(([key, label, items]) => add("creative", key, key, label, items));

// —— 7. SYSTEMS (6) ——
[
  ["mechanism_extraction", { en: "Mechanism extraction", zh: "机制提取" }, {
    desired: { en: "I wish I could extract the underlying mechanism from a complex event.", zh: "我希望自己能从复杂事件中提取底层机制。" },
    perceived: { en: "Others ask me to explain how something really works.", zh: "他人会请我解释事物真正如何运作。" },
    ease: { en: "I quickly identify cause-and-effect mechanisms in situations.", zh: "我能快速识别情境中的因果机制。" },
    constraint: { en: "Opaque systems in my environment hide mechanisms from practice.", zh: "周围不透明系统使我难以练习机制提取。" },
  }],
  ["model_building", { en: "Model building", zh: "模型构建" }, {
    desired: { en: "I wish I could build simple models that capture how a system behaves.", zh: "我希望自己能构建捕捉系统行为的简明模型。" },
    perceived: { en: "Others notice that I sketch models to explain systems.", zh: "他人注意到我用模型解释系统。" },
    ease: { en: "I naturally simplify reality into workable models.", zh: "我自然会把现实简化为可用模型。" },
    constraint: { en: "I lack tools or mentorship for serious model building.", zh: "我缺乏认真建模的工具或指导。" },
  }],
  ["theory_construction", { en: "Theory construction", zh: "理论建构" }, {
    desired: { en: "I wish I could construct coherent theories from scattered observations.", zh: "我希望自己能从零散观察建构连贯理论。" },
    perceived: { en: "Others say I connect observations into a unified theory.", zh: "他人说我会把观察整合为统一理论。" },
    ease: { en: "I enjoy assembling principles into an explanatory framework.", zh: "我喜欢把原则组装成解释框架。" },
    constraint: { en: "Short deadlines leave no time for theory construction.", zh: "紧迫截止期使我无暇建构理论。" },
  }],
  ["experience_to_framework", { en: "Experience-to-framework translation", zh: "经验转框架" }, {
    desired: { en: "I wish I could turn lived experience into a reusable framework.", zh: "我希望自己能把亲身经验转化为可复用框架。" },
    perceived: { en: "Others notice that I generalize from experience into principles.", zh: "他人注意到我会从经验概括出原则。" },
    ease: { en: "After an experience, I often articulate lessons as a framework.", zh: "经历之后我常把教训表述为框架。" },
    constraint: { en: "I rarely reflect systematically enough to build frameworks from experience.", zh: "我很少系统反思，难以从经验建框架。" },
  }],
  ["theory_to_practice", { en: "Theory-to-practice translation", zh: "理论转实践" }, {
    desired: { en: "I wish I could translate theory into concrete practical steps.", zh: "我希望自己能把理论转化为具体实践步骤。" },
    perceived: { en: "Others notice that I apply theory in actionable ways.", zh: "他人注意到我以可执行方式应用理论。" },
    ease: { en: "I map abstract principles onto daily actions naturally.", zh: "我自然把抽象原则对应到日常行动。" },
    constraint: { en: "My context rewards quick action over theory-to-practice translation.", zh: "我所处环境重快速行动轻理论落地。" },
  }],
  ["hidden_structure_identification", { en: "Hidden structure identification", zh: "隐藏结构识别" }, {
    desired: { en: "I wish I could spot hidden structure beneath surface chaos.", zh: "我希望自己能识别表面混乱下的隐藏结构。" },
    perceived: { en: "Others say I see order where they see only noise.", zh: "他人说我在他们只见噪音处看见秩序。" },
    ease: { en: "I sense underlying patterns behind messy situations.", zh: "我能感知混乱情境下的底层模式。" },
    constraint: { en: "Incomplete information blocks my hidden structure identification.", zh: "信息不全阻碍我识别隐藏结构。" },
  }],
].forEach(([key, label, items]) => add("systems", key, key, label, items));

// —— 8. CROSS_DOMAIN (7) — FLAGSHIP ——
[
  ["numerical_visual_mapping", { en: "Numerical–visual mapping", zh: "数形对应" }, {
    desired: { en: "I wish I could map equations or numeric relations onto geometric diagrams in my head.", zh: "我希望自己能在心中把方程或数量关系对应到几何图形上。" },
    perceived: { en: "Others notice that I explain math by drawing shapes or graphs.", zh: "他人注意到我用图形或坐标图解释数学。" },
    ease: { en: "When I see a formula, a corresponding shape or graph often appears mentally.", zh: "我看到公式时，心中常浮现对应图形或函数图像。" },
    constraint: { en: "Courses that separate algebra from geometry limit my numerical–visual mapping practice.", zh: "代数与几何分科教学限制了我练习数形对应。" },
  }],
  ["theory_phenomenon_translation", { en: "Theory–phenomenon translation", zh: "理论现象转译" }, {
    desired: { en: "I wish I could translate a real-world phenomenon into the terms of a formal theory.", zh: "我希望自己能把现实现象转译成形式理论的术语。" },
    perceived: { en: "Others notice that I describe events using theoretical language accurately.", zh: "他人注意到我准确用理论语言描述事件。" },
    ease: { en: "I match observations to theoretical constructs without much effort.", zh: "我较轻松地把观察对应到理论构念。" },
    constraint: { en: "I lack exposure to theories that fit the phenomena I care about.", zh: "我缺乏与所关心现象匹配的理论接触。" },
  }],
  ["analogical_mapping", { en: "Cross-domain analogical mapping", zh: "跨域类比映射" }, {
    desired: { en: "I wish I could map a problem in one field onto a solution pattern from another.", zh: "我希望自己能把一个领域的问题映射到另一领域的解法模式。" },
    perceived: { en: "Others notice that I solve problems by analogy across disciplines.", zh: "他人注意到我靠跨学科类比解决问题。" },
    ease: { en: "I spontaneously see parallels between problems in different domains.", zh: "我自然看见不同领域问题之间的平行关系。" },
    constraint: { en: "Specialized training in one field narrows my analogical mapping range.", zh: "单一领域的专精训练缩小了我的类比映射范围。" },
  }],
  ["interdisciplinary_synthesis", { en: "Interdisciplinary synthesis", zh: "跨学科综合" }, {
    desired: { en: "I wish I could synthesize insights from two or more disciplines into one coherent view.", zh: "我希望自己能把两个以上学科的洞见综合为一致观点。" },
    perceived: { en: "Others say I integrate ideas from different fields unusually well.", zh: "他人说我异常善于整合不同领域想法。" },
    ease: { en: "I enjoy weaving together concepts from separate subject areas.", zh: "我喜欢把不同学科的概念编织在一起。" },
    constraint: { en: "Institutional silos reduce opportunities for interdisciplinary synthesis.", zh: "体制壁垒减少了我跨学科综合的机会。" },
  }],
  ["structural_similarity_recognition", { en: "Structural similarity recognition", zh: "结构相似识别" }, {
    desired: { en: "I wish I could recognize when two systems share the same underlying structure.", zh: "我希望自己能识别两个系统是否具有相同底层结构。" },
    perceived: { en: "Others notice that I point out structural parallels across unlike examples.", zh: "他人注意到我指出看似不同例子间的结构平行。" },
    ease: { en: "I spot isomorphic structure even when surface details differ.", zh: "即使表面细节不同，我也能发现同构结构。" },
    constraint: { en: "I rarely compare systems side by side, which limits structural similarity practice.", zh: "我很少并排比较系统，限制了结构相似练习。" },
  }],
  ["concept_transfer", { en: "Concept transfer", zh: "概念迁移" }, {
    desired: { en: "I wish I could transfer a concept learned in one context to a new context successfully.", zh: "我希望自己能把在一种情境学到的概念成功迁移到新情境。" },
    perceived: { en: "Others notice that I apply ideas from one project to another domain.", zh: "他人注意到我把一个项目的想法用到另一领域。" },
    ease: { en: "I adapt a familiar concept when facing a novel situation.", zh: "面对新情境时我会改造熟悉概念以适用。" },
    constraint: { en: "Context-bound training makes concept transfer harder for me.", zh: "情境绑定的训练使我更难做概念迁移。" },
  }],
  ["disciplinary_reframing", { en: "Disciplinary reframing", zh: "学科重构" }, {
    desired: { en: "I wish I could reframe a problem using another discipline's core questions.", zh: "我希望自己能用另一学科的核心问题重构一个问题。" },
    perceived: { en: "Others notice that I ask reframing questions from outside their field.", zh: "他人注意到我提出来自其领域之外的重构问题。" },
    ease: { en: "I shift perspective by adopting another field's framing habits.", zh: "我借另一学科的框架习惯转换视角。" },
    constraint: { en: "Peer norms in my field discourage disciplinary reframing.", zh: "同侪规范不鼓励我进行学科重构。" },
  }],
].forEach(([key, label, items]) => add("cross_domain", key, key, label, items));

// —— 9. INTERPERSONAL (5) ——
[
  ["emotion_recognition", { en: "Emotion recognition", zh: "情绪识别" }, {
    desired: { en: "I wish I could read others' emotions from facial expression and tone.", zh: "我希望自己能从表情与语气读出他人情绪。" },
    perceived: { en: "Others say I notice how people feel before they say it.", zh: "他人说我在对方开口前就能察觉其感受。" },
    ease: { en: "I pick up emotional cues in conversation quickly.", zh: "我在对话中能快速捕捉情绪线索。" },
    constraint: { en: "Masked or indirect expression in my culture makes emotion recognition harder.", zh: "我所处文化中表情含蓄使我更难识别情绪。" },
  }],
  ["motive_inference", { en: "Motive inference", zh: "动机推断" }, {
    desired: { en: "I wish I could infer what motivates someone's behavior accurately.", zh: "我希望自己能准确推断他人行为背后的动机。" },
    perceived: { en: "Others notice that I explain why people act as they do.", zh: "他人注意到我会解释他人为何如此行动。" },
    ease: { en: "I form plausible hypotheses about others' motives in social situations.", zh: "我在社交情境中常能对他人动机形成合理假设。" },
    constraint: { en: "Misleading behavior around me weakens my motive inference practice.", zh: "周围误导性行为削弱了我的动机推断练习。" },
  }],
  ["social_pattern_detection", { en: "Social pattern detection", zh: "社会模式察觉" }, {
    desired: { en: "I wish I could detect recurring patterns in how groups interact.", zh: "我希望自己能察觉群体互动中的重复模式。" },
    perceived: { en: "Others notice that I name patterns in team or group dynamics.", zh: "他人注意到我会点明团队或群体动态中的模式。" },
    ease: { en: "I see familiar interaction loops when I observe a group.", zh: "观察群体时我能看见熟悉的互动循环。" },
    constraint: { en: "I am often outside key groups, which limits social pattern detection.", zh: "我常处于关键群体之外，限制了社会模式察觉。" },
  }],
  ["conflict_diagnosis", { en: "Conflict diagnosis", zh: "冲突诊断" }, {
    desired: { en: "I wish I could diagnose the root of interpersonal conflict early.", zh: "我希望自己能及早诊断人际冲突的根源。" },
    perceived: { en: "Others ask me to help understand what a conflict is really about.", zh: "他人会请我帮忙理解冲突真正症结。" },
    ease: { en: "I separate positions from underlying needs when conflicts arise.", zh: "冲突发生时我能把立场与底层需求分开。" },
    constraint: { en: "Avoiding conflict reduces my conflict diagnosis practice.", zh: "回避冲突减少了我练习冲突诊断的机会。" },
  }],
  ["perspective_taking", { en: "Perspective taking", zh: "换位思考" }, {
    desired: { en: "I wish I could adopt another person's viewpoint convincingly.", zh: "我希望自己能有说服力地采纳他人视角。" },
    perceived: { en: "Others feel understood when I reflect their perspective back.", zh: "他人感到我复述其视角时被理解。" },
    ease: { en: "I imagine how a situation looks from someone else's position.", zh: "我能想象某事在他人位置上是什么样子。" },
    constraint: { en: "Strong disagreement habits make perspective taking harder for me.", zh: "强烈的对立习惯使我更难换位思考。" },
  }],
].forEach(([key, label, items]) => add("interpersonal", key, key, label, items));

// —— 10. LEADERSHIP (5) ——
[
  ["persuasion", { en: "Persuasive influence", zh: "说服影响" }, {
    desired: { en: "I wish I could change others' minds through reasoned persuasion.", zh: "我希望自己能用有理有据的说服改变他人想法。" },
    perceived: { en: "Others say I influence decisions when I argue a case.", zh: "他人说我论证时会影响决策。" },
    ease: { en: "I adjust my message until it resonates with my audience.", zh: "我会调整信息直到与听众产生共鸣。" },
    constraint: { en: "Hierarchical settings limit how much persuasion I can practice.", zh: "层级环境限制了我练习说服的空间。" },
  }],
  ["group_coordination", { en: "Group coordination", zh: "群体协调" }, {
    desired: { en: "I wish I could coordinate group efforts so everyone moves in sync.", zh: "我希望自己能协调群体努力使众人同步推进。" },
    perceived: { en: "Others notice that I keep group tasks aligned.", zh: "他人注意到我能使群体任务保持一致。" },
    ease: { en: "I clarify roles and timelines so a group can work together.", zh: "我澄清角色与时间线以便群体协作。" },
    constraint: { en: "I am rarely placed in formal coordination roles.", zh: "我很少担任正式协调角色。" },
  }],
  ["attention_direction", { en: "Attention direction", zh: "注意力引导" }, {
    desired: { en: "I wish I could direct a group's attention to what matters most.", zh: "我希望自己能引导群体关注最重要的事。" },
    perceived: { en: "Others notice that I refocus discussions when they drift.", zh: "他人注意到我在讨论偏离时能重新聚焦。" },
    ease: { en: "I signal priorities so others know where to focus.", zh: "我会标示优先级让他人知道聚焦何处。" },
    constraint: { en: "Competing voices in meetings limit my attention direction practice.", zh: "会议中竞争性发言限制了我练习注意力引导。" },
  }],
  ["strategic_communication", { en: "Strategic communication", zh: "战略沟通" }, {
    desired: { en: "I wish I could communicate plans strategically to align stakeholders.", zh: "我希望自己能战略性地沟通计划以对齐利益相关方。" },
    perceived: { en: "Others rely on me to frame messages for different audiences.", zh: "他人依赖我为不同受众框定信息。" },
    ease: { en: "I tailor what I say to the listener's concerns and goals.", zh: "我会根据听众关切与目标调整表达。" },
    constraint: { en: "Rushed communication norms reduce strategic communication practice.", zh: "仓促沟通规范减少了我练习战略沟通的机会。" },
  }],
  ["decision_leadership", { en: "Decision leadership", zh: "决策领导" }, {
    desired: { en: "I wish I could lead groups to clear decisions under uncertainty.", zh: "我希望自己能在不确定下带领群体做出清晰决策。" },
    perceived: { en: "Others look to me when a group must decide.", zh: "群体需要决断时他人会看向我。" },
    ease: { en: "I summarize options and facilitate a decision when stakes are high.", zh: "利害重大时我会归纳选项并促成决策。" },
    constraint: { en: "Shared accountability structures reduce my decision leadership practice.", zh: "共担责任结构减少了我练习决策领导的机会。" },
  }],
].forEach(([key, label, items]) => add("leadership", key, key, label, items));

// —— 11. MORAL (4) ——
[
  ["ethical_reasoning", { en: "Ethical reasoning", zh: "伦理推理" }, {
    desired: { en: "I wish I could reason through ethical dilemmas with clarity.", zh: "我希望自己能清晰推理伦理困境。" },
    perceived: { en: "Others notice that I weigh moral considerations carefully.", zh: "他人注意到我审慎权衡道德考量。" },
    ease: { en: "I examine who is affected and which principles apply in moral questions.", zh: "面对道德问题时我会检视受影响者与适用原则。" },
    constraint: { en: "Moral disagreement in my environment makes ethical reasoning stressful.", zh: "环境中的道德分歧使伦理推理充满压力。" },
  }],
  ["fairness_assessment", { en: "Fairness assessment", zh: "公平评估" }, {
    desired: { en: "I wish I could judge whether a rule or outcome is fair.", zh: "我希望自己能判断规则或结果是否公平。" },
    perceived: { en: "Others notice that I flag unfair treatment or outcomes.", zh: "他人注意到我会指出不公平的对待或结果。" },
    ease: { en: "I compare how costs and benefits are distributed across people.", zh: "我会比较成本与收益在众人间的分配。" },
    constraint: { en: "Power imbalances discourage open fairness assessment around me.", zh: "权力不对等使公开公平评估难以进行。" },
  }],
  ["principle_evaluation", { en: "Principle evaluation", zh: "原则评价" }, {
    desired: { en: "I wish I could evaluate which principles should guide a decision.", zh: "我希望自己能评价何种原则应指导一项决策。" },
    perceived: { en: "Others say I articulate the principles behind my judgments.", zh: "他人说我会阐明判断背后的原则。" },
    ease: { en: "I test actions against explicit principles I hold.", zh: "我会用自己所持的明确原则检验行动。" },
    constraint: { en: "Situational pressure pushes me to skip principle evaluation.", zh: "情境压力常使我跳过原则评价。" },
  }],
  ["tradeoff_analysis", { en: "Moral tradeoff analysis", zh: "道德权衡分析" }, {
    desired: { en: "I wish I could analyze tradeoffs between competing moral values.", zh: "我希望自己能分析相互竞争的道德价值之间的权衡。" },
    perceived: { en: "Others notice that I name tradeoffs rather than pretending there are none.", zh: "他人注意到我会点明权衡而非假装没有代价。" },
    ease: { en: "I weigh harms and benefits when values conflict.", zh: "价值冲突时我会权衡伤害与收益。" },
    constraint: { en: "Binary moral rhetoric around me limits nuanced tradeoff analysis.", zh: "周围非黑即白的道德话语限制了我做细致权衡。" },
  }],
].forEach(([key, label, items]) => add("moral", key, key, label, items));

// —— 12. OPERATIONAL (4) ——
[
  ["fine_motor_coordination", { en: "Fine motor coordination", zh: "精细动作协调" }, {
    desired: { en: "I wish I could perform precise hand movements with steady control.", zh: "我希望自己能用稳定控制完成精细手部动作。" },
    perceived: { en: "Others notice that my fine hand work is accurate.", zh: "他人注意到我的精细手部操作准确。" },
    ease: { en: "Small precise movements feel natural in my hands.", zh: "小幅精准动作对我来说很自然。" },
    constraint: { en: "Fatigue or tremor limits my fine motor coordination.", zh: "疲劳或颤抖限制了我的精细动作协调。" },
  }],
  ["procedural_accuracy", { en: "Procedural accuracy", zh: "流程准确度" }, {
    desired: { en: "I wish I could follow multi-step procedures without skipping steps.", zh: "我希望自己能执行多步流程而不漏步。" },
    perceived: { en: "Others trust me to execute procedures correctly.", zh: "他人信任我能正确执行流程。" },
    ease: { en: "I check each step against the procedure as I work.", zh: "我工作时会对照流程逐步核对。" },
    constraint: { en: "Time pressure causes me to sacrifice procedural accuracy.", zh: "时间压力使我牺牲流程准确度。" },
  }],
  ["tool_manipulation", { en: "Tool manipulation", zh: "工具操作" }, {
    desired: { en: "I wish I could handle tools or instruments with skilled control.", zh: "我希望自己能熟练操控工具或仪器。" },
    perceived: { en: "Others notice that I use tools effectively.", zh: "他人注意到我使用工具有效。" },
    ease: { en: "I adapt quickly when learning a new tool or instrument.", zh: "我学习新工具或仪器时适应较快。" },
    constraint: { en: "I lack access to tools needed to build manipulation skill.", zh: "我缺乏可培养操作技能的工具条件。" },
  }],
  ["hands_on_learning", { en: "Hands-on learning", zh: "动手学习" }, {
    desired: { en: "I wish I could master skills faster by doing them physically.", zh: "我希望自己通过动手能更快掌握技能。" },
    perceived: { en: "Others notice that I learn best through direct practice.", zh: "他人注意到我通过直接实践学得最好。" },
    ease: { en: "Physical practice helps me understand faster than reading alone.", zh: "实体练习比单纯阅读更能帮我理解。" },
    constraint: { en: "Abstract training formats reduce my hands-on learning opportunities.", zh: "抽象培训形式减少了我动手学习的机会。" },
  }],
].forEach(([key, label, items]) => add("operational", key, key, label, items));

// —— 13. PHYSICAL (4) ——
[
  ["balance", { en: "Physical balance", zh: "身体平衡" }, {
    desired: { en: "I wish I could maintain balance on unstable surfaces confidently.", zh: "我希望自己能在不稳定表面上自信保持平衡。" },
    perceived: { en: "Others notice that I stay steady when balance is challenged.", zh: "他人注意到我在平衡受挑战时仍很稳。" },
    ease: { en: "I recover quickly when I lose balance slightly.", zh: "轻微失衡时我能快速恢复。" },
    constraint: { en: "Injury or limited practice space restricts my balance development.", zh: "伤病或练习空间不足限制了我的平衡发展。" },
  }],
  ["movement_learning", { en: "Movement learning", zh: "动作学习" }, {
    desired: { en: "I wish I could learn new movement sequences quickly.", zh: "我希望自己能快速学会新的动作序列。" },
    perceived: { en: "Others notice that I pick up new physical routines fast.", zh: "他人注意到我掌握新身体套路很快。" },
    ease: { en: "Repeated practice helps me internalize new movements.", zh: "反复练习能帮我内化新动作。" },
    constraint: { en: "I lack coaching that accelerates movement learning.", zh: "我缺乏能加速动作学习的指导。" },
  }],
  ["body_awareness", { en: "Body awareness", zh: "身体觉察" }, {
    desired: { en: "I wish I could sense my body's position and tension accurately.", zh: "我希望自己能准确感知身体位置与紧张度。" },
    perceived: { en: "Others notice that I adjust posture or movement with awareness.", zh: "他人注意到我有意识地调整姿势或动作。" },
    ease: { en: "I notice when a muscle group is tense or misaligned.", zh: "我能察觉某肌群紧张或错位。" },
    constraint: { en: "Sedentary habits reduce my body awareness practice.", zh: "久坐习惯减少了我练习身体觉察的机会。" },
  }],
  ["athletic_adaptation", { en: "Athletic adaptation", zh: "运动适应" }, {
    desired: { en: "I wish I could adapt quickly to new sports or physical demands.", zh: "我希望自己能快速适应新运动或新的身体要求。" },
    perceived: { en: "Others notice that I adjust to new athletic challenges quickly.", zh: "他人注意到我适应新运动挑战较快。" },
    ease: { en: "My body adapts within a few sessions to new physical tasks.", zh: "我的身体几次训练内就能适应新体能任务。" },
    constraint: { en: "Irregular training schedules slow my athletic adaptation.", zh: "训练不规律拖慢了我的运动适应。" },
  }],
].forEach(([key, label, items]) => add("physical", key, key, label, items));

// Validate
const keys = new Set();
for (const e of ITEM_REGISTRY) {
  if (keys.has(e.key)) throw new Error(`Duplicate key: ${e.key}`);
  keys.add(e.key);
}
if (ITEM_REGISTRY.length !== 83) {
  throw new Error(`Expected 83 taxonomy entries, got ${ITEM_REGISTRY.length}`);
}

const out = `// Auto-generated psychometric item registry
const ITEM_REGISTRY = ${JSON.stringify(ITEM_REGISTRY, null, 2)};
`;

writeFileSync(join(root, "item-registry.js"), out, "utf8");
console.log(`Wrote item-registry.js with ${ITEM_REGISTRY.length} micro-abilities.`);
