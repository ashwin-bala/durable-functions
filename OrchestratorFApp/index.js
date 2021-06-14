/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const tasks = [];
    const input = context.df.getInput();
    context.log(input)
    for (i = 1; i <= input.runsize ; i++) {
        context.log(i);
        tasks.push(context.df.callActivity("Hello1", i));
   }
       const results = yield context.df.Task.all(tasks);
   

    // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
    return results;
});