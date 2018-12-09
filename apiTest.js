exports.recipeTest = function getRecipeTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/recipes/410";
	$.getJSON(url, function( data ) {
		return data;
	});
}

exports.userTest = function getUserTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/users/17";
	$.getJSON(url, function( data ) {
		return data;
	});
}

exports.ingredientTest = function getIngredientTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/ingredients/20";
	$.getJSON(url, function( data ) {
		return data;
	});
}