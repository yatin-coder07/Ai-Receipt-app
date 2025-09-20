import { ConvexHttpClient } from "convex/browser";

// create a convex HTTP client for server side actions
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "NEXT_PUBLIC_CONVEX_URL environment variable is not set. " +
    "Please set it to your Convex deployment URL (e.g., https://your-deployment.convex.cloud). " +
    "You can find this URL in your Convex dashboard."
  );
}

export const convex = new ConvexHttpClient(convexUrl);
