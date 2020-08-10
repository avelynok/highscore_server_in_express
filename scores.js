const textBody = require("body");
const resources = { "/scores": ""};
const http = require('http');
const jsonBody = require("body/json"); 
let scores = [{name: "Edwin", score: 50}, {name: "David", score: 39}];

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
if(req.method === "GET") {
    if(resources[req.url] === undefined) {
        res.statusCode = 404;
        res.end("ERROR NOT FOUND"); 
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const responseBody = JSON.stringify(scores);
        res.end(responseBody);
    }
} else if(req.method === "POST") {
    res.statusCode = 201;
    jsonBody(req, res, (err, requestBody) => {
    score = requestBody;
    const responseBody = JSON.stringify(scores.push(score));
    scores = scores.sort((a, b) => b.score - a.score);
    scores = scores.splice(0,3);
    res.end(responseBody);
    })
}
  console.log(req.url);
  console.log(req.headers);
  console.log(req.method);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});