import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [steamID, setSteamID] = useState('')
  const [appName, setAppName] = useState('')
  const [filteredApps, setFilteredApps] = useState([])

  const GetPlayerSummaries = async () => {
    try {
      // check if steamID is a number or a string
      if (isNaN(steamID)) {
        const vanityURL = steamID
        const res = await axios.post(`http://127.0.0.1:3001/uInfo/summaries`, {vanityURL})
        return res.data
      }
      const res = await axios.post('http://127.0.0.1:3001/uInfo/summaries', { steamID })
      return res.data
    } catch (err) {
      throw err.response.data.error
    }
  }

  const GetAllApps = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:3001/aInfo/apps')
      return res.data
    }catch (err) {
      throw err.response.data.error
    }
  }

  const { data: allApps, error: allAppsError, isError: allAppsIsError, isLoading: allAppsIsLoading, refetch: allAppsRefetch } = useQuery({
    queryKey: ['allGames'],
    queryFn: () => GetAllApps(),
  })

  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['playerSummaries'],
    queryFn: () => GetPlayerSummaries(),
    enabled: false,
    retry: false
  })

  useEffect(() => {
    if(appName === ''){
      setFilteredApps([])
    }
    if(allApps && appName) {
      setFilteredApps(allApps.filter(app => app.name.toLowerCase().includes(appName.toLowerCase())))
    }
  }, [allApps, appName])

  useEffect(() => {
    GetAllApps()
  }, [])


  return (
    <div className='flex flex-col h-full bg-black justify-center items-center p-5 gap-3'>
      {/* Search bar */}
      <div className='h-5'>
        {isError && <p>{error}</p>}
      </div>
      <div className='search-bar w-2/4 flex gap-2'>
        <input className='w-full p-3 text-black' type='text' placeholder='Enter steam ID' onChange={(e) => setSteamID(e.target.value)} />
        <button onClick={refetch} className='bg-blue-500 p-2 rounded-md'>Search</button>
      </div>

      {/* Results */}
      <div className='bg-blue-500 h-4/6 w-full'>
        {data && data.map((player) => (
          <a href={`https://steamcommunity.com/profiles/${player.steamid}`}>
            <div className='flex items-center gap-5 p-3 bg-blue-950'>
              {player.avatarmedium ? <img src={player.avatarmedium} /> : <div className='h-12 w-12'></div>}
              <div className='flex flex-col'>
                <p className='text-2xl'>{player.personaname}</p>
                <p>Created: {player.timecreated}</p>
                <p className='text-sm'>Last Login: {player.lastlogoff}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* search bar */}
      <div className='search-bar w-2/4 flex-col flex gap-2'>
        <input className='w-full p-3 text-black' type='text' placeholder='Enter app name' onChange={(e) => setAppName(e.target.value)} />
        {/* list of first 5 filtered apps */}
        <div className='flex flex-col h-20'>
        {filteredApps && filteredApps.slice(0, 5).map((app) => (
          <Link href={`/appDetails/${app.appid}`}>
          <div>
            <p>{app.name}</p>
            <p>{app.appid}</p>
          </div>
          </Link>
        ))}
        </div>
      </div>

    </div>
  )
}
