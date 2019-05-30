"use strict";

let	_          = require("underscore"),
	Q          = require("q"),
	util       = require("util"),
	Discord    = require("discord.js"),
	config     = require("./config").config,
	humanize   = require("humanize"),
	fs         = require("fs"),
	modman	   = require("./modman");
	
const { ShardingManager } = require('discord.js');

function Relay() {
	let self = this;
	this._modman = new modman.M();
	this._modman.LoadPlugins();
	this._plugins = this._modman.pl();
	this._initDiscord();

	
}



Relay.prototype._initDiscord = function() {
	var
		self = this;
		this.discord = new Discord.Client({ autoReconnect: false, fetchAllMembers: true});
		this.discord.login(config.DISCORD_API_TOKEN);
	this._handleDiscord(this.discord);
}


Relay.prototype.updateFriends = function() {
    var
        self = this,
        x = self.discord.users.size,
		y = self.discord.guilds.size,
        xv = "with " + x + " friends on " + y + " servers!";
    self.discord.user.setActivity(xv);
    setTimeout(this.updateFriends.bind(this), 300 * 1000);
}
	



Relay.prototype.msgChannel = function(c, ctx) {
		let self = this;
		let ct = "{Discord} " + c + " > : " + ctx;
		console.log( "<" + ct);
		self.discord.channels.get(c).send(ctx, {split: 1, disableEveryone: 1});
};


Relay.prototype.rawMsgChannel = function(c, ctx) {
		let self = this;
		let ct = "{Discord} " + c + " > : " + ctx;
		console.log( "<" + ct);
		self.discord.channels.get(c).send(ctx);
};

Relay.prototype._handleDiscord = function(m) {
	var self = this;
	m.on("ready", function() {
		console.log("Connected to Discord.");
		self.updateFriends();
	});
	
	m.on("message", async msg =>  {
		"use strict";
		if(msg.author.bot) { return };
		let
			content = msg.content,
			isMe = false;
		let displayName = msg.author.nickname || msg.author.username;
		let pretty = "[" + displayName + "] " + content; 
		if(content[0] === "`") {
			let body = content.slice(1).split(" ");
			let cmd  = body[0].toLowerCase();
			let args = body.slice(1).join(" ");
			for(let plugin in self._plugins) {
				if (self._plugins[plugin].OnMessage !== undefined) {
					m.discord = self.discord;
					self._plugins[plugin].OnMessage(m, displayName, msg.channel, msg, cmd, args);
				}
			}
		}
	});
}

Relay.prototype.closeDiscord = function() {
	var self = this;
}

if (!module.parent) {
	let Bot = new Relay();
	exports.Bot = Bot;
	
	process.on('SIGINT', function(code) {
		console.log('\nShutting down...');
	        //relay.closeDiscord();
	        setTimeout(function() {
	                process.exit()
	        }, 1000);
	});


	process
	  .on('unhandledRejection', (reason, p) => {
	    console.error(reason, 'Unhandled Rejection at Promise', p);
		fs.appendFile("logs/rejections.log", reason.stack + "\n",  (reason) => { if (reason) throw reason;});
	  })
	  .on('uncaughtException', err => {
		console.log(err),
		fs.appendFile("logs/exceptions.log", err.stack + "\n",  (err) => { if (err) throw err;});

	    //console.error(err, 'Uncaught Exception thrown');
	    //process.exit(1);
	  });
}
