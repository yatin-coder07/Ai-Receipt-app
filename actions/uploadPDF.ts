"use server";

import { api } from "@/convex/_generated/api";

import { convex } from "@/lib/ConvexClient";
import { currentUser } from "@clerk/nextjs/server";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { inngest } from "@/inngest/client";
import Events from "@/inngest/constants";

/**
 * Server action to upload a PDF file to Convex storage
 */
export async function uploadPDF(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Get the file from the form data
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }
    //Validate file type
    if(
        !file.type.includes("pdf") && 
        !file.name.toLowerCase().endsWith(".pdf")
    ){
        return{success:false,error:"only PDF files are allowed"}
    }
    //GEt upload url from convex
    const uploadUrl = await convex.action(api.receipts.getUploadUrl,{});

// Convert file to arrayBuffer for fetch API
const arrayBuffer = await file.arrayBuffer();

// Upload the file to Convex storage
const uploadResponse = await fetch(uploadUrl, {
  method: "POST",
  headers: {
    "Content-Type": file.type,
  },
  body: new Uint8Array(arrayBuffer), // Fixed from Unit&Array to Uint8Array
});
if (!uploadResponse.ok) {
  throw new Error(`Upload failed: ${uploadResponse.statusText}`);
}

// 4. Get storage ID from response
const { storageId } = await uploadResponse.json();
 // add reciept to data base
 const recieptId = await convex.mutation(api.receipts.storeReceipt,{
    userId: user.id,
    fileId: storageId,
    fileName: file.name,
    size: file.size,
    mimeType: file.type,
 })

 // genarate file url
 const fileUrl = await getFileDownloadUrl(storageId);

 //trigger inngest agents
 console.log("🚀 Attempting to send Inngest event...");
 console.log("Event name:", Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE);
 console.log("File URL:", fileUrl.downloadUrl);
 console.log("Receipt ID:", recieptId);
 
 try {
  const inngestResult = await inngest.send({
    name: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE,
    data: {
      url: fileUrl.downloadUrl,
      receiptId: recieptId, // Fixed typo: recieptId -> receiptId
    },
  });
  console.log("✅ Inngest event sent successfully for receipt:", recieptId);
  console.log("Inngest result:", inngestResult);
  console.log("🎯 Event should now be triggering the Inngest workflow...");
 } catch (inngestError) {
  console.error("❌ Failed to send Inngest event:", inngestError);
  console.error("Error details:", inngestError instanceof Error ? inngestError.message : String(inngestError));
  // Don't fail the entire upload if Inngest fails
  // The receipt is still saved to the database
 }
 return{
  
  success:true,
  data:{
    recieptId,
   fileName:file.name,
  }
 }





  } catch (error) {
    console.error("Server action upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}