//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const port = 3000;
const db = require('./queries')

//set port
var port = process.env.PORT;

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

/*
app.get('/', (request, response) => {
  //response.sendFile(__dirname + "/test.html");
  response.send('Beginning');
});
*/

router.get('/recipes', db.getRecipe);
router.post('/recipes', db.makeRecipe);
router.get('/recipes/:id', db.getRecipeByID);
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
router.put('/users/:id', db.editUserEmail);
router.get('/users', db.getUsers);
router.get('/users/:id', db.getUsersByID);

app.use('/api', router);

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/secret/page/", function(req, res) {
	res.render("profile-test-image.jpg");
});

app.listen(port, function() {
	console.log("app running");
});

app.listen(port, () => {
  console.log(`router running on port ${port}.`)
});




