# timebot
Tiny JS utility for managing multiple timeouts and intervals. Timebot provides a centralized and organized way of managing timed asynchronous functions. Also, since it will only run one interval on the system, it can be a lot more efficient than running separate intervals.

1. Allows pausing and resuming of queued timeouts
2. Use a tag on timeouts to isolate and perform actions on only groups of timeouts
3. Use it in the browser and with node.js

```` javascript

//to set a looping timeout (interval)
timebot.set({period:400,loop:true},function(i){
  console.log('looped ' + i + ' times');
});

//to set a timeout to execute 3 times
timebot.set({period:1200,loop:3},function(i){
  console.log('looped ' + i + ' times');
});

````
