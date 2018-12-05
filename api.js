//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const port = 3000;
const db = require('./queries')
var session = require('cookie-session');
const Client = require('pg').Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
    ssl: true,
    contentType: 'application/json'
});


//set port
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


var router = express.Router();

//https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.set('trust proxy', 1) // trust first proxy

app.use(session({
   name: 'userSession',
   keys: ['Somebody', 'Once', 'Told', 'Me'],
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
//use req.session, store user especially when it comes to dashboard

/*
app.get('/', (request, response) => {
  //response.sendFile(__dirname + "/test.html");
  response.send('Beginning');
});
*/


//This is the API Routing

router.get('/recipes', db.getRecipe);
router.post('/recipes', db.makeRecipe);
router.get('/recipes/:id', db.getRecipeByID);
router.get('/recipes/user/:id', db.getRecipeByUser);
router.get('/recipes/user-public/:id', db.getPublicRecipeByUser);
router.put('/recipes/:id', db.editRecipeSteps);
router.delete('/recipes/:id', db.deleteRecipe);
router.get('/ingredients', db.getIngredients);
router.get('/ingredients/:id', db.getIngredientsByID);
router.put('/ingredients/name/:id', db.editIngredientName);
router.put('/ingredients/amt/:id', db.editIngredientAmt);
router.post('/ingredients', db.addIngredient);
router.delete('/ingredients/:id', db.deleteIngredient);
router.post('/users', db.addUser);
router.delete('/users/:id', db.deleteUser);
router.put('/users/email/:id', db.editUserEmail);
router.put('/users/pwd/:id', db.editUserPassword);
router.get('/users', db.getUsers);
router.get('/users/:id', db.getUsersByID);

app.use('/api', router);

app.set('view engine', 'ejs');
//Routing for all other pages

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/secret/page/", function(req, res) {
	res.sendFile(__dirname + "/profile-test-image.jpg");
});

app.get("/upload", function(req, res){
	if(!req.session.user_id)
		res.redirect("/signin");
	else
		res.sendFile(__dirname + "/upload.html");
});

app.get("/signin",function(req, res){
  if(!req.session.user_id){
    res.sendFile(__dirname + "/login.html");

    //below here are tests, once login up, comment these, uncomment first line
    /*
    req.session.user_id = 2;
    console.log(req.session.user_id);
    res.redirect("/dashboard");
    */
  }
  else
    res.redirect("/dashboard");
});

app.post("/signin",function(req, res){
  //query here
  //do sign in queries on front end, this is result when query is true
  //get id (ajax post request to this)
  //https://stackoverflow.com/questions/39037494/send-data-with-jquery-to-node-application
  if(!req.session.user_id){
    req.session.user_id = parseInt(req.body.id);
    console.log("Redirecting");
    console.log(req.body);
    console.log(req.session.user_id);
    res.redirect("/dashboard");
  }
  else{
    res.redirect("/dashboard");
  }

});

app.get("/dashboard",function(req, res){
  if(!req.session.user_id){
    res.redirect("/signin");
    //res.render(__dirname + '/profile.ejs', {user_id: 2});
    //res.send("user id not detected");
  }
  else{
  	//This part needs to be edited, as we cannot do 2 send calls
  	//Front end will need to be edited
  	//Refer to the stack overflow link: https://stackoverflow.com/questions/37991995/passing-a-variable-from-node-js-to-html
  	//we may need to use ejs
    console.log("in dashboard - successful");
    //res.send(req.session.user_id);
    res.render('profile', {user_id: req.session.user_id});

    //res.sendFile(__dirname +"/profile.html");
  }
});

app.get("/logout", function(req, res){
  if(!req.session.user_id){
    console.log("You're stupid you should've logged in first");
  }
  else{
    req.session = null;
    res.redirect("/");
  }
});

app.listen(port, function() {
	console.log("app running");
});






