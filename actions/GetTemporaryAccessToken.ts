'use server'

import { currentUser } from "@clerk/nextjs/server"

import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY;

if (!apiKey) {
    console.error("SCHEMATIC_API_KEY environment variable is not set");
}

const client = new SchematicClient({ apiKey });

export async function GetTemporaryaccessToken(){
    try {
        if (!apiKey) {
            console.error("SCHEMATIC_API_KEY is missing");
            return null;
        }

        const user = await currentUser();
        console.log("Current user in server action:", user ? `User ID: ${user.id}` : "No user found");

        if(!user){
            console.log("No user found - this might be due to middleware configuration or authentication context");
            return null;
        }

        console.log(`Issuing temporary access token for user: ${user.id}`);
        
        const resp = await client.accesstokens.issueTemporaryAccessToken({
            resourceType:"company",
            lookup:{id:user.id}
        });
        
        console.log("Token response received:",
            resp.data ? "Token received" : "No token in response"
        );
        
        if (!resp.data?.token) {
            console.error("No token in response from Schematic API");
            return null;
        }
        
        return resp.data.token;
    } catch (error) {
        console.error("Error getting temporary access token:", error);
        return null;
    }
}

//Checks who's logged in

//If someone is logged in, asks Schematic to make a temporary access token for them

//Returns that token so it can be used elsewhere in the app