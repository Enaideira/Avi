function OnMessage(conn, nick, channel, msg, args) {

    if (msg.author.bot) return; // how dare you consider an infinitely repeating loop?!!
    //if (msg.channel.id == "571154466783625239"){
    //    conn.channels.get("163670269058220032").send(msg.content + " - " + msg.author.username);
    //}
   

}


function OnRawMessage(conn, nick, msg, channel) {
	//console.log("Hello from dire " + msg.content);
	if(msg.author.bot) { return };
	if(msg.channel.id == "540719136494321674") {
		const major = new Discord.RichEmbed({embed: {
			color: 16220659,
			author: {
				name: "New message from " + msg.author.username,
				icon_url: msg.author.avatarURL
				},
			fields: [{
				
		name: "Message Content:",
		value: msg.content
		},
	],
    timestamp: new Date(),
    footer: {
      icon_url: conn.user.avatarURL,
      text: "From Ursa Major"
    }
  }
})
		msg.delete(),
		channel.send(major)
		.then(msg => {
			conn.channels.get("344192341302706176").send(major);
		})


	}
}


exports.OnMessage = OnMessage;
exports.OnRawMessage = OnRawMessage;