import { useState } from "react";

const SYSTEM_PROMPT = `你是MindStrategyLab的内容运营智能体。

品牌信息：
- 平台名称：MindStrategyLab
- 核心产品：
  1. CDA（Connection Dynamics Analysis）前身SIS：测量关系为何发生、为何难以进入、是否适合长期发展、关系形式改变后能否长存。四个核心维度：ACT关系启动动力、ENT关系可进入性、COM关系兼容性、TRN关系可转化性
  2. RPS（关系定位系统）：以需求为轴，串联内在状态、权力动态和关系动机三个平面，测试个体在关系中的状态原型及关系风险
  3. TEM（Talent Ecology Matrix）：才能生态矩阵，六个技能点测试，测量希望擅长的、被他人认可的、发展顺畅的和受阻的维度
- 品牌调性：有研究感、不煽情、有自己的框架和立场、克制但有温度
- 目标用户：对自我认知感兴趣、在关系或职场中有困惑、愿意为"想清楚"付费的人

每次生成内容时，你需要根据用户提供的【今日产品】【今日维度/角度】【今日情绪方向】，生成以下内容：

【小红书-图片种草帖】（双语）
- 中文标题（15字以内，有悬念或共鸣感）
- 英文标题（10词以内）
- 中文正文（100-150字，不用bullet，自然口语，结尾引导测试）
- 英文正文（80-120词，同样自然）
- 配图建议（描述用哪类截图或图片，具体到维度和题目）

【小红书-用户故事帖】
- 标题
- 正文（150-200字，第一人称或第三人称虚构用户，真实感强，不夸张，结尾留悬念或反问）
- 互动引导句（评论区第一条该说什么）

【小红书-评论互动帖】
- 一个能引发讨论的问题或争议观点（作为帖子主体）
- 三条预设的"自问自答"评论，模拟真实用户视角

【B站-观点视频脚本】
- 视频标题
- 开场30秒脚本（口播风格，抓住注意力）
- 视频结构提纲（3-5个段落，每段一句话说清楚讲什么）
- 结尾引导语

【B站-话题视频脚本】
- 话题切入角度
- 视频标题（有争议性）
- 完整脚本提纲

所有中文内容：自然、有观点、不过度营销、不用"超级""震惊""必看"等词
所有英文内容：简洁、直接、带有轻微学术感但不枯燥
如果用户提供了"今日新素材"（自己的想法或故事），优先将其融入内容中。`;

const PRODUCTS = ["CDA · Connection Dynamics Analysis", "RPS · 关系定位系统", "TEM · Talent Ecology Matrix"];

const DIMENSIONS = {
  "CDA · Connection Dynamics Analysis": ["ACT · 关系启动动力", "ENT · 关系可进入性", "COM · 关系兼容性", "TRN · 关系可转化性", "综合/不指定"],
  "RPS · 关系定位系统": ["内在状态", "权力动态", "关系动机", "关系风险", "综合/不指定"],
  "TEM · Talent Ecology Matrix": ["希望擅长的", "被他人认可的", "发展顺畅的", "受阻的", "综合/不指定"],
};

const MOODS = ["理性分析", "情绪共鸣", "争议话题", "轻松好奇", "深夜独白感"];

export default function ContentAgent() {
  const [product, setProduct] = useState("");
  const [dimension, setDimension] = useState("");
  const [mood, setMood] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableDimensions = product ? DIMENSIONS[product] : [];

  async function generate() {
    if (!product || !dimension || !mood) return;
    setLoading(true);
    setOutput("");

    const userMessage = `今日产品：${product}
今日维度/角度：${dimension}
今日情绪方向：${mood}
${extraNotes ? `今日新素材：${extraNotes}` : ""}

请生成今日全部内容。`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "生成失败，请重试。";
      setOutput(text);
    } catch {
      setOutput("网络错误，请重试。");
    }
    setLoading(false);
  }

  function copyAll() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 680, margin: "0 auto", padding: "1.5rem 0" }}>

      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--color-text-tertiary)", margin: "0 0 4px", textTransform: "uppercase" }}>MindStrategyLab</p>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: "0 0 4px", color: "var(--color-text-primary)" }}>内容生成智能体</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0 }}>每天填三个空，出五篇内容草稿</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>

        <div>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>今天推哪个产品</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PRODUCTS.map(p => (
              <button key={p} onClick={() => { setProduct(p); setDimension(""); }}
                style={{
                  fontSize: 13, padding: "7px 14px", borderRadius: 100,
                  border: product === p ? "1.5px solid var(--color-border-info)" : "0.5px solid var(--color-border-secondary)",
                  background: product === p ? "var(--color-background-info)" : "var(--color-background-primary)",
                  color: product === p ? "var(--color-text-info)" : "var(--color-text-primary)",
                  cursor: "pointer", transition: "all 0.15s"
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {product && (
          <div>
            <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>今天聚焦哪个维度</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {availableDimensions.map(d => (
                <button key={d} onClick={() => setDimension(d)}
                  style={{
                    fontSize: 13, padding: "7px 14px", borderRadius: 100,
                    border: dimension === d ? "1.5px solid var(--color-border-success)" : "0.5px solid var(--color-border-secondary)",
                    background: dimension === d ? "var(--color-background-success)" : "var(--color-background-primary)",
                    color: dimension === d ? "var(--color-text-success)" : "var(--color-text-primary)",
                    cursor: "pointer", transition: "all 0.15s"
                  }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {dimension && (
          <div>
            <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>今天的情绪方向</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {MOODS.map(m => (
                <button key={m} onClick={() => setMood(m)}
                  style={{
                    fontSize: 13, padding: "7px 14px", borderRadius: 100,
                    border: mood === m ? "1.5px solid var(--color-border-warning)" : "0.5px solid var(--color-border-secondary)",
                    background: mood === m ? "var(--color-background-warning)" : "var(--color-background-primary)",
                    color: mood === m ? "var(--color-text-warning)" : "var(--color-text-primary)",
                    cursor: "pointer", transition: "all 0.15s"
                  }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>
            今日新素材 <span style={{ opacity: 0.5 }}>（可选）— 你的想法、故事、观察，智能体会把它融进内容里</span>
          </label>
          <textarea
            value={extraNotes}
            onChange={e => setExtraNotes(e.target.value)}
            placeholder="比如：今天有个用户说做完测试才发现自己在关系里一直在等对方先靠近……"
            style={{
              width: "100%", minHeight: 80, fontSize: 14, padding: "10px 12px",
              border: "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)",
              background: "var(--color-background-primary)",
              color: "var(--color-text-primary)",
              resize: "vertical", boxSizing: "border-box", lineHeight: 1.6,
              fontFamily: "var(--font-sans)"
            }}
          />
        </div>

      </div>

      <button
        onClick={generate}
        disabled={!product || !dimension || !mood || loading}
        style={{
          width: "100%", padding: "12px 0", fontSize: 14, fontWeight: 500,
          border: "0.5px solid var(--color-border-secondary)",
          borderRadius: "var(--border-radius-md)",
          background: (!product || !dimension || !mood || loading) ? "var(--color-background-secondary)" : "var(--color-background-primary)",
          color: (!product || !dimension || !mood || loading) ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
          cursor: (!product || !dimension || !mood || loading) ? "not-allowed" : "pointer",
          transition: "all 0.15s", marginBottom: 20
        }}>
        {loading ? "生成中，稍等片刻…" : "生成今日内容 ↗"}
      </button>

      {output && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>今日内容草稿</p>
            <button onClick={copyAll}
              style={{
                fontSize: 12, padding: "5px 12px",
                border: "0.5px solid var(--color-border-secondary)",
                borderRadius: "var(--border-radius-md)",
                background: "var(--color-background-primary)",
                color: copied ? "var(--color-text-success)" : "var(--color-text-secondary)",
                cursor: "pointer"
              }}>
              {copied ? "已复制" : "复制全部"}
            </button>
          </div>
          <div style={{
            background: "var(--color-background-secondary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "20px 24px",
            fontSize: 14, lineHeight: 1.8,
            color: "var(--color-text-primary)",
            whiteSpace: "pre-wrap", wordBreak: "break-word"
          }}>
            {output}
          </div>
        </div>
      )}

    </div>
  );
}
