const axios = require("axios")
const cheerio = require("cheerio");
const { spawn } = require('child_process');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'message',
    async execute(client, msg) {
        console.log('MESSAGE RECEIVED', msg.body);

        var link = msg.body.split(" ").find(s => s.match(/\bhttps?:\/\/(?:m|www|vm)\.tiktok\.com\/\S*?\b(?:(?:(?:usr|v|embed|user|video)\/|\?shareId=|\&item_id=)(\d+)|(?=\w{7})(\w*?[A-Z\d]\w*)(?=\s|\/$))\b/))

        if (msg.body.startsWith("!")) {
            var command = commands.find(c => `!${c.name}` == msg.body.split(" ")[0])
            if (!command) return console.log("COMMAND DOES NOT EXIST: " + msg.body.split(" ")[0])
            try {
                command.execute(msg)
            } catch (error) {
                console.log(error)
            }
        } else if (link) {
            console.log("Tiktok detected: " + link);
            (await msg.getChat()).sendStateRecording();
            try {
                console.log(link)
                await axios.get(link, {
                    headers: {
                        "Accept-Encoding": "gzip,deflate,compress", "cookie": "_ttp=29OONCFVi1fShP2BXR9HlpRTQac; _tea_utm_cache_3053={%22utm_source%22:%22copy%22%2C%22utm_medium%22:%22android%22%2C%22utm_campaign%22:%22client_share%22}; passport_csrf_token=11fb7a32c62d41e8c2c2387f6dc30aa3; passport_csrf_token_default=11fb7a32c62d41e8c2c2387f6dc30aa3; s_v_web_id=verify_lc1y71b5_zvHj190B_BuVw_4y7N_Aw4Q_oBhIFP4TXuaV; passport_fe_beating_status=true; tiktok_webapp_theme=dark; __tea_cache_tokens_1988={%22user_unique_id%22:%226922674283165287937%22%2C%22timestamp%22:1671881093154%2C%22_type_%22:%22default%22}; _abck=43F96654BB13D7038A9FB3F008ADF70E~0~YAAQj582F1SpcMuFAQAANTP3HQlERE6lwgtTQ+D3/IAOt22Tk8boRUDX3xJrYk8WX9HN/Ajo4lVgHXa4XLFuz2IaEziUjrMfCq5vb2J5dVzHQczy24oEL0F3C6rP+zn9zsYibfkS4g94aouXUrnsXT1y5WDd63gdqXHID91l7b6h7WkiZsmfluIFFr+bdddxuHJeZgwvcz/zpk9PiDPlIn/Ip5CD4buVmtp6rHFFCltkKpS6qm0juwZiRxHPCLk2BW+rXqU9R6ONsRowI5s26A8aYXNAQ3RpAa4fbhoiVa0MtHOHNYCzZxxPWZfXiwTIrXuDLGXMF/OLtMYPB++1/fZiKpdyKGkhldvC457yyz2mDKmiUgddQ1zvpGDhawuRLVEeI/6w4H3p67T7Ke0ay3Q0EAMhO0Wb~-1~-1~-1; bm_sz=B269180FF56D1DBA14A6E9EE0FC9816C~YAAQj582F1epcMuFAQAANTP3HRIfIy0rMJYL9X47TH41MA7AxfxGkK6ao0sGBVJyQirehNOSxY6pIKhEUB1dM6/H+zVPJfLEm4II0kTsFhv7OXkxdWgaoCuXm5EEbGmtFEPK568anm5x+ZpfgB3H0ULqukpjmStgsIvyKKQCgH6VmcaFU0O+tCwEOlQIa/VLbL3LtGoBs9KLzPfNmg38OFzXuJKp7jdihB16yxDWDieeDHdwBHHpCp3l062+t5BtH0Wco7OxxQVHLMK1PFr+o4E4kTM7vZomiifGXJXIGbcx0ec=~4599860~3749171; msToken=W6LoAqQ8d9sTURVVASddMFaW6z374eGCgo-2_tZaZAmNrKDBnxbvKs6_ZI1rQGPD82gKCo0OKdor81w3Fv6-an1QkMUyveboXJbojr3unr25jeNyu-ch1ngDG3wrSU8WFyJG4zLAQLgKl6cLTQ==; msToken=W6LoAqQ8d9sTURVVASddMFaW6z374eGCgo-2_tZaZAmNrKDBnxbvKs6_ZI1rQGPD82gKCo0OKdor81w3Fv6-an1QkMUyveboXJbojr3unr25jeNyu-ch1ngDG3wrSU8WFyJG4zLAQLgKl6cLTQ==; bm_sv=12F4AF6B64FC095371475439BEF523A1~YAAQjkM0F0OXasuFAQAAvdYGHhIBIAnsr9d2zL82yfJ5XfWVYS0tmDz4EO2CQPvrb2TmGfhdVaC6lhXQ9HWUe/npbhsf+xh4s+awbCxWGVS1qWyxTh304NPD9V44CYuFphvu2mmpQy/cASG/G4By6BIcoqrIpD3uKf50IWVNGz38jBuAH0GMYmSBxNOohqwH0TE+HUQI5ryXFDn2VHnXqXDQ7s9+7/TBybaDNIH+qSgU4Vr/nmTszmd/jHPEkIOSEg==~1"
                    }
                }).then(async req => {
                    const $ = cheerio.load(req.data);
                    var text = $('script#SIGI_STATE').text()
                    var json = JSON.parse(text)
                    console.log(json.ItemList.video.preloadList[0].url);

                    try {
                        const media = await MessageMedia.fromUrl(json.ItemList.video.preloadList[0].url, {
                            filename: "video.mp4", unsafeMime: true, reqOptions: {
                                headers: {
                                    "referer": "https://www.tiktok.com/",
                                    "cookie": req.headers["set-cookie"].find(c => c.includes("tt_chain_token")).split(";")[0]
                                }
                            }
                        })

                        msg.reply(media);
                    } catch (err) {
                        console.log(err)
                    }
                })
            } catch (error) {
                console.log(error?.response?.status || error);
            }
        } else if (!msg.id.participant) {
            console.log("DM RECIEVED: " + msg.body)

            msg.react("????")
            spawn("espeak", [msg.body]);
        }
    }
}