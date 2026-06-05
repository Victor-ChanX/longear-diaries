export const SESSION_COOKIE = "le_admin_session";

export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const requireEnv = (name: string): string => {
  const value = process.env[name];

  if (!value || value.length === 0) {
    throw new Error(
      `Missing required env variable: ${name}. Set it in .env.local.`,
    );
  }

  return value;
};

export const getAdminCredentials = () => ({
  password: requireEnv("ADMIN_PASSWORD"),
  username: requireEnv("ADMIN_USERNAME"),
});

export const getSessionSecret = (): Uint8Array => {
  const secret = requireEnv("ADMIN_SESSION_SECRET");

  if (secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be at least 32 characters long.",
    );
  }

  return new TextEncoder().encode(secret);
};
