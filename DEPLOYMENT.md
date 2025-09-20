# Deployment Guide for Vercel

This guide will help you deploy your Receipt Scanning app to Vercel.

## Prerequisites

1. A Convex account and deployment
2. A Clerk account for authentication
3. A Schematic account (optional, for analytics)
4. An Inngest account for background jobs
5. API keys for OpenAI and/or Anthropic

## Environment Variables Setup

### 1. Convex Setup
1. Go to your [Convex Dashboard](https://dashboard.convex.dev/)
2. Create a new project or use an existing one
3. Copy your deployment URL (it looks like `https://your-deployment.convex.cloud`)
4. Set this as `NEXT_PUBLIC_CONVEX_URL` in Vercel

### 2. Clerk Setup
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or use an existing one
3. Get your Publishable Key and Secret Key
4. Create a JWT template named "convex" (see [Convex Clerk docs](https://docs.convex.dev/auth/clerk))
5. Set these environment variables in Vercel:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_JWT_ISSUER_DOMAIN` (from your JWT template)

### 3. Inngest Setup
1. Go to your [Inngest Dashboard](https://app.inngest.com/)
2. Create a new app or use an existing one
3. Get your Event Key and Signing Key
4. Set these environment variables in Vercel:
   - `INNGEST_EVENT_KEY`
   - `INNGEST_SIGNING_KEY`

### 4. Schematic Setup (Optional)
1. Go to your [Schematic Dashboard](https://schematic.dev/)
2. Get your Publishable Key
3. Set `NEXT_PUBLIC_SCHEMATIC_KEY` in Vercel

### 5. AI API Keys
Set one or both of these environment variables in Vercel:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`

## Vercel Deployment Steps

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository

### 2. Configure Environment Variables
In your Vercel project settings, add all the environment variables listed above.

### 3. Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete

## Important Notes

- The `NEXT_PUBLIC_CONVEX_URL` environment variable is **required** and must be set before deployment
- Make sure your Convex deployment is running and accessible
- The Clerk JWT template must be properly configured with the correct issuer domain
- Inngest functions have a 300-second timeout limit on Vercel (configured in `vercel.json`)

## Troubleshooting

### Build Error: "Client created with undefined deployment address"
This error occurs when `NEXT_PUBLIC_CONVEX_URL` is not set. Make sure to:
1. Set the environment variable in Vercel
2. Redeploy your application

### Authentication Issues
Make sure:
1. Clerk environment variables are correctly set
2. The JWT template is created and configured
3. The issuer domain matches your Clerk configuration

### Inngest Functions Not Working
Ensure:
1. Inngest environment variables are set
2. The Inngest dashboard shows your functions
3. Your Convex deployment is accessible from Inngest

## Local Development

For local development, create a `.env.local` file with the same environment variables:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev
NEXT_PUBLIC_SCHEMATIC_KEY=pk_...
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```
