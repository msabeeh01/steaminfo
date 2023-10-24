const steamkey = process.env.SteamWebApi || ""

const GetPlayerSummaries = async (req,res) =>{
    // get steamID
    const { steamID } = req.body

    if(!steamID) return res.status(400).send("No steamID provided")

    //call steamwebapi to get player summaries
    const response = await fetch(
        `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamkey}&steamids=${steamID}`
    )

    const data = await response.json()

    //pull "timecreated" from each player from response and convert to date
    data.response.players.forEach(player => {
        UTCDate = new Date(player.timecreated * 1000)
        player.timecreated = UTCDate.toUTCString()
    });

    if(data.response.players.length === 0) return res.status(404).send("No player found")

    res.status(200).send(data.response.players)
}



module.exports = {
    GetPlayerSummaries
}