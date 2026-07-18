import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "agency_admin_session";
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

// Retrieve secret or generate a fallback based on admin credentials
function getSessionSecret(): string {
  const secret = process.env.CLOUDINARY_API_SECRET || process.env.ADMIN_PASSWORD || "agency_default_fallback_secret_key";
  return secret;
}

export function signSession(): string {
  const secret = getSessionSecret();
  const expiry = Date.now() + SESSION_EXPIRY_MS;
  const data = `admin:${expiry}`;
  
  // Create SHA256 HMAC signature
  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  
  return `${data}:${signature}`;
}

export function verifySession(token: string): boolean {
  if (!token) return false;
  
  const parts = token.split(":");
  if (parts.length !== 3) return false;
  
  const [role, expiryStr, signature] = parts;
  if (role !== "admin") return false;
  
  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || expiry < Date.now()) return false;
  
  const secret = getSessionSecret();
  const data = `admin:${expiry}`;
  
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  
  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

export function setSessionCookie() {
  const token = signSession();
  
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_EXPIRY_MS / 1000,
    path: "/",
  });
}

export function removeSessionCookie() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export function checkAuth(): boolean {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }
  
  return verifySession(sessionCookie.value);
}
