// Talent Ecology Matrix — configuration
// Set API_ENDPOINT to POST anonymous submissions (e.g. Google Apps Script / backend).
const API_ENDPOINT = "";

const APP_VERSION = "0.3.0-modular-premium";

const STORAGE_KEY = "talent_ecology_matrix_submissions_v1";

/** Stripe Payment Link — set success redirect in Stripe to:
 *  https://mindstrategylab.com/talent-ecology-matrix?tem_paid=true
 */
const TEM_STRIPE_PAYMENT_LINK = "https://buy.stripe.com/bJedR84T8aK5fL8cVLeUU04";

/** @deprecated Use TEM_STRIPE_PAYMENT_LINK */
const STRIPE_PAYMENT_LINK = TEM_STRIPE_PAYMENT_LINK;

const PREMIUM_PRICE_DISPLAY = "$4.99";

/** Query param on Stripe success redirect — must be `?tem_paid=true` to unlock premium. */
const PAYMENT_SUCCESS_PARAM = "tem_paid";

/** Canonical localStorage key for all assessment progress (no login). */
const PROGRESS_STORAGE_KEY = "talentEcologyMatrixState";

/** Legacy keys migrated into PROGRESS_STORAGE_KEY on load. */
const LEGACY_PROGRESS_KEYS = [
  "talent_ecology_matrix_progress_v2",
  "talent_ecology_matrix_progress_v1",
];

/** Set localStorage `tem_debug=1` or add ?debug=1 to show the data pipeline panel. */
const TEM_DEBUG_STORAGE_FLAG = "tem_debug";

/** Minimum completed domain modules before meta / matrix unlocks. */
const MIN_MODULES_FOR_META = 6;

/** Founder-authorized promo code (exact match, case-sensitive after trim). */
const TEM_FOUNDER_PROMO_CODE = "ANDY200008";

/** Standalone premium unlock flags (promo / special access). */
const PREMIUM_UNLOCKED_LS_KEY = "talentEcologyMatrixPremiumUnlocked";
const PREMIUM_UNLOCK_SOURCE_LS_KEY = "talentEcologyMatrixUnlockSource";
const PREMIUM_PROMO_CODE_LS_KEY = "talentEcologyMatrixPromoCode";
