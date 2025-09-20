import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";

// Store a receipt file and add it to the database
export const storeReceipt = mutation({
  args: {
    userId: v.string(),
    fileName: v.string(),
    fileId: v.id("_storage"),
    size: v.number(),
    mimeType: v.string(),
  },
  handler: async (ctx, args) => {
    // Save the receipt to the database
    const receiptId = await ctx.db.insert("receipts", {
      userId: args.userId,
      filename: args.fileName,
      fileDisplayName: args.fileName,
      fileId: args.fileId,
      uploadedAt: Date.now(),
      size: args.size,
      numberType: args.mimeType,
      status: "pending",
      // Initialize extracted data fields as null
      merchantName: undefined,
      merchantAddress: undefined,
      merchantContact: undefined,
      transactionDate: undefined,
      transactionAmount: undefined,
      currency: undefined,
      items: [],
    });
    return receiptId;
  }
});

// Get all receipts for a user
export const getReceipts = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db

      .query("receipts")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  }
});

// 3. Function to get a single receipt by ID (with security check)
export const getReceiptById = query({
    args: {
      id: v.id("receipts"), // Note: Changed from "receipt" to "receipts" to match our table name
    },
    handler: async (ctx, args) => {
      // First get the receipt from database
      const receipt = await ctx.db.get(args.id);
  
      // Security check - only allow access if:
      // 1. User is logged in
      // 2. The receipt belongs to them
      if (receipt) {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
          throw new Error("Not authenticated - please log in");
        }
        
        const userId = identity.subject;
        if (receipt.userId !== userId) {
          throw new Error("Not authorized - you don't own this receipt");
        }
      }
  
      return receipt; // Return the receipt if all checks pass
    },
  });

  // 4. Get download URL for a receipt file
export const getReceiptDownloadUrl = query({
    args: { fileId: v.id("_storage") },
    handler: async (ctx, args) => {
      return await ctx.storage.getUrl(args.fileId);
    }
  });
  export const getUploadUrl = action({
    args: { },
    handler: async (ctx ) => {
      return await ctx.storage.generateUploadUrl();
    }
  });
  // 5. Update receipt status (NEW FUNCTION)
  export const updateReceiptStatus = mutation({
    args: {
      id: v.id("receipts"),
      status: v.string(),
    },
    handler: async (ctx, args) => {
      // 1. Find the receipt
      const receipt = await ctx.db.get(args.id);
      if (!receipt) throw new Error("Receipt not found");
  
      // 2. Check user permissions
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Please login first");
      if (receipt.userId !== identity.subject) throw new Error("Not your receipt");
  
      // 3. Update the status
      await ctx.db.patch(args.id, { status: args.status });
      return true;
    }
  });

  // Delete a receipt and its associated file from storage
export const deleteReceipt = mutation({
    args: {
      id: v.id("receipts"),  // Corrected from "receipt" to match our table name
    },
    handler: async (ctx, args) => {
      // 1. Find the receipt in database
      const receipt = await ctx.db.get(args.id);
      if (!receipt) {
        throw new Error("Receipt not found");
      }
  
      // 2. Verify user permissions
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Please login first");
      }
      
      const userId = identity.subject;
      if (receipt.userId !== userId) {
        throw new Error("Not authorized to delete this receipt");
      }
  
      // 3. Delete the associated file from storage
      if (receipt.fileId) {
        await ctx.storage.delete(receipt.fileId);
      }
  
      // 4. Delete the database record
      await ctx.db.delete(args.id);
  
      return true; // Confirm successful deletion
    },
  });


  // Update a receipt with extracted data from OCR processing
export const updateReceiptWithExtractedData = mutation({
    args: {
      id: v.id("receipts"), // Corrected to match our table name
      fileDisplayName: v.string(),
      merchantName: v.string(),
      merchantAddress: v.string(),
      merchantContact: v.string(),
      transactionDate: v.string(),
      transactionAmount: v.string(),
      currency: v.string(),
      receiptSummary: v.string(),
      items: v.array(
        v.object({
          name: v.string(),
          quantity: v.number(),
          unitPrice: v.number(), // Fixed from 'nullPrice' to 'unitPrice'
          totalPrice: v.number(),
        })
      ),
    },
    handler: async (ctx, args) => {
      // 1. Verify the receipt exists
      const receipt = await ctx.db.get(args.id);
      if (!receipt) {
        throw new Error("Receipt not found");
      }
  
      // 2. Verify user permissions
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Please login first");
      }
      
      if (receipt.userId !== identity.subject) {
        throw new Error("Not authorized to update this receipt");
      }
  
      // 3. Update the receipt with extracted data
      await ctx.db.patch(args.id, {
        fileDisplayName: args.fileDisplayName,
        merchantName: args.merchantName,
        merchantAddress: args.merchantAddress,
        merchantContact: args.merchantContact,
        transactionDate: args.transactionDate,
        transactionAmount: args.transactionAmount,
        currency: args.currency,
        receiptSummary: args.receiptSummary,
        items: args.items,
        status: "processed", // Automatically mark as processed
        
      });
  
      return true;
    },
  });