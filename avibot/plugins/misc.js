function OnRawMessage(conn, nick, msg, channel) {
	//
}

function OnMessage(conn, nick, channel, msg, cmd, args) {
//	if(cmd == "say") {
//			
//			//
//		} else {
//			channel.send(args);
//		}
//	}
	
	if(cmd == "explode") {
		channel.send("***Kaboom!***");
	}
	
	if(cmd == "fight") {
		channel.send("*ROW ROW FIGHT THE POWAH!*");
	}
	
	if(cmd == "stfu") {
		channel.send("*no u xd*");
	}
	
	if(cmd == "flip") {
		function coinFlip() {
		return (Math.floor(Math.random() * 2) == 0) ? "Heads!" : "Tails!";
		}
		channel.send(coinFlip())
	}
	
	if(cmd == "d20") {
		channel.send(Math.ceil(Math.random() * 20) + "!")
	}


}

exports.OnMessage = OnMessage;
exports.onRawMessage = OnRawMessage;