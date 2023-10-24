import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [steamID, setSteamID] = useState('')

  const GetPlayerSummaries = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:3001/uInfo/summaries', { steamID })
      console.log(res.data)
      return res.data
    } catch (err) {
      throw err.response.data.error
    }
  }
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['playerSummaries'],
    queryFn: () => GetPlayerSummaries(),
    enabled: false,
    retry: false
  })

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
               {player.avatarmedium ? <img src={player.avatarmedium} /> : <div className='h-12 w-12'></div> }
              <div className='flex flex-col'>
                <p className='text-2xl'>{player.personaname}</p>
                <p>Created: {player.timecreated}</p>
                <p className='text-sm'>Last Login: {player.lastlogoff}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* avatar
: 
"https://avatars.steamstatic.com/235e6e10cd66af9a6c42020f8053cf3a32508522.jpg"
avatarfull
: 
"https://avatars.steamstatic.com/235e6e10cd66af9a6c42020f8053cf3a32508522_full.jpg"
avatarhash
: 
"235e6e10cd66af9a6c42020f8053cf3a32508522"
avatarmedium
: 
"https://avatars.steamstatic.com/235e6e10cd66af9a6c42020f8053cf3a32508522_medium.jpg"
communityvisibilitystate
: 
3
lastlogoff
: 
"Sun, 22 Oct 2023 05:02:45 GMT"
personaname
: 
"Pingweeny"
personastate
: 
0
personastateflags
: 
0
primaryclanid
: 
"103582791429521408"
profilestate
: 
1
profileurl
: 
"https://steamcommunity.com/profiles/76561199126200396/"
steamid
: 
"76561199126200396"
timecreated
:  */}
      "Mon, 04 Jan 2021 06:04:16 GMT"
    </div>
  )
}
