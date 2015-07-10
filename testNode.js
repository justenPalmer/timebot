
var timebot = require('timebot');

var getTime = function(){
	var D = new Date();
	return D.getTime();
};
var logTime = function(timeout,looped){
	var now = getTime();
	console.log('timeout:',timeout,'looped:',looped ,'time:',now-start);
};

var start = getTime();

console.log('timebot test at:',start);
timebot.set({period:3000,loop:true},function(looped){
	logTime(1,looped);
});

timebot.set({tag:'2',period:300,loop:3},function(looped){
	logTime(2,looped);
});

timebot.set({period:600},function(looped){
	logTime(3,looped);
	timebot.clear('2');
});