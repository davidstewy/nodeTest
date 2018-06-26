const http = require('http');
const textBody = require("body");
const jsonBody = require("body/json");


var scores = [{
    name: "Edwin",
    score: 50
}, {
    name: "David",
    score: 39
}];

const resources = {
    "/scores": ""
};

const hostname = '127.0.0.1';
// const hostname = null;
// const hostname = '192.168.200.42';
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.method === "GET") {
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
            res.end()
        } else {
           
            jsonBody(req, res, (err, body) => {
                // if (err) {
                //     res.statusCode = 500
                //     console.log(err);
                //     return res.end(JSON.stringify(err));
                // }

                res.statusCode = 200;
                // I am an echo server
                res.setHeader("content-type", "application/json")
                res.end(JSON.stringify(scores))
            })
        }
    } else if (req.method === "POST") {

        res.statusCode = 201;

        jsonBody(req, res, (err, body) => {
            
            scores.push(body);
            scores.sort((a, b) => b.score - a.score);
            scores = scores.slice(0, 3);
            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(scores))
        });

    };

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// textBody(req, res, (err, requestBody) => {
//     resources[req.url] = requestBody;
//     const responseBody = resources[req.url];
//     res.end(responseBody)
//   })