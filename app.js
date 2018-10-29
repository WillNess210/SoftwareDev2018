const http = require('http');
const port=process.env.PORT || 3000
const cheerio = require('cheerio');
var bodyParser = require('body-parser');
var fs = require('fs');
const $ = cheerio.load(fs.readFileSync(__dirname+"/index.html"));
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/html');
res.end('<h1>Hello World</h1>');
});
server.listen(port,() => {
console.log(`Server running at port `+port);
});
