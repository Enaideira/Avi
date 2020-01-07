function OnMessage(conn, nick, channel, msg, cmd, args) {
	if(cmd == "chkreport") {
		if(["!", "/", ';', '`'].includes(args[0])) {
            
	}


}

exports.OnMessage = OnMessage;