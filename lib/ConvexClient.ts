import { ConvexHttpClient } from "convex/browser";
// create a convex HTTP clinet for server side actions
export const convex = new ConvexHttpClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
);
