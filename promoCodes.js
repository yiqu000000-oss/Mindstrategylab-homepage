(function () {
  "use strict";

  const promoCodes = [
    {
      code: "ANDY200008",
      assignedTo: "Andy",
      unlockScope: "all_tests",
      testIds: [],
      unlockTypes: ["full", "report", "vip"],
      expiresAt: null,
      maxUses: null,
      usedCount: 0,
      description: "Private VIP unlimited access code",
    },
    {
      code: "BETA-001",
      assignedTo: "Beta User 001",
      unlockScope: "single_test",
      testIds: ["strategic-intimacy"],
      unlockTypes: ["full"],
      expiresAt: "2026-12-31",
      maxUses: 1,
      usedCount: 0,
      description: "Single-use beta access for Strategic Intimacy Simulator full experience",
    },
    {
      code: "MEMBER-2026-05",
      assignedTo: "May 2026 Member",
      unlockScope: "all_tests",
      testIds: [],
      unlockTypes: ["full", "report", "vip"],
      expiresAt: "2026-05-31",
      maxUses: null,
      usedCount: 0,
      isSubscriptionCode: true,
      description: "May 2026 subscription member code",
    },
  ];

  /*
   * In production, promo code usage should be validated and stored server-side to prevent abuse.
   * This static beta system is for local/front-end testing only; usedCount is not durable.
   */

  function normalizeCode(code) {
    return String(code || "").trim().toUpperCase();
  }

  function findPromoCode(code) {
    const normalized = normalizeCode(code);
    return promoCodes.find((promoCode) => promoCode.code.toUpperCase() === normalized) || null;
  }

  function isExpired(expiresAt) {
    if (!expiresAt) return false;
    const expiry = new Date(`${expiresAt}T23:59:59`);
    return Number.isNaN(expiry.getTime()) || expiry < new Date();
  }

  function coversTest(promoCode, testId) {
    return promoCode.unlockScope === "all_tests" || promoCode.testIds.includes(testId);
  }

  function coversUnlockType(promoCode, unlockType) {
    return promoCode.unlockTypes.includes(unlockType) || promoCode.unlockTypes.includes("vip");
  }

  function hasUsesRemaining(promoCode) {
    return promoCode.maxUses === null || promoCode.usedCount < promoCode.maxUses;
  }

  function validatePromoCode(code, testId, unlockType) {
    const promoCode = findPromoCode(code);
    if (!promoCode) return { valid: false, reason: "invalid" };
    if (isExpired(promoCode.expiresAt)) return { valid: false, reason: "expired", promoCode };
    if (!hasUsesRemaining(promoCode)) return { valid: false, reason: "exhausted", promoCode };
    if (!coversTest(promoCode, testId)) return { valid: false, reason: "wrong_test", promoCode };
    if (!coversUnlockType(promoCode, unlockType)) {
      return { valid: false, reason: "wrong_type", promoCode };
    }
    return { valid: true, reason: "accepted", promoCode };
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

  function unlockWithPromoCode(code, testId, unlockType) {
    const validation = validatePromoCode(code, testId, unlockType);
    if (!validation.valid) return validation;

    validation.promoCode.usedCount += 1;
    return {
      valid: true,
      reason: "accepted",
      promoCode: validation.promoCode,
      grant: {
        testId: validation.promoCode.unlockScope === "all_tests" ? "*" : testId,
        unlockType,
        source: "promo",
        code: validation.promoCode.code,
      },
    };
  }

  window.MSLAccessControl = {
    promoCodes,
    validatePromoCode,
    canAccessProduct,
    unlockWithPromoCode,
  };
})();
