const key = process.env.ITADKey

const GetPrices = async (req, res) => {
    const { title } = req.params
    console.log(title)
    if (!title) return res.status(400).send({ error: "No title provided" })

    // get corresponding title in ITAD db
    const res1 = await fetch(`https://api.isthereanydeal.com/v02/game/plain/?key=${key}&title=${title}`)
    const res1json = await res1.json()
    const newTitle = res1json.data.plain

    const response = await fetch(`https://api.isthereanydeal.com/v01/game/prices/?key=${key}&plains=${newTitle}&shops=steam%2Cindiegamestand%2Camazonus%2Cgog%2Cgamersgate%2Cgamesplanet%2Cgreenmangaming%2Cdotemu%2Cnuuvem`)
    const data = await response.json()
    res.status(200).send(data.data[newTitle].list)
}

module.exports = {
    GetPrices
}