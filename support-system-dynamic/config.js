// Support System Dynamics Assessment — configuration

const APP_VERSION = "1.0.0";
const APP_TITLE = "Support System Dynamics Assessment";
const APP_SUBTITLE = "Existential Continuity & Support Accessibility Mapping";

const PROGRESS_STORAGE_KEY = "ssdAssessmentState";
const PREMIUM_UNLOCKED_LS_KEY = "ssdAssessmentPremiumUnlocked";
const PREMIUM_UNLOCK_SOURCE_LS_KEY = "ssdAssessmentUnlockSource";
const PREMIUM_PROMO_CODE_LS_KEY = "ssdAssessmentPromoCode";
/**
 * Stripe success redirect — configure Stripe to:
 * https://mindstrategylab.com/support-system-dynamic/index.html?ssd_access=msl_2026_s6d9f1k8q2premium
 */
const SSD_ACCESS_PARAM = "ssd_access";
const SSD_ACCESS_TOKEN = "msl_2026_s6d9f1k8q2premium";
const SSD_PAID_UNLOCKED_LS_KEY = "ssd_paid_unlocked";

/** All localStorage keys treated as premium unlock flags (any one "true" unlocks). */
const SSD_PREMIUM_UNLOCK_LS_KEYS = [
  SSD_PAID_UNLOCKED_LS_KEY,
  "ssd_premium_unlocked",
  "support_system_dynamic_premium_unlocked",
  "supportSystemDynamicPremiumUnlocked",
  "premiumUnlocked",
  PREMIUM_UNLOCKED_LS_KEY,
];

const SSD_STRIPE_PAYMENT_LINK = "https://buy.stripe.com/eVq6oGfxMcSd9mKf3TeUU07";
const PREMIUM_PRICE_DISPLAY = "$4.99";

const LIKERT_LABELS = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree",
];

const AGE_RANGES = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55–64",
  "65+",
  "Prefer not to say",
];

const LIFE_STRUCTURE_OPTIONS = [
  "student",
  "working",
  "freelance",
  "entrepreneur",
  "caregiver",
  "unemployed",
  "transitioning",
  "long-term unstable situation",
];

const SOCIAL_IDENTITY_OPTIONS = [
  "local resident",
  "immigrant",
  "international student",
  "temporary worker",
  "refugee/asylum seeker",
  "long-term traveler",
  "mixed / complex identity",
];

const STRESS_SOURCE_OPTIONS = [
  "financial",
  "academic",
  "work",
  "health",
  "identity/meaning",
  "family",
  "relationship",
  "uncertainty",
  "burnout",
  "instability",
];

const SUPPORT_SOURCE_OPTIONS = [
  "self",
  "partner",
  "family",
  "friends",
  "online communities",
  "work structure",
  "beliefs/meaning",
  "no stable support",
];

const NEURODIVERSITY_OPTIONS = [
  "ADHD",
  "Autism / ASD",
  "Dyslexia",
  "Dyspraxia",
  "Anxiety-related",
  "Depression-related",
  "Other neurodivergence",
  "Prefer not to say",
];
