"use strict";

var 
	bot        = require("../bot"),
	humanize   = require("humanize"),
	Discord    = require("discord.js"),
	util       = require("util"),
	os         = require("os"),
	config     = require("../config").config;
	
const { ShardingManager } = require('discord.js');

function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

const clean = text => {
    if(typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
    else
        return text
}

String.prototype.toDDHHMMSS = function () {
	var sec_num = parseInt(this, 10);
	var days    = Math.floor(sec_num / 86400);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (days    < 10) {days    = "0"+days;}
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = days + " days, " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds";
    return time;
}





function OnMessage(conn, nick, channel, msg, cmd, args) {
	
		if(cmd == "sys") {
			var cpus = os.cpus();
			for(var i = 0, len = cpus.length; i < len; i++) {
				var cpu = cpus[i], total = 0;

    for(var type in cpu.times) {
        total += cpu.times[type];
		}
		for(type in cpu.times) {
			var loads = ("\t", type, Math.round(100 * cpu.times[type] / total));
			}
		}
		    var p = process.uptime();
		    var pt = (p + "").toDDHHMMSS();
			var t = os.uptime();
		    var u = (t + "").toDDHHMMSS();
		channel.send({embed: {
			color: 16220659,
			author: {
				name: conn.user.username,
				icon_url: conn.user.avatarURL
				},
			title: "System Stats",
			fields: [{
				
		name: "***Server Uptime***",
		value: "*" + u + "*"
		},
		{		
		name: "***Process Uptime***",
        value: "*" + pt + "*"
      },
      {
        name: "***Free Memory***",
        value: "*" + formatBytes(os.freemem()) + "*"
      },
      {
        name: "***Total Memory***",
        value: "*" + formatBytes(os.totalmem()) + "*"
      },
	  {
        name: "***Server Loads***",
        value: "*" + Math.round(os.loadavg()[0]) + ", " + Math.round(os.loadavg()[1]) + ", " + Math.round(os.loadavg()[2]) + "*"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: conn.user.avatarURL,
      text: "Running with love on " + os.type() + "."
    }
  }
});
		}
	
	if(cmd == "ut") {
		var time = process.uptime();
		var uptime = (time + "").toHHMMSS();
		var pretty = "*I've been running for* " + "***" + (uptime) + ".***";
		channel.send(pretty);
	}
	
	if(cmd == "ping") {
		var start = Date.now()
		channel.send("```Pinging...```").then(m => m.edit("```Pong! " + (Date.now() - start) + "ms```"));
	}
	
	if(cmd == "eval") {
		if(msg.author.id !== config.OWNER_ID) {
			channel.send("You cannot run this command.");
			return;
		}
		try {
			let evaled = eval(args)
			channel.send(evaled), {code:"xl"}
			} catch (err) {
				channel.send(`\*An error was found!\* \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
	}
	
	if(cmd == "rs") {
		if(msg.author.id !== config.OWNER_ID) {
			channel.send("You cannot run this command.");
			return;
		} .
			process.exit();
}

	if(cmd == "help") {
		channel.send({embed: {
			color: 16220659,
			author: {
				name: msg.author.username,
				icon_url: msg.author.avatarURL
				},
			title: "Welcome to The Avi Project!",
			description: "My prefix is the **`** key! All of my commands will need this character for me to respond!",
			fields: [{
				
		name: "Helpful Links",
		value: "You can click on the following links for more support!"
		},
		{		
		name: "***Support Server***",
        value: "*• We have our own support server, which you can find [here](https://discord.gg/2WThdyH)!*"
      },
      {
        name: "***Twitter***",
        value: "*• You can follow us on Twitter [here](http://twitter.com/TheAviProject)!*"
      },{
        name: "***Website***",
        value: "*• You can find our website [here](https://earthchan.dev/avi)!*"
      },
      {
        name: "***Invite***",
        value: "*• Want Avi on your server? You can invite her [here](https://discordbots.org/bot/567856980048347156)!*"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: conn.user.avatarURL,
      text: "© 2009-2019 The Avi Project | Ver. 1.1.01"
    }
  }
});
	}
}



function OnRawMessage(conn, nick, msg, channel) {
	//
}


exports.OnMessage = OnMessage;
exports.onRawMessage = OnRawMessage;