/*
const db =  {
	connectionString: "postgres://fyeznwonhtmkgq:bdf707c421a12f82fbf92c847662f9135d02a0a2bb283aaa531be9760954b3fb@ec2-50-16-196-57.compute-1.amazonaws.com:5432/db5vjg2n7ir74t",
	ssl:true,
	contentType: 'application/json'
};
*/

const Pool = require('pg').Pool;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
  	ssl: true,
  	contentType: 'application/json'
});


const makeRecipe = function(req, res){
	const {id, owner_id, name, category, public, steps} = req.body;
	pool.query('insert into recipes (owner_id, name, category, public, steps) values($1,$2,$3,$4,$5)', [owner_id, name, category, public, steps], function(err, results){
		if(err){
			throw err;
		}
		//res.status(200).send("Successfully added recipe: |" + id + "|" + owner_id + "|" + name + "|" + category + "|" + public + "|" + steps);
	});
	
	res.status(200).send('Successfully added recipe');
};

const getRecipe = function(req, res){
	pool.query('select * from recipes order by id asc', function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

const getRecipeByID = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('select * from recipes where id = $1', [id], function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

const getRecipeByUser = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('select * from recipes where owner_id = $1', [id], function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

const getPublicRecipeByUser = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('select * from recipes where owner_id = $1 and public = true', [id], function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};

const editRecipeSteps = function(req, res){
	const {steps} = req.body;
	const editID = parseInt(req.params.id);
	console.log(JSON.stringify(steps));
	pool.query('update recipes set steps = $1 where id = $2', [steps, editID],function(err, results){
		if (err) {
        	throw err;
      	}
      	res.status(200).send(`Recipe with id ${editID} was successfully modified`);
	});
};

const deleteRecipe = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('delete from recipes where id = $1', [id], function(err, results){
		if (err) {
      		throw err;
    	}
    	response.status(200).send(`Recipe deleted with ID: ${id}`)
	});
};

const getIngredients = function(req, res){
	pool.query('select * from ingredients', function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};


const getIngredientsByID = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('select * from ingredients where id = $1', [id], function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};


const editIngredientName = function(req, res){
	const {name} = req.body;
	const editID = parseInt(req.params.id);
	pool.query('update ingredients set name = $1 where id = $2', [name, editID],function(err, results){
		if (err) {
        	throw err;
      	}
      	res.status(200).send(`Ingredient with id ${editID} was successfully modified`);
	});
};

const editIngredientAmt = function(req, res){
	const {amount} = req.body;
	const editID = parseInt(req.params.id);
	pool.query('update ingredients set amount = $1 where id = $2', [amount, editID],function(err, results){
		if (err) {
        	throw err;
      	}
      	res.status(200).send(`Ingredient with id ${editID} was successfully modified`);
	});
};

const addIngredient = function(req, res){
	const {id, recipe_id, name, amount} = req.body;
	pool.query('insert into ingredients (recipe_id, name, amount)values($1,$2,$3)', [recipe_id, name, amount], function(err, results){
		if(err){
			throw err;
		}
	});
	res.status(200).send('Successfully added Ingredient');
};

const deleteIngredient = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('delete from ingredients where id = $1', [id], function(err, results){
		if (err) {
      		throw err;
    	}
    	response.status(200).send(`Ingredient deleted with ID: ${id}`)
	});
};

const addUser = function(req, res){
	const {username, email, hash_pass} = req.body;
	pool.query('insert into users (username, email, hash_pass) values($1,$2,$3)', [username, email, hash_pass], function(err, results){
		if(err){
			throw err;
		}
	});
	res.status(200).send('Successfully added user');
};

const deleteUser = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('delete from users where id = $1', [id], function(err, results){
		if (err) {
      		throw err;
    	}
    	response.status(200).send(`User deleted with ID: ${id}`)
	});
};

const editUserEmail = function(req, res){
	const {email} = req.body;
	const editID = parseInt(req.params.id);
	pool.query('update users set email = $1 where id = $2', [email, editID],function(err, results){
		if (err) {
        	throw err;
      	}
      	res.status(200).send(`User with id ${editID} was successfully modified`);
	});
};

const editUserPassword = function(req, res){
	const {hash_pass} = req.body;
	const editID = parseInt(req.params.id);
	pool.query('update users set hash_pass = $1 where id = $2', [hash_pass, editID],function(err, results){
		if (err) {
        	throw err;
      	}
      	res.status(200).send(`User with id ${editID} was successfully modified`);
	});
};

const getUsers = function(req, res){
	pool.query('select * from users', function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};


var getUsersByID = function(req, res){
	const id = parseInt(req.params.id);
	pool.query('select * from users where id = $1', [id], function(err, results){
		if(err){
			throw err;
		}
		res.status(200).json(results.rows);
	});
};


module.exports = {
	makeRecipe,
	getRecipe,
	getRecipeByID,
	editRecipeSteps,
	deleteRecipe,
	getIngredients,
	getIngredientsByID,
	getRecipeByUser,
	getPublicRecipeByUser,
	editIngredientName,
	editIngredientAmt,
	addIngredient,
	deleteIngredient,
	addUser,
	deleteUser,
	editUserEmail,
	editUserPassword,
	getUsers,
	getUsersByID
};

