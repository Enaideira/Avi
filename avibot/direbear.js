function OnMessage(conn, nick, channel, msg, args) {

    if (msg.author.bot) return; // how dare you consider an infinitely repeating loop?!!
    //if (msg.channel.id == "571154466783625239"){
   //     conn.channels.get("163670269058220032").send(msg.content + " - " + msg.author.username);
   // }
   

}



function onRawMessage(conn, nick, msg, channel) {
    console.log("any message " + msg.content)
}


exports.OnMessage = OnMessage;
exports.onRawMessage = OnRawMessage