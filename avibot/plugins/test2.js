"use strict";

var
    search = require("youtube-search"),
	config = require("../config").config;

function OnRawMessage(conn, nick, msg, channel) {
	//
}

function OnMessage(conn, nick, channel, msg, cmd, args, opts, err, results) {
	let self = this

	if(cmd == "dm") {
		if(["!", "/", ';', '`'].includes(args[0])) {
			//
		} else {
			let x;
			let user;
			let newargs = args.split(": ");
			console.log(newargs);
			
			if(newargs.length > 1) {
				user = newargs[0].trim();
			} else {
				channel.send("Invalid Number of Params < 2 by a split of ```:  ```");
				return
			}
			if(user.match(/<@(!|)(\d+)>/g)) {
				const userid = newargs[0].replace(/<@(!|)(\d+)>/gi, (match, $1) => {
					let r = new RegExp(/<@(!|)(\d+)>/g, "g").exec(match)[2];
					return msg.channel.guild.members.get(r).id;
				})
				x = userid.trim();
			}
			if(x != undefined) {
				conn.users.get(x).send(newargs[1]);
				channel.send("Message sent!");
				
			}
		}
	};
}

exports.OnMessage = OnMessage;
exports.onRawMessage = OnRawMessage;