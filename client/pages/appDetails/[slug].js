import { useRouter } from "next/router"
import { queryClient } from "../_app"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
const AppDetails = () => {
    const router = useRouter()
    const [allApps, setAllApps] = useState([])

    const appID = router.query.slug

    const { data, error } = useQuery({
        queryKey: ['currentPlayers'],
        queryFn: async () => await axios.get(`http://localhost:3001/aInfo/appPlayers/${appID}`),
        enabled: !!appID
    })

    const { data: appDetails, error: appDetailsError, isError: appDetailsIsError, isLoading: appDetailsIsLoading, refetch: appDetailsRefetch } = useQuery({
        queryKey: ['appDetails'],
        queryFn: async () => await axios.get(`http://localhost:3001/aInfo/appDetails/${appID}`),
        enabled: !!appID
    })

    const {data: storePrices, error: storePricesError, isError: storePricesIsError, isLoading: storePricesIsLoading, refetch: storePricesRefetch} = useQuery({
        queryKey: ['storePrices'],
        queryFn: async () => await axios.get(`http://localhost:3001/itad/prices/${appDetails.data.name}`),
        enabled: !!appDetails
    })

    return (

        <div className='flex flex-col h-full bg-blue-900 gap-3'>

            {/* game info */}
            <div className="flex ">
                {/* title bar */}
                <div className="flex w-full gap-5 bg-blue-950 p-5">
                    <div className="bg-gray-300 h-[165px] w-[293px] flex flex-col gap-5 rounded-md">
                        <img className="h-full w-full rounded-md " src={appDetails && appDetails.data.header_image} />
                    </div>

                    <div className="flex flex-col gap-3 max-w-xl">
                        <h1 className="text-2xl">
                            {appDetails && appDetails.data.name}
                        </h1>

                        <h1>
                            {appDetails && appDetails.data.short_description}
                        </h1>


                    </div>
                </div>


                {/* Right side info */}
                <div className="flex flex-col justify-evenly gap-3 bg-blue-950 p-5">
                    <div className="rounded-lg bg-green-900 p-5 flex justify-center items-center whitespace-nowrap">
                        {/* check if app is free */}
                        {appDetails && appDetails.data.is_free ? 'FREE' : appDetails && appDetails.data.price_overview.final_formatted}
                    </div>

                    <div className="rounded-lg flex flex-row whitespace-nowrap justify-center items-center bg-gray-600 p-5">
                        Players: {data && data.data.player_count}
                    </div>
                </div>
            </div>

            {/* tags */}
            <div className="flex gap-2 px-5">
                {appDetails && appDetails.data.genres.map((genre) => {
                    return (
                        <GenreTag description={genre.description} />
                    )
                })}
            </div>

            {/* prices */}
            <div className="flex p-5 w-full">
                <table className="justify-center items-center text-center w-full">
                    {storePrices && storePrices.data.map((store) => {
                        return(
                            <div className="table-row">
                            <td>{store.shop.name}</td>
                            <td>{store.price_new}</td>
                            <td>{store.price_old}</td>
                            <td>{store.url}</td>
                            </div>
                        )

                    })}
                </table>
            </div>


        </div>
    )
}

const GenreTag = ({ description }) => {
    return (
        <div className="rounded-lg bg-gray-700 p-2 whitespace-nowrap text-[8px]">
            {description}
        </div>
    )
}

export default AppDetails