import { getTemporaryaccessToken } from '@/actions/GetTemporaryAccessToken'
import SchematicEmbed from './SchematicEmbed'

async function SchematicComponent({componentId}:{componentId?:string}) {
    if(!componentId){
        return null
    }
    const accessToken = await getTemporaryaccessToken()

    if(!accessToken){
        throw new Error("No access token found for user")
    }
  return (

    <SchematicEmbed accessToken={accessToken} componentId={componentId}/>
  )
}

export default SchematicComponent

///takes a component ID as input

//Gets a secure temporary access token for the current user

//Uses that token to display the specified embedded component from Schematic//