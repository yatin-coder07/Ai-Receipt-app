'use server'

import { currentUser } from "@clerk/nextjs/server"

import { SchematicClient } from "@schematichq/schematic-typescript-node";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

export async function GetTemporaryaccessToken(){
    const user = await currentUser();

    if(!user){
        console.log("nou user found")
        return null
    }
    console.log(`issuing temporary access token for user:${user.id}`);
    const resp = await client.accesstokens.issueTemporaryAccessToken({
        resourceType:"company",
        lookup:{id:user.id}
    });
    console.log(" token response recieved:",
        resp.data?"token recieved  ":"No token in response"
    )
    return resp.data?.token;
}

//Checks who's logged in

//If someone is logged in, asks Schematic to make a temporary access token for them

//Returns that token so it can be used elsewhere in the app