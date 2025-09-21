"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Receipt() {
    const params = useParams<{ id: string }>();
    const [receiptId, setReceiptId] = useState<Id<"receipts"> | null>(null);
    const router = useRouter();

    // Fetch receipt details
    const receipt = useQuery(
        api.receipts.getReceiptById,
        receiptId ? { id: receiptId } : "skip"
    );
    // Get file download URL (for the view button)
const fileId = receipt?.fileId;
const downloadUrl = useQuery(
    api.receipts.getReceiptDownloadUrl,
    fileId ? { fileId} : "skip"
);

    // Convert the URL string ID to a Convex ID
    useEffect(() => {
        try {
            const id = params.id as Id<"receipts">;
            setReceiptId(id);
        } catch (error) {
            console.error("Invalid receipt ID:", error);
            router.push("/");
        }
    }, [params.id, router]);

    if (receipt === undefined) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading receipt...</p>
                </div>
            </div>
        );
    }

    if (receipt === null) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
                    <p className="mb-6">
                        The receipt you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        href="/receipts"
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Back to Receipts
                    </Link>
                </div>
            </div>
        );
    }

    // Check if receipt has extracted data
    const hasExtractedData = !!(
        receipt.merchantName ||
        receipt.merchantAddress ||
        receipt.transactionDate ||
        receipt.transactionAmount
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <nav className="mb-6">
                    <Link
                        href="/receipts"
                        className="text-blue-500 hover:underline flex items-center"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Receipts
                    </Link>
                </nav>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {receipt.fileDisplayName || receipt.filename}
                            </h1>
                            <p className="text-gray-600">
                                Uploaded: {new Date(receipt.uploadedAt).toLocaleString()}
                            </p>
                            <p className="text-gray-600">
                                Status: 
                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                    receipt.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : receipt.status === "processed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}>
                                    {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                                </span>
                            </p>
                        </div>
                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                View PDF
                            </a>
                        )}
                    </div>

                    {hasExtractedData ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {receipt.merchantName && (
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Merchant</h3>
                                        <p className="text-gray-900">{receipt.merchantName}</p>
                                    </div>
                                )}
                                {receipt.transactionAmount && (
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Amount</h3>
                                        <p className="text-gray-900">
                                            {receipt.currency && receipt.currency !== 'undefined' ? receipt.currency : '$'}{receipt.transactionAmount}
                                        </p>
                                    </div>
                                )}
                                {receipt.transactionDate && (
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Date</h3>
                                        <p className="text-gray-900">{receipt.transactionDate}</p>
                                    </div>
                                )}
                                {receipt.merchantAddress && (
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
                                        <p className="text-gray-900">{receipt.merchantAddress}</p>
                                    </div>
                                )}
                            </div>

                            {receipt.items && receipt.items.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-4">Items</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Item
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Quantity
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Unit Price
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {receipt.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            ${item.unitPrice.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            ${item.totalPrice.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {receipt.receiptSummary && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Summary</h3>
                                    <p className="text-gray-900">{receipt.receiptSummary}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">
                                Receipt data is still being processed. Please check back later.
                            </p>
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Receipt;