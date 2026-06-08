(function () {
  "use strict";

  const DEMO_ACCESS_CODE = "000000";

  function normalizeAccessCode(code) {
    return String(code || "").trim();
  }

  /**
   * Demo-only premium unlock for live presentation/testing. Do not use client-side promo codes for production access control. Real premium access must be verified server-side.
   *
   * Future production flow:
   * - POST { code, toolId } to Supabase Edge Function / backend API
   * - Backend validates against secure database (expiration, usage limits, allowed tools)
   * - Frontend unlocks premium only when backend returns valid
   */
  async function validatePremiumAccessCode(code, toolId) {
    const normalized = normalizeAccessCode(code);

    // TODO: replace with secure backend validation, e.g.:
    // const res = await fetch("/api/validate-access-code", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ code: normalized, toolId }),
    // });
    // return res.json();

    if (normalized === DEMO_ACCESS_CODE) {
      return {
        valid: true,
        reason: "demo",
        toolId: toolId || null,
        unlockType: "premium",
        source: "demo",
      };
    }

    return {
      valid: false,
      reason: "invalid",
      toolId: toolId || null,
    };
  }

  /** @deprecated Use validatePremiumAccessCode instead. */
  async function validatePromoCode(code, testId, unlockType) {
    const result = await validatePremiumAccessCode(code, testId);
    if (!result.valid) return { valid: false, reason: result.reason };
    return { valid: true, reason: "demo", unlockType: unlockType || "full" };
  }

  /** @deprecated Use validatePremiumAccessCode instead. */
  async function unlockWithPromoCode(code, testId, unlockType) {
    const validation = await validatePromoCode(code, testId, unlockType);
    if (!validation.valid) return validation;
    return {
      valid: true,
      reason: "demo",
      grant: {
        testId: testId || "*",
        unlockType: unlockType || "full",
        source: "demo",
      },
    };
  }

  function canAccessProduct(userAccess, testId, unlockType) {
    const grants = Array.isArray(userAccess) ? userAccess : userAccess?.grants;
    if (!Array.isArray(grants)) return false;
    return grants.some(
      (grant) =>
        (grant.testId === testId || grant.testId === "*") &&
        (grant.unlockType === unlockType || grant.unlockType === "vip"),
    );
  }

  window.MSLAccessControl = {
    validatePremiumAccessCode,
    validatePromoCode,
    canAccessProduct,
    unlockWithPromoCode,
  };
})();
