

const db =  {
	connectionString: "postgres://fyeznwonhtmkgq:bdf707c421a12f82fbf92c847662f9135d02a0a2bb283aaa531be9760954b3fb@ec2-50-16-196-57.compute-1.amazonaws.com:5432/db5vjg2n7ir74t",
	ssl:true,
	contentType: 'application/json'
};


const pgp = require('pg-promise')();
const client = pgp(db);
const express = require('express');
var app = express();
//const cheerio = require('cheerio');
var bodyParser = require('body-parser');
//var fs = require('fs');
//const $ = cheerio.load(fs.readFileSync(__dirname+"/form.html"));

var id = 3;

//var rows = false;

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true}));

client.connect();

/*
Other Possibly Useful Nodes (not included):
	- request (or request-promise)
	- Bluebird
*/