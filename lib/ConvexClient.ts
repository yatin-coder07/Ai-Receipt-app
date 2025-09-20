import { ConvexHttpClient } from "convex/browser";

// create a convex HTTP client for server side actions
let convexClient: ConvexHttpClient | null = null;

function getConvexClient(): ConvexHttpClient {
  if (convexClient) {
    return convexClient;
  }

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL environment variable is not set. " +
      "Please set it to your Convex deployment URL (e.g., https://your-deployment.convex.cloud). " +
      "You can find this URL in your Convex dashboard."
    );
  }

  convexClient = new ConvexHttpClient(convexUrl);
  return convexClient;
}

export const convex = {
  mutation: async (api: any, args: any) => {
    const client = getConvexClient();
    return client.mutation(api, args);
  },
  query: async (api: any, args: any) => {
    const client = getConvexClient();
    return client.query(api, args);
  },
  action: async (api: any, args: any) => {
    const client = getConvexClient();
    return client.action(api, args);
  }
};
