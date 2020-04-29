WAPI.waitNewMessages(false, (data) => {
    console.log(data);
    data.forEach(async (message)=>{
        //check pesan masuk
        window.log(`Terima chat dari : ${message.sender.formattedName}\nPesan: ${message.body}`)
        let to = message.chat.id
        let msg = message.body.toLowerCase()
        let menu = "『 Menu 』\n1. Info corona\n2. hai"
        let bales = "Balas : "
        // recipients: undefined
        let group = message.isGroupMsg
        if(group){
            if(msg == "help"){
                WAPI.ReplyMessage(message.id,menu)
            }
            else if(msg == "info corona"){
                fetch("https://api.kawalcorona.com/indonesia/").then(resp=>{resp.json().then(hasil=>{hasil.forEach(data=>{
                response = `\n『 Data Corona 』\nNegara : ${data.name}\nPositif : ${data.positif}\nSembuh : ${data.sembuh}\nMeninggal : ${data.meninggal}`
                window.log(bales+response);
                let path = "img/corona.jpg"
                window.getFile(path).then(base64=>{
                    // WAPI.sendImage(base64,to,path,response)
                    let aa = base64.substr(base64.indexOf(',')+1)
                    WAPI.sendMessageWithThumb(aa,"https://tiati-corona.github.io",response,'tiati corona','pantau corona',to)
                })
                })})})
            }
            else if(msg == "hai" || msg == "hy" || msg == "haii" || msg == "hay"){
                let str = message.sender.id._serialized
                let num = str.replace("@c.us",'')
                let psn = `Hai too @${num}`
                WAPI.sendMention(to,psn,[str])
                window.log(bales+psn)
            }
        }
    })
})
function send_media_info_group(path,metadata={}){
    let base64 = "data:image/jpeg;base64,"+path
    msg = `『 Info Group 』\nName : ${metadata.name}\nDescription : ${metadata.desc}\nRequest from : ${metadata.sender}`
    WAPI.sendImage(base64,metadata.to._serialized,metadata.name+".jpg",msg)
}