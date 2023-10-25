import { useRouter } from "next/router"
import { queryClient } from "../_app"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const AppDetails = () => {
    const router = useRouter()
    const [allApps, setAllApps] = useState([])

    const appID = router.query.slug

    const {data, error} = useQuery({
        queryKey: ['currentPlayers'],
        queryFn: async () => await axios.get(`http://localhost:3001/aInfo/appPlayers/${appID}`),
        enabled: !!appID
    })

    // call cached json of apps
    // useEffect(() => {
    //     setAllApps(queryClient.getQueryData(['allGames']))
    // }, [])



    return(
        <div className="bg-black flex flex-col">
            <div>
            {appID}
            </div>

            <div>
            PLAYER COUNT: {data && data.data.player_count}
            </div>
        </div>
    )
}

export default AppDetails