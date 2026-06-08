// Support System Dynamics Assessment — configuration

const APP_VERSION = "1.0.0";
const APP_TITLE = "Support System Dynamics Assessment";
const APP_SUBTITLE = "Existential Continuity & Support Accessibility Mapping";

const PROGRESS_STORAGE_KEY = "ssdAssessmentState";
const PREMIUM_UNLOCKED_LS_KEY = "ssdAssessmentPremiumUnlocked";
const PREMIUM_UNLOCK_SOURCE_LS_KEY = "ssdAssessmentUnlockSource";
const PREMIUM_PROMO_CODE_LS_KEY = "ssdAssessmentPromoCode";
/** Stripe success redirect flag — configure Stripe to: .../index.html?premium=1 */
const PAYMENT_SUCCESS_PARAM = "ssd_paid";
const PAYMENT_RETURN_PREMIUM_PARAM = "premium";
const SSD_PAID_UNLOCKED_LS_KEY = "ssd_paid_unlocked";

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
