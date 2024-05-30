

import { auth } from '@/auth'
import { useSession } from 'next-auth/react'


const HomePage = async () => {
    const session = await auth()

    return(
        <div className="">
            {JSON.stringify(session)}
        </div>
    )
}

export default HomePage