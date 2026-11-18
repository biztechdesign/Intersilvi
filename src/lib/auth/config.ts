/**
 * Authentication rules shown in the forms.
 * PROVISIONAL: no backend exists in this prototype, so these mirror a common minimum. Replace them with the real
 * backend's password rules when the storefront is connected, and keep the form copy in step with them.
 */
export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_ROUTES = {
  login: "/account/login",
  register: "/account/register",
  forgotPassword: "/account/forgot-password",
  account: "/account",
} as const;
