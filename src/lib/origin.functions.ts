import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

// Social crawlers need absolute image URLs, and the app's host is only known
// per request (preview, published domain, or a custom domain later on).
// Read it server-side instead of hardcoding a host or touching window during SSR.
export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();
  const url = new URL(req.url);
  // x-forwarded-host is proxy-sanitized only behind the sandbox's localhost
  // rewrite; elsewhere it is client-spoofable, so trust the request URL.
  const sandboxHost =
    url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
});
