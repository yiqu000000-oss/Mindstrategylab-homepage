# Influence Analysis (影响力分析)

A professional bilingual (English + 中文) static web application for **self-reflection and exploratory research** on influence within collective systems.

This is **not** an entertainment quiz and **not** a clinically validated psychological assessment.

## Purpose

**Influence** is defined here as the extent to which a person can shape other people’s **perceptions, decisions, emotions, behaviors**, and allocation of **attention or resources** within a collective system.

Applicable contexts include:

- Workplace teams (职场)
- School (学校)
- Student organizations (学生组织)
- Friend groups (朋友圈)
- Online communities (网络社群)
- Social media groups (社交媒体)
- Livestream audiences (直播社群)
- Volunteer organizations (志愿组织)
- Other (其他)

## Five Dimensions (五个维度)

The prototype measures influence through five equal-weight dimensions:

1. **Capacity / 能力**
2. **Visibility / 可见度**
3. **Trust / 信任**
4. **Network Position / 网络位置**
5. **Persistence / 持续性**

## Measurement Design

- **30 questions total**
- **6 questions per dimension**
- **Likert slider 1–7**
  - 1 = Strongly Disagree / 非常不同意
  - 4 = Neutral / 中立
  - 7 = Strongly Agree / 非常同意
- Estimated completion time: **5–7 minutes**

## Scoring Model (Prototype)

Equal weighting (exploratory prototype):

\[
\text{Overall Influence}=\frac{\text{Capacity}+\text{Visibility}+\text{Trust}+\text{Network Position}+\text{Persistence}}{5}
\]

The app displays:

- Overall Influence Score
- Five dimension scores
- Radar chart (Chart.js via CDN)
- Influence level classification (prototype thresholds)

## Research & Validation Features

After results, the app asks three optional 1–7 sliders:

1. **Self-rated influence**
2. **Perceived accuracy of results**
3. **Perceived usefulness of results**

An optional open feedback field is also provided.

## Consent

The app requires explicit consent before the assessment can start:

- English: “Your anonymous responses may be used to improve this assessment and support future research and product development.”
- Chinese: “你的匿名回答可能被用于改进本测评，并支持未来的研究与产品开发。”

## Data Architecture (Backend-ready)

This is a static app, but designed to be “backend-ready”:

- On submission, a single anonymous payload is saved to **browser `localStorage`** under:
  - `influence_analysis_submissions_v1`
- Users can download **their data as JSON** from the results page.
- If `API_ENDPOINT` is configured, the same payload is **POSTed as JSON**.

### Configure API endpoint

Edit `config.js`:

```js
const API_ENDPOINT = "";
```

If set to a non-empty URL, the app will `POST`:

- `timestamp`
- `language`
- `context_type`
- `responses` (all 30)
- `dimension_scores` (5)
- `overall_score`
- `self_rated_influence`
- `perceived_accuracy`
- `perceived_usefulness`
- `open_feedback` (optional)
- `consent_given`
- `app_version`

## Commercial Roadmap (Placeholder UI)

The results page includes a **Premium (placeholder)** section:

- Unlock Full Professional Report
- Personalized Strategic Recommendations
- One-on-One Consultation
- Future Advanced Versions

The button **does not** process payments yet. It is a UI placeholder for future product development.

## Project Files

- `index.html` — app UI shell
- `style.css` — premium calm design system
- `script.js` — SPA state, scoring, storage, exports, optional API POST
- `questions.js` — dimensions, contexts, and 30 bilingual questions
- `config.js` — `API_ENDPOINT`, `APP_VERSION`
- `README.md` — documentation

## Run Locally

Because this app loads scripts locally, use a local static server (recommended):

### Option A: Python

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

### Option B: Node (http-server)

```bash
npx http-server -p 8080
```

## Deploy

### GitHub Pages

1. Push these files to a GitHub repo (root directory).
2. In GitHub: **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` (or `master`) and folder `/ (root)`
5. Save. Pages will publish the static site.

### Cloudflare Pages

1. Create a new Pages project and connect your Git repo.
2. **Framework preset**: None
3. **Build command**: (leave empty)
4. **Build output directory**: `/` (root)
5. Deploy.

### Netlify / Vercel

Use a static site deployment:

- **Build command**: none
- **Publish directory**: project root

## Notes / Disclaimer

- This tool is designed for **reflection, leadership development, and exploratory research**.
- It is **not** a clinical diagnostic instrument.
- Scores and classifications are **prototype** outputs and should not be treated as definitive judgments.

