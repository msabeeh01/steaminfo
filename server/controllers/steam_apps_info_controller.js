const { default: axios } = require("axios")

// /aInfo/apps
const GetAllApps = async (req, res) => {
    //call steamwebapi to json of all steam apps/games
    console.log('accesed controller')

    const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    const data = await response.json()
    res.status(200).send(data.applist.apps)
}

module.exports = {
    GetAllApps
}