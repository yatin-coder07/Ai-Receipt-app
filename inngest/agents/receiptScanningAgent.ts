import { createAgent, createTool } from "@inngest/agent-kit";
import { anthropic, openai } from "inngest";
import {z} from "zod"

const parsedPdfTool=createTool({
    name:"parse-pdf",
    description:"Analyzes the given PDF",
    parameters:z.object({
        pdfUrl:z.string(),
    }),
    handler: async ({ pdfUrl }, { step }) => {
        return await step?.ai.infer("parse-pdf", {
            model: anthropic({
                model: "claude-3-5-sonnet-20241022",
                defaultParameters: {
                    max_tokens: 3094,
                },
            }),
            body: {
                messages: [
                    {
                        role: "user",
                        content: [
                        ]
                    }
                ],
            },
        });
    },
    
})

export const receiptScanningAgent = createAgent({
    name: "Receipt Scanning Agent",
    description: "Processes receipt images and PDFs to extract key information such as vendor names, dates, amounts, and line items",
    system: `You are an AI-powered receipt scanning assistant. Your primary role is to accurately extract and structure
relevant information from scanned receipts. Your task includes recognizing and parsing details such as:
- Merchant Information: Store name, address, contact details
- Transaction Details: Date, time, receipt number, payment method
- Itemized Purchases: Product names, quantities, individual prices, discounts
- Total Amounts: Subtotal, taxes, total paid, and any applied discounts
- Ensure high accuracy by detecting OCR errors and correcting misread text when possible.
- Normalize dates, currency values, and formatting for consistency.
- If any key details are missing or unclear, return a structured response indicating incomplete data.
- Handle multiple formats, languages, and varying receipt layouts efficiently.
- Maintain a structured JSON output for easy integration with databases or expense tracking systems.`,
 model:openai({
    model:"gpt-4o-mini",
    defaultParameters:{
        max_completion_tokens:3094
    }
}),
tools:[parsedPdfTool]
});
