"use client"

import { uploadPDF } from "@/actions/uploadPDF";
import { useUser } from "@clerk/clerk-react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { AlertCircle, CheckCircle, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";


function PDFDropzone() {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const FileInputRef = useRef<HTMLInputElement>(null);
    const{
        value:isFeatureenabled,
        featureUsageExceeded,
        featureAllocation,
    }=useSchematicEntitlement("scans");

    // Set up sensors for drag detection
    const sensors = useSensors(useSensor(PointerSensor));

    const handleUpload=useCallback(async(files: FileList | File[] | null | undefined)=>{
        if(!isSignedIn){
            alert("Please Sign in first");
            return;
        }

            if (!files) {
                alert("No files selected");
                return;
            }

            const fileArray: File[] = Array.isArray(files) ? files : Array.from(files as ArrayLike<File>);
            const pdfFiles = fileArray.filter(
                (file) => file.type === "application/pdf" || 
                file.name.toLocaleLowerCase().endsWith(".pdf"),
            );

            if((pdfFiles?.length ?? 0) === 0){
                alert("Please drop pdf files only");
                return;
            };

            setIsUploading(true);

            try {
            // Upload files
            const newUploadedFiles: string[] = [];

            for (const file of pdfFiles) {
                // Create a FormData object to use with the server action
                const formData = new FormData();
                formData.append("file", file);

                // Call the server action to handle the upload
                const result = await uploadPDF(formData);

                if (!result.success) {
                    throw new Error(result.error);
                }
                newUploadedFiles.push(file.name);
            }
            setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

            //claer the uploaded files ater 5 seconds
            setTimeout(()=>{
                setUploadedFiles([]);
            } , 5000);
            router.push("/receipts");
        }
            
    // Continue with success logic here
            catch(error){
                alert(`Upload failed:${error instanceof Error ? error.message : "Uknown error"}`)
            }finally{
                setIsUploading(false);
            }
            
    },[isSignedIn,router])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        // Handle file drop logic here
        if(!isSignedIn){
            alert("Please Sign in first");
            return;
        }
        const files = e.dataTransfer?.files;
        if (!files || (files?.length ?? 0) === 0) return;
        handleUpload(files);
    }, [isSignedIn,handleUpload]);


    const handleFileInputChange = useCallback(
        (e:React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files || (files?.length ?? 0) === 0) return;
          handleUpload(files);
        },
        [handleUpload]
      );
      
      const triggerFileInput = useCallback(() => {
        FileInputRef.current?.click();
      }, []);

    //const canUpload = isUserSignedIn && isFeatureEnabled
  const isUserSignedIn = isSignedIn;
  const canUpload = isUserSignedIn && isFeatureenabled;

    return (
        <DndContext sensors={sensors}>
            <div className="w-full max-w-md mx-auto">
                <div 
                    onDragOver={canUpload ? handleDragOver : undefined}
                    onDragLeave={canUpload ? handleDragLeave : undefined}
                    onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDraggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    } ${
                        !canUpload ? "opacity-70 cursor-not-allowed border-red-700" : ""
                    }`}

                >
                    {isUploading ? (
                        <div className="flex-col items-center justify-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-gray-600">Uploading...</p>
                        </div>
                       
                      ):(
                        !isUserSignedIn ?(
                            <>
                            <CloudUpload className="mx-auto h-12 w-12 text-gray-400"/>
                            <p className="text-gray-600">
                               Please sign in to upload files
                            </p>
                            </>
                           
                            
                        )
                       
                        :(
                           <>
                           <CloudUpload className="mx-auto h-12 w-12 text-gray-400"/>
                           <p className="mt-2 text-sm text-gray-600">
                            Drag and drop PDF files here or click to select files
                           </p>
                           <input type="file"
                           ref={FileInputRef}
                           accept="application/pdf,.pdf" 
                           multiple
                           onChange={handleFileInputChange}
                           className="hidden"/>
                           <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" onClick={triggerFileInput}
                           disabled={!isFeatureenabled}>
                            {isFeatureenabled ? "Choose files":"Upgrade to upload"}
                           </Button>
                           
                           </>
                        )
                      )}
                   
                </div>
                 
                <div className="mt-4">
  {featureUsageExceeded && (
    <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
      <AlertCircle className="h-3 w-3 mr-2 flex-shrink-0" />
      <span>
        You have exceeded your limit of {featureAllocation} scans.
        Please upgrade to continue.
      </span>
    </div>
  )}
</div>

{((uploadedFiles?.length ?? 0) > 0) && (
  <div className="mt-4">
    <h3 className="font-medium">Uploaded files:</h3>
    <ul className="mt-2 text-sm text-gray-600 space-y-1">
      {uploadedFiles.map((fileName,i) => (
        <li key={i} className="flex items-center">
          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
          {fileName}
        </li>
      ))}
    </ul>
  </div>
)}

            </div>
        </DndContext>
    );
}

export default PDFDropzone;