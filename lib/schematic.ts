import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY;

if (!apiKey) {
    console.error("SCHEMATIC_API_KEY is not set");
}

export const client = apiKey ? new SchematicClient({
    apiKey,
    cacheProviders: {
        flagChecks: []
    },
}) : null;