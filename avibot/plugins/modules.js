"use strict";

var 
	bot = require("../bot"),
	config = require("../config").config;

function OnMessage(conn, nick, channel, msg, cmd, args) {
	
	if(cmd == "modules") {
		var plugs = bot.Bot._modman.getPlugins();
		var ret = plugs.join(", ");
		var outret = "*Plugins currently loaded* ***(" + plugs.length.toString() + "):*** " + "*" + ret + "*";
		channel.send(outret);
	}
	if(cmd == "load") {
		if(msg.author.id !== config.OWNER_ID) {
			channel.send("You cannot run this command.");
			return;
		}
		var mod = args;
		var modman = bot.Bot._modman;
		if(modman.isLoaded(mod)) {
			var ret = "This module is already loaded!";
		} else if(modman.load(mod)) {
			ret = "Loading... Done!";
		} else {
			ret = "The module doesn't exist in the plugins folder!";
		}
		channel.send(ret);
	
	}

	if(cmd == "reload") {
		if(msg.author.id !== config.OWNER_ID) {
			channel.send("You cannot run this command.");
			return;
		}
		
		var mod = args;
		var modman = bot.Bot._modman;
		if(modman.reload(mod)) {
			var ret = "Reloaded the module!";
		} else {
			var ret = "Failed to reload the module! D:";
		}
		channel.send(ret);
	}

	if(cmd == "unload") {
		if(msg.author.id !== config.OWNER_ID) {
			channel.send("You cannot run this command.");
			return;
		}
		
		var modman = bot.Bot._modman;
		if(modman.isLoaded(args)) {
			modman.unload(args);
			var ret = "Module unloaded.";
		} else {
			var ret = "Module isn\'t loaded or doesn\'t exist.";
		}
		channel.send(ret);
	}
}


	
exports.OnMessage = OnMessage;
