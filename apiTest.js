function getRecipeTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/recipes/40";
	$.getJSON(url, function( data ) {
		return data;
	});
}

function getUserTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/users/17";
	$.getJSON(url, function( data ) {
		return data;
	});
}

function getIngredientTest(){
	var url = "https://djibouti-recipe.herokuapp.com/api/ingredients/20";
	$.getJSON(url, function( data ) {
		return data;
	});
}