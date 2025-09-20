"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, useUser } from "@clerk/nextjs";
import { SchematicProvider , useSchematicEvents  } from "@schematichq/schematic-react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "NEXT_PUBLIC_CONVEX_URL environment variable is not set. " +
    "Please set it to your Convex deployment URL (e.g., https://your-deployment.convex.cloud). " +
    "You can find this URL in your Convex dashboard."
  );
}

const convex = new ConvexReactClient(convexUrl);

const SchematicWrapped = ({children}:{children:React.ReactNode})=>{
  const {identify} = useSchematicEvents();
  const {user}=useUser();

  useEffect(()=>{
    console.log("User value in useEffect:", user)
      const userName=
      user?.username??
      user?.fullName??
      user?.emailAddresses[0]?.emailAddress??
      user?.id

      if(user?.id){
         
        identify({
          name:userName,
          //user level keys
          keys:{
            id:user.id,
          },
          //Company level keys
          company:{
            keys:{
              id:user.id,
            },
            name:userName
          },
        })
      }
  },[user , identify])

  return children;
}


export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <SchematicProvider publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_KEY!}>
        <SchematicWrapped>
            {children}
        </SchematicWrapped>
       
      </SchematicProvider>
      
    </ConvexProviderWithClerk>
  );
}
