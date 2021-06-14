/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const request = require("request-promise-native");

module.exports = async function (context,todonumber) {
    context.log("---------------------",todonumber);
     try {
        const data = await getTodo(todonumber);
        context.done(null, data);
        //Run in parallel
        //return data;
    } catch (err) {
        context.log(`Hello Function encountered an error: ${err}`);
        console.error(err);
          context.done(null, err);
    }

    
};

async function getTodo(todonumber) {
    const options = {
        url: `https://jsonplaceholder.typicode.com/todos/${todonumber}`,
        method: 'GET',
        json: true
    };

    const body = await request(options);
    if (body.error) {
        throw body.error;
    } else if (body.response && body.response.error) {
        throw body.response.error;
    } else {
        return body;
    }
}
