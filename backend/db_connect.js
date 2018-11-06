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

app.post('/getRecipeInfo', function(req, disp){
	console.log(req.body);
	client.any(`select * from recipes where name = '${req.body.recipename}';`, [true])
		.then(function(data){
			$('.removable').remove();
			console.log(JSON.stringify(data));
			for (var i = 0; i < data.length; i++)
			{
				if (row.public == true)
				{
					var rows = data[i];
					$('tbody').append(`tr class = "removable"><td>${rows.name}</td><td>${rows.category}</td><td><button>Open</button></tr>`);
				}
				
			}
			var temp = $.html();
			disp.send(temp);
		})
		.catch(function(error){
			disp.send(error);
		});
});


//here
app.post('/uploadRecipe', function(req, disp){
	console.log(req.body);
	client.any(`insert into recipes values ('${req.body.user_id}', '${req.body.r_name}'), '${req.body.category}'), '${req.body.public}')`)
		.then(function(data){
			disp.send(`<!DOCTYPE html><html>
					<head>
						<title>Successfully added</title>
					</head>
					<body>
						<h1>Successfully added values</h1>
						<a href = "/">Go back to front page</a>
					</body>
				</html>`);
		})
		.catch(function(error){
			disp.send(error);
		});
});

app.post('/uploadIngredients', function(req, disp){
	console.log(req.body);
	client.any(`insert into ingredients values ('${req.body.recipe_id}', '${req.body.i_name}'), '${req.body.amount}')`)
		.then(function(data){
			disp.send(`<!DOCTYPE html><html>
					<head>
						<title>Successfully added</title>
					</head>
					<body>
						<h1>Successfully added values</h1>
						<a href = "/">Go back to front page</a>
					</body>
				</html>`);
		})
		.catch(function(error){
			disp.send(error);
		});
});

app.post('/uploadSteps', function(req, disp){
	console.log(req.body);
	client.any(`insert into users values (${req.body.recipe_id}', '${req.body.steps}')`)
		.then(function(data){
			disp.send(`<!DOCTYPE html><html>
					<head>
						<title>Successfully added</title>
					</head>
					<body>
						<h1>Successfully added values</h1>
						<a href = "/">Go back to front page</a>
					</body>
				</html>`);
		})
		.catch(function(error){
			disp.send(error);
		});
});

app.get('/', function(req, disp){
	client.any('SELECT * from users;', [true])
		.then(function(data){
			$('.removable').remove();
			console.log(JSON.stringify(data));
			for(var i = 0; i < data.length; i++){
				var rows = data[i];
				console.log(rows.username);
				$('tbody').append(`<tr class = "removable"><td>${rows.id}</td><td>${rows.username}</td><td>${rows.email}</td></tr>`);
				//rows = true;
				id = rows.id;
			}
			id = id+1;
			var temp = $.html();
			disp.send(temp);
		}).catch(function(err){
			disp.send(err);
		});
});