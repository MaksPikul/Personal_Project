

import { auth } from '@/auth'
import { useSession } from 'next-auth/react'


const HomePage = async () => {
    const session = await auth()

    return(
        <>
            {JSON.stringify(session)}
        </>
    )
}

export default HomePage