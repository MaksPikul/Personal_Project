import { auth } from '@/auth'


const HomePage = async () => {
    const session = await auth()

    return(
        <div className="">
            {JSON.stringify(session)}
        </div>
    )
}

export default HomePage