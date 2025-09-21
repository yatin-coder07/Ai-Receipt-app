import { GetTemporaryaccessToken } from '../../actions/GetTemporaryAccessToken'
import SchematicEmbed from './SchematicEmbed'

export const dynamic = 'force-dynamic'

async function SchematicComponent({componentId}:{componentId?:string}) {
    if(!componentId){
        return (
            <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-800'>
                    Component ID is required to load the customer portal.
                </p>
            </div>
        )
    }
    
    try {
        const accessToken = await GetTemporaryaccessToken()

        if(!accessToken){
            return (
                <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
                    <p className='text-red-800'>
                        Unable to authenticate. Please make sure you're logged in and try again.
                    </p>
                </div>
            )
        }

        return (
            <SchematicEmbed accessToken={accessToken} componentId={componentId}/>
        )
    } catch (error) {
        console.error('Error loading customer portal:', error)
        return (
            <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-red-800'>
                    Failed to load customer portal. Please check your configuration and try again.
                </p>
                <p className='text-sm text-red-600 mt-2'>
                    Error: {error instanceof Error ? error.message : 'Unknown error'}
                </p>
            </div>
        )
    }
}

export default SchematicComponent

///takes a component ID as input

//Gets a secure temporary access token for the current user

//Uses that token to display the specified embedded component from Schematic//