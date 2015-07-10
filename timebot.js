/***** TIMEBOT *****/
/* authored by J Palms - http://jpalms.com */

(function(root){
	"use strict";

	var me = {};
	var ns = 'timebot';

	if (root.location){ //is a browser
		if (!root[ns]) root[ns] = me;
		else console.log('timebot namespace already taken:',ns);
	}
	else { //is node
		if (module !== undefined && module.exports !== undefined){
			module.exports = me; //export for node
		}
	}

	var started = false,
		bots = {},
		interval = 100;

	/*
	set (fun): sets an action to be performed at a certain time
		d (obj)
			tag (str): categorizes a callback into a class
			period (num): number of milliseconds between triggers
			loop (bool or num): if true will loop forever, if a num will loop that many times
		callback (fun): function to be executed on specified time periods
	*/
	me.set = function(d, callback){
		var bot = d;
		bot.i = 0;
		bot.looped = 0;
		bot.cb = callback;
		d.tag = d.tag || '_';
		bots[d.tag] = bots[d.tag] || [];
		bots[d.tag].push(bot);
		me.start();
	};

	/*
	pause (fun): pauses actions with a specified tag, or all if no tags are specified
		tag (str): class of callbacks to pause
	*/
	me.pause = function(tag){ //pause all animations with a specified key
		if (bots[tag]){
			for (var i=0,len=bots[tag].length;i<len;i++){
				bots[tag][i].paused = true;
			}
			return;
		}
		for (var tag in bots){
			for (var i=0,len=bots[tag].length;i<len;i++){
				bots[tag][i].paused = true;
			}
		}
	};

	/*
	clear (fun): clears all timeouts with a tag, or all if no tags are specified
		tag (str): class of callbacks to clear
	*/
	me.clear = function(tag){ //clears all timeouts with a tag (or all if no tags are specified)
		if (bots[tag]) bots[tag] = [];
		else {
			bots = {};
		}
	};

	/*
	resume (fun): resumes all timeouts with a tag, or all if none specified
		tag (str): class of callbacks to resume
	*/
	me.resume = function(key){
		if (bots[tag]){
			for (var i=0,len=bots[tag].length;i<len;i++){
				bots[tag][i].paused = false;
			}
			return;
		}
		for (var tag in bots){
			for (var i=0,len=bots[tag].length;i<len;i++){
				bots[tag][i].paused = false;
			}
		}
	}

	/*
	start (fun): starts main bot interval, will start only once
	*/
	me.start = function(){ 
		if (!started){
			started = true;
			setInterval(function(){
				//loop through timeouts and intervals
				for (var tag in bots){
					var i = 0;
					while (bots[tag] && bots[tag][i]){
						var bot = bots[tag][i];
						i++;
						if (bot.paused) continue;
						bot.i += interval;
						if (bot.i >= bot.period){ //perform action
							bot.paused = false;
							bot.looped++;
							if (bot.cb) bot.cb(bot.looped); //anything can happen in this cb even affecting the bots obj
							if (bot.loop === true || bot.looped < bot.loop){
								bot.i = 0;
								continue;
							}
							i--;
							if (bots[tag]) bots[tag].splice(i,1);
						}
					}
				}
			},interval);
		}
	};
})(this);
