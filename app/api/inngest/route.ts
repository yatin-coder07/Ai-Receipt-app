import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { extractAndSavePDF } from "@/inngest/agent";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    extractAndSavePDF
    /* your functions will be passed here later! */
  ],
});