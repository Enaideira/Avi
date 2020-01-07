"use strict";

var
    search = require("youtube-search"),
	config = require("../config").config;

function OnRawMessage(conn, nick, msg, channel) {
	//
}


function OnMessage(conn, nick, channel, msg, cmd, args, opts, err, results) {
	let self = this

	if(cmd == "yt") {
		var yt = args,
		opts = {
			MaxResults: 1,
			key: config.YT_API_KEY
		};
		search(yt, opts, function(err, results) {
			if(err) {
				channel.send("I couldn't find anything with *" + yt + "!*");
				return console.log(err);
			}
			channel.send(results[0].link);;
		});
	}
}

exports.OnMessage = OnMessage;
exports.onRawMessage = OnRawMessage;