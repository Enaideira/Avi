function OnMessage(conn, nick, channel, msg, args) {
	//
}


function OnRawMessage(conn, nick, msg, channel) {
	if(msg.author.bot) { return }; // how dare you consider an infinitely repeating loop?!!
	if(msg.channel.id == "638563318641983509") {
		msg.delete(),
		channel.send(msg.content + " - " + msg.author.username),
		conn.channels.get("624349138418663435").send(msg.content + " - " + msg.author.username),
		conn.channels.get("643303851201527828").send(msg.content + " - " + msg.author.username),
		conn.channels.get("624350501408079873").send(msg.content + " - " + msg.author.username);
	};
	if(msg.channel.id == "624350501408079873") {
		msg.delete(),
		channel.send(msg.content + " - " + msg.author.username),
		conn.channels.get("638563318641983509").send(msg.content + " - " + msg.author.username),
		conn.channels.get("643303851201527828").send(msg.content + " - " + msg.author.username),
		conn.channels.get("624349138418663435").send(msg.content + " - " + msg.author.username);
	};
	if(msg.channel.id == "624349138418663435") {
		msg.delete(),
		channel.send(msg.content + " - " + msg.author.username),
		conn.channels.get("624350501408079873").send(msg.content + " - " + msg.author.username),
		conn.channels.get("643303851201527828").send(msg.content + " - " + msg.author.username),
		conn.channels.get("638563318641983509").send(msg.content + " - " + msg.author.username);
	};
	if(msg.channel.id == "643303851201527828") {
		msg.delete(),
		channel.send(msg.content + " - " + msg.author.username),
		conn.channels.get("624350501408079873").send(msg.content + " - " + msg.author.username),
		conn.channels.get("624349138418663435").send(msg.content + " - " + msg.author.username),
		conn.channels.get("638563318641983509").send(msg.content + " - " + msg.author.username);
	};




}



exports.OnMessage = OnMessage;
exports.OnRawMessage = OnRawMessage;