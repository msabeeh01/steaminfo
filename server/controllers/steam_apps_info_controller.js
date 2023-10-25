const { default: axios } = require("axios")

const steamkey = process.env.SteamWebApi || ""

// /aInfo/apps
const GetAllApps = async (req, res) => {
    const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v0002/')
    const data = await response.json()
    res.status(200).send(data.applist.apps)
}

const GetAppPlayers = async (req, res) => {
    const {appID} = req.params
    if(!appID) return res.status(400).send({error: "No appID provided"})
    
    const response = await fetch(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=${steamkey}&appid=${appID}`)
    const data = await response.json()
    if(data.response.result === 42){
        return res.status(404).send({error: "App not found or incorrect ID"})
    }
    res.status(200).send(data.response)
}

const GetAppDetails = async (req, res) => {
    const {appID} = req.params
    if(!appID) return res.status(400).send({error: "No appID provided"})

    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appID}`)
    const data = await response.json()
    if(data[appID].success === false){
        return res.status(404).send({error: "App not found or incorrect ID"})
    }
    res.status(200).send(data[appID].data)
}

module.exports = {
    GetAllApps,
    GetAppPlayers
}