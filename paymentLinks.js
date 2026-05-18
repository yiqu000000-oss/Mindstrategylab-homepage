// paymentLinks.js
// Unified Stripe payment link configuration for Mind Strategy Lab
// ------------------------------------------------------------
// Usage:
// Import this file into any assessment (SIS, RPS, Influence Analysis, etc.)
// and reference the appropriate link when rendering your paywall.
// 
// Example:
// const fullLink = PAYMENT_LINKS.full;
// window.open(fullLink, '_blank');
// 
// IMPORTANT:
// These are Stripe TEST MODE links (Sandbox).
// When you switch Stripe to Live Mode, replace these URLs with the live links.

const PAYMENT_LINKS = {
    // One-time purchase: unlock the complete assessment experience
    full: {
      productName: 'Mind Strategy Lab – Full Test Experience',
      price: 2.99,
      currency: 'USD',
      billingType: 'one_time',
      url: 'https://buy.stripe.com/test_28E14m3Lqg4N63K1sXbjW00'
    },
  
    // One-time purchase: unlock the professional strategic report
    report: {
      productName: 'Mind Strategy Lab – Professional Strategic Report',
      price: 4.99,
      currency: 'USD',
      billingType: 'one_time',
      url: 'https://buy.stripe.com/test_fZu00i4Pu05Pdwc3B5bjW01'
    },
  
    // Monthly subscription: unlock all assessments and reports
    membership: {
      productName: 'Mind Strategy Lab Membership',
      price: 19.99,
      currency: 'USD',
      billingType: 'monthly_subscription',
      url: 'https://buy.stripe.com/test_aFa4gydm09GpeAggnRbjW02'
    }
  };
  
  // Optional helper shortcuts
  const PAYMENT_URLS = {
    full: PAYMENT_LINKS.full.url,
    report: PAYMENT_LINKS.report.url,
    membership: PAYMENT_LINKS.membership.url
  };
  
  // Optional helper functions
  function getPaymentLink(type) {
    return PAYMENT_LINKS[type]?.url || null;
  }
  
  function openPaymentLink(type) {
    const url = getPaymentLink(type);
    if (!url) {
      console.error(`Payment link not found for type: ${type}`);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  // Make available globally for static HTML/JS projects
  window.PAYMENT_LINKS = PAYMENT_LINKS;
  window.PAYMENT_URLS = PAYMENT_URLS;
  window.getPaymentLink = getPaymentLink;
  window.openPaymentLink = openPaymentLink;
  
  // For environments that support modules/CommonJS
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      PAYMENT_LINKS,
      PAYMENT_URLS,
      getPaymentLink,
      openPaymentLink
    };
  }  