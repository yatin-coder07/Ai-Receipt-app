import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, BookDashed, Check, Search, Shield, Upload } from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div>
     {/*hero section*/}
     <section className="mt-20 ">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="space-y-7">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Intelligent Receipt Scanning
        </h1>
        <p className="mx-auto max-w-[789px] text-gray-500 md:text-xl md:text-gray-400">
          Scan, analyze, and organize your receipts with AI-powered precision. Save time and gain insights from your expenses.
        </p>
      </div>
      <div className="space-x-4">
  <Link href="/receipts">
    <Button className="bg-blue-600 hover:bg-blue-700">
      Get Started <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
    </Link>
     <Link href="#features">
    <Button variant="outline">Learn More</Button>
  </Link>
   </div>
    </div>
  </div>
  <div className="mt-12 flex justify-center">
  <div className="relative w-full max-w-3xl rounded-lg border-4 border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-950">
    <div className="p-6 md:p-8 relative">
      <p>PDF dropzone goes here...</p>
    </div>
  </div>
</div>


</section>
     {/*features*/}
     <section id="features" className="py-16 md:py-24">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl">
          Powerful Features
        </h2>
        <p className="max-w-[780px] text-gray-500 sm:text-xl dark:text-gray-400">
          Our AI-powered platform transforms how you handle receipts and track expenses.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
  <div className="flex flex-col items-center space-y-2 border-3 border-gray-200 rounded-lg p-6 dark:border-gray-800">
    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
      <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-xl font-bold">Easy uploads</h3>
    <p className="text-gray-500 dark:text-gray-400 text-center">
      Drag and drop your PDF receipts for instant scanning and processing.
    </p>
  </div>

  {/* Feature 2 */}
<div className="flex flex-col items-center space-y-2 border-2 border-gray-200 rounded-lg p-6 dark:border-gray-800">
  <div className="p-3 rounded-full bg-green-100 dark:bg-green-300">
    <Search className="h-6 w-6 text-green-500 dark:text-green-400" />
  </div>
  <h3 className="text-xl font-bold">AI Analysis</h3>
  <p className="text-gray-500 dark:text-gray-400 text-center">
    Automatically extract and categorize expense data with intelligent AI.
  </p>
</div>
 {/* Feature 3 */}
<div className="flex flex-col items-center space-y-2 border-2 border-gray-200 rounded-lg p-6 dark:border-gray-800">
  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
    <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
  </div>
  <h3 className="text-xl font-bold">Expense Insights</h3>
  <p className="text-gray-500 dark:text-gray-400 text-center">
    Generate reports and gain valuable insights from your spending patterns.
  </p>
</div>


</div>
    </div>

  </div>
</section>
     { /*pricing*/}
   <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Simple Pricing
        </h2>
        <p className="max-w-[760px] text-gray-500 md:text-xl dark:text-gray-400">
          Choose the plan that works best for your needs.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
  {/* Free Tier */}
  <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Free</h3>
        <p className="text-gray-400">
          Free tier for all to try
        </p>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold">$0</p>
        <p className="text-gray-400">/month</p>
      </div>
    </div>
    <div className="p-6 pt-0 space-y-4 flex-1">
      <ul className="space-y-2">
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>2 scans per month</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>Basic data extraction</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>5-day history</span>
        </li>
      </ul>
      <div className="mt-6">
        <Link href={"/my-plans"}>
        <Button className="w-full" >Sign Up Free</Button> </Link>
      </div>
    </div>
  </div>
  {/*Starter*/}
  <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">Starter</h3>
        <p className="text-gray-400">
          Starter Pack for new Bussinesses
        </p>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold">$15.99</p>
        <p className="text-gray-400">/month</p>
      </div>
    </div>
    <div className="p-6 pt-0 space-y-4 flex-1">
      <ul className="space-y-2">
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>50 scans per month</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>InDepth data extraction</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>50-day history</span>
        </li>
      </ul>
      <div className="mt-6">
        <Link href={"/my-plans"}>
        <Button className="w-full" >Choose Plan</Button> </Link>
      </div>
    </div>
  </div>
  {/* Pro*/ }
{/* Pro Tier */}
<div className="relative p-1 bg-blue-50 border border-blue-500 rounded-lg shadow-lg shadow-blue-500/25 dark:bg-blue-900/20 dark:border-blue-500">
  <div className="absolute -top-3 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
    Popular
  </div>
  <div className="p-6 space-y-4">
    <div className="space-y-2">
      <h3 className="text-xl font-bold">Pro</h3>
      <p className="text-gray-500 dark:text-gray-400">
        Pro features for the pro user!
      </p>
    </div>
    <div className="mt-4">
      <p className="text-4xl font-bold">$9.99</p>
      <p className="text-gray-500 dark:text-gray-400">/month</p>
    </div>
    <div className="mt-6 space-y-3 flex-1">
      <ul className="space-y-2">
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>300 scans per month</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>Advanced AI data extraction</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>AI Summaries</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>Expense categories & tags</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>Advanced export options</span>
        </li>
        <li className="flex items-center">
          <Check className="text-green-500 h-5 w-5 mr-2" />
          <span>Unlimited history</span>
        </li>
      </ul>
    </div>
    <div className="mt-6">
      <Link href="/subscribe">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </Link>
    </div>
  </div>
</div>
</div>

  </div>
  
  
 
</section>
    {/* info*/}
    {/* Info Section */}
<section className="py-16 md:py-24">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Start Scanning Today
        </h2>
        <p className="text-lg text-gray-500 sm:text-xl dark:text-gray-400">
          Join thousands of users who save time and gain insights from their receipts.
        </p>
      </div>
    </div>
  </div>
</section>
     {/*footer*/ }
     <footer className="border-t border-gray-300 dark:border-gray-800">
  <div className="container px-4 md:px-6 mx-auto py-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 dark:text-gray-600" />
        <span className="text-xl font-semibold">ScanUs</span>
      </div>
      <div className="mt-4 md:mt-0">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ScanUs The smarter way to track your money.
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

