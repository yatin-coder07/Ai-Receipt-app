import { inngest } from "./client";
import Events from "./constants";

// Simple Inngest function without the complex agent kit
export const extractAndSavePDF = inngest.createFunction(
  {
    id: "extract-pdf-and-save-in-database",
    description: "Extracts data from PDF and saves to database"
  },
  {
    event: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE
  },
  async ({ event, step }) => {
    console.log("🚀 Inngest function triggered!");
    console.log("Event data:", event.data);
    
    try {
      // Step 1: Parse the PDF
      const parsedData = await step.run("parse-pdf", async () => {
        console.log("📄 Parsing PDF from URL:", event.data.url);
        
        // For now, return mock data - you can integrate with your AI service later
        return {
          merchant: {
            name: "Sample Store",
            address: "123 Main St, City, Country",
            contact: "+123456789"
          },
          transaction: {
            date: "2024-01-15",
            receipt_number: "RCP123456",
            payment_method: "Credit Card"
          },
          items: [
            {
              name: "Sample Item",
              quantity: 1,
              unit_price: 10.00,
              total_price: 10.00
            }
          ],
          total: {
            subtotal: 10.00,
            tax: 1.00,
            total: 11.00,
            currency: "USD"
          }
        };
      });

      // Step 2: Save to database
      const saveResult = await step.run("save-to-database", async () => {
        console.log("💾 Saving data to database for receipt:", event.data.receiptId);
        
        // Import Convex client dynamically to avoid circular imports
        const { convex } = await import("@/lib/ConvexClient");
        const { api } = await import("@/convex/_generated/api");
        
        try {
          const result = await convex.mutation(api.receipts.updateReceiptWithExtractedData, {
            id: event.data.receiptId,
            fileDisplayName: "Processed Receipt",
            merchantName: parsedData.merchant.name,
            merchantAddress: parsedData.merchant.address,
            merchantContact: parsedData.merchant.contact,
            transactionDate: parsedData.transaction.date,
            transactionAmount: parsedData.total.total.toString(),
            currency: parsedData.total.currency,
            receiptSummary: `Receipt from ${parsedData.merchant.name} for $${parsedData.total.total} on ${parsedData.transaction.date}`,
            items: parsedData.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              unitPrice: item.unit_price,
              totalPrice: item.total_price,
            }))
          });
          
          console.log("✅ Successfully saved to database");
          return { success: true, result };
        } catch (error) {
          console.error("❌ Failed to save to database:", error);
          return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
        }
      });

      console.log("🎉 PDF processing completed successfully!");
      return saveResult;
      
    } catch (error) {
      console.error("❌ PDF processing failed:", error);
      throw error;
    }
  }
);
