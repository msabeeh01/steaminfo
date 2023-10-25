const steamkey = process.env.SteamWebApi || ""

const GetPlayerSummaries = async (req,res) =>{
    // get steamID
    const { steamID, vanityURL } = req.body

    if(!steamID && !vanityURL) return res.status(400).send({error: "No steamID or vanityURL provided"})

    // call vanity url first and check if response."success" = 42
    const vResponse = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${steamkey}&vanityurl=${vanityURL}`)
    const vData = await vResponse.json()

    if(vData.response.success !== 1) return res.status(400).send({error: "Player does not exist or is private"})
    else{
        const vSteamID = vData.response.steamid
        //fetch player summaries
        const response = await fetch(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamkey}&steamids=${vSteamID}`
        )
        const data = await response.json()


        //pull "timecreated" from each player from response and convert to date
        data.response.players.forEach(player => {
            const logOff = new Date(player.lastlogoff * 1000)
            const UTCDate = new Date(player.timecreated * 1000)
            player.timecreated = UTCDate.toUTCString()
            player.lastlogoff = logOff.toUTCString()
        });
        if(data.response.players.length === 0) return res.status(404).send({error: "Player not found"})
        res.status(200).send(data.response.players)
    }

    //call steamwebapi to get player summaries
    const response = await fetch(
        `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamkey}&steamids=${steamID}`
    )

    const data = await response.json()

    //pull "timecreated" from each player from response and convert to date
    data.response.players.forEach(player => {
        const logOff = new Date(player.lastlogoff * 1000)
        const UTCDate = new Date(player.timecreated * 1000)
        player.timecreated = UTCDate.toUTCString()
        player.lastlogoff = logOff.toUTCString()
    });

    if(data.response.players.length === 0) return res.status(404).send({error: "Player not found"})

    res.status(200).send(data.response.players)
}



module.exports = {
    GetPlayerSummaries
}