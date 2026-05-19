# Talent Ecology Matrix / 天赋生态矩阵

Psychometric bilingual self-assessment prototype for Mind Strategy Lab.

## Architecture

| Level | File | Description |
|-------|------|-------------|
| Major domains | `taxonomy.js` → `TAXONOMY` | 13 domains (Cross-Domain Integration = flagship) |
| Subdomains | `taxonomy.js` | Grouped micro-abilities |
| Micro-abilities | `item-registry.js` → `ITEM_REGISTRY` | 83 single-trait indicators |
| Items | `ASSESSMENT_QUESTIONS` | 332 items (83 × 4 perspectives) |

**Perspectives:** Desired · Socially Perceived · Developmental Ease · Constraint

**Scoring:** Item → Micro → Subdomain → Major Domain → Overall (`scoring.js` v2)

## Product flow

1. Landing → 2. Informed Consent → 3. Background Information → 4. Module Dashboard → 5. Per-module assessment → 6. **Free Results Preview** (after `MIN_MODULES_FOR_META` modules) → 7. **Premium unlock** ($4.99 via Stripe) → 8. Full Premium Report → 9. Optional research validation

## Modular dashboard

- **13 domain cards** — title, description, status, progress bar, Start/Continue.
- **Per module:** domain Venn, perspective scores, Resource Ecology recommendations.
- **Progress:** `localStorage` key `PROGRESS_STORAGE_KEY` — includes `premium_unlocked`.
- **Stripe:** set `TEM_STRIPE_PAYMENT_LINK` in `config.js`; configure Payment Link success redirect to `?tem_paid=true` on your report URL.

## Interpretation engine

`interpretations.js` provides reusable narrative interpretation:

- Score labels (0–100 → Exceptional … Very Low) in EN/ZH
- Generic and perspective-specific narratives
- Pattern combinations (A–G)
- Per-domain sections (meaning, manifestations, careers, development, friction)
- Micro-ability one-liners and overall prose summary
- `templateRegistry.register()` for future template packs

## Scripts (load order)

1. `config.js`
2. `item-registry.js`
3. `taxonomy.js` (builds `ASSESSMENT_QUESTIONS`)
4. `recommendations.js`
5. `interpretations.js`
6. `scoring.js`
7. `storage.js`
8. `premium-report.js`
9. `translations.js` — bilingual UI strings (`TEM_I18N`, UTF-8)
10. `script.js`

All text files are saved as **UTF-8 without BOM**. `index.html` includes `<meta charset="UTF-8" />`.

```bash
node tools/verify-encoding.mjs   # CI-style check for required Chinese labels
node tools/detect-mojibake.mjs     # Warn if common mojibake byte patterns appear
```

## Extend the bank

1. Add an entry to `ITEM_REGISTRY` in `item-registry.js` (or edit `tools/gen-item-registry.mjs` and regenerate).
2. Add subdomain metadata in `TAXONOMY` if needed.
3. Scoring and UI pick up new items automatically.

## Regenerate items

```bash
node tools/gen-item-registry.mjs
```

## Run locally

Open `index.html` or serve the folder statically.

## Backend / email

Configure `API_ENDPOINT` and `CONSULT_EMAIL` in `config.js`.
