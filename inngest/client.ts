import { Inngest } from "inngest";

//create a client to sent and recieve events
export const inngest = new Inngest({
  id: "scanUs",
  // Add environment configuration
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});