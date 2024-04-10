export const routes = {
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  dashboard: {
    main: "/dashboard",
    profile: "/dashboard/profile",
    templates: "/dashboard/templates",
    startAgain: "/dashboard/start-again",
    editWill: "/dashboard/will/edit",
    will: "/dashboard/will",
    willSingle: "/dashboard/will/single",
    willRelationship: "/dashboard/will/relationship",
    willFamily: "/dashboard/will/family",
    willCustom: "/dashboard/will/custom/roles",
    willCustomAssets: "/dashboard/will/custom/assets",
    willCustomExecutors: "/dashboard/will/custom/executors",
    billing: {
      main: "/dashboard/billing",
      checkoutComplete: "/dashboard/billing/checkout/complete",
      checkoutCouponComplete: "/dashboard/billing/checkout/coupon-complete",
      checkoutSingle: "/dashboard/billing/checkout/single",
      checkoutRelationship: "/dashboard/billing/checkout/relationship",
      checkoutFamily: "/dashboard/billing/checkout/family",
      checkoutCustom: "/dashboard/billing/checkout/custom",
    },
    review: {
      main: "/dashboard/review",
      single: "/dashboard/review/single",
      relationship: "/dashboard/review/relationship",
      family: "/dashboard/review/family",
      custom: "/dashboard/review/custom",
    },
  },
  notFound: "/not-found",
};

export const apiRoutes = {
  profile: "/api/profile",
  sendCoupon: "/api/emails/couple-coupon",
  billing: {
    paymentIntent: "/api/billing/payment-intent",
    subscription: "/api/billing/subscription",
    validateCoupon: "/api/billing/coupons/validate",
    couponCheckout: "/api/billing/coupons/checkout",
  },
  download: "/api/download",
};
