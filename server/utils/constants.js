const constants ={
    BAD_REQUEST: "Bad request",
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    EMAIL_ALREADY_EXIST: "User with this email already exist",

    REGISTRATION_FAILED: "User registration failed",
    REGISTRATION_SUCCESS: "User registered successfully",

    LOGIN_SUCCESS:"User logged in successfully",

    TOKEN_MISSING:"Access denied, authorization token is missing",
    INVALID_TOKEN:"Access denied, authorization token is invalid or expired",
    FORBIDDEN:"You do not have permission to perform this action",

    PRICE_LIST_FAILED:"Price listing failed",
    PRICE_LIST_SUCCESS:"Price listed successfully",
    SUBSCRIPTION_FAILED:"Subscription failed",
    SUBSCRIPTION_SUCCESS:"Subscription success",
    PRICE_ID_REQUIRED:"A plan must be selected before subscribing",
    INVALID_PRICE:"The selected plan is not available",
    STRIPE_CUSTOMER_MISSING:"No billing profile found for this account",
    SUBSCRIPTION_ALREADY_ACTIVE:"This account already has an active subscription",
    SESSION_ID_REQUIRED:"Checkout session id is required",
    SUBSCRIPTION_SESSION_INVALID:"Checkout session could not be found",
    SUBSCRIPTION_SESSION_MISMATCH:"This checkout session belongs to another account",
    SUBSCRIPTION_NOT_COMPLETED:"Payment for this checkout session is not complete",
    SUBSCRIPTION_CONFIRMED:"Subscription confirmed successfully",
    SUBSCRIPTION_STATUS_SUCCESS:"Subscription status fetched successfully",

    MOVIE_LIST_FAILED:"Movie listing failed",
    MOVIE_LIST_SUCCESS:"Movie listed successfully",

}

module.exports = constants