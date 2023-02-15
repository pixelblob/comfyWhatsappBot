const axios = require("axios")
const cheerio = require("cheerio")

axios.get("https://www.riddles.nu/random").then(req=>{
    const $ = cheerio.load(req.data)
    console.log($("blockquote > p").first().text())
    console.log($("blockquote > div > div").first().text())
})