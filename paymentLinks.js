// paymentLinks.js
// LIVE MODE Stripe links (production)
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
// These are Stripe LIVE MODE links (production).

const PAYMENT_LINKS = {
    // One-time purchase: unlock the complete assessment experience
    full: {
      productName: 'Mind Strategy Lab – Full Test Experience',
      price: 2.99,
      currency: 'USD',
      billingType: 'one_time',
      url: 'https://buy.stripe.com/aFabJ0ads3hDeH43lbeUU02'
    },
  
    // One-time purchase: unlock the professional strategic report
    report: {
      productName: 'Mind Strategy Lab – Professional Strategic Report',
      price: 4.99,
      currency: 'USD',
      billingType: 'one_time',
      url: 'https://buy.stripe.com/00wcN42L06tPaqOg7XeUU00'
    },
  
    // Monthly subscription: unlock all assessments and reports
    membership: {
      productName: 'Mind Strategy Lab Membership',
      price: 19.99,
      currency: 'USD',
      billingType: 'monthly_subscription',
      url: 'https://buy.stripe.com/5kQ4gy4T8f0lfL808ZeUU03'
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