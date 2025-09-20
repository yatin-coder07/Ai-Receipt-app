#!/usr/bin/env node

/**
 * Environment variable validation script
 * Run this before deploying to ensure all required environment variables are set
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_CONVEX_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'CLERK_JWT_ISSUER_DOMAIN',
];

const optionalEnvVars = [
  'NEXT_PUBLIC_SCHEMATIC_KEY',
  'INNGEST_EVENT_KEY',
  'INNGEST_SIGNING_KEY',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;

// Check required environment variables
console.log('📋 Required environment variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NOT SET`);
    hasErrors = true;
  } else {
    // Mask sensitive values
    const maskedValue = varName.includes('SECRET') || varName.includes('KEY') 
      ? value.substring(0, 8) + '...' 
      : value;
    console.log(`✅ ${varName}: ${maskedValue}`);
  }
});

console.log('\n📋 Optional environment variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName}: NOT SET (optional)`);
  } else {
    const maskedValue = varName.includes('SECRET') || varName.includes('KEY') 
      ? value.substring(0, 8) + '...' 
      : value;
    console.log(`✅ ${varName}: ${maskedValue}`);
  }
});

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Validation failed: Missing required environment variables');
  console.log('\nTo fix this:');
  console.log('1. Set up your Convex deployment: npx convex dev');
  console.log('2. Configure your Clerk application');
  console.log('3. Add the environment variables to your .env.local file');
  console.log('4. For Vercel deployment, add them to your project settings');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set!');
  console.log('🚀 You can now deploy your application.');
}
