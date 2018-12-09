const recipeTest = require('../recipeTest');
const ingredientTest = require('../ingredientTest');
const userTest = require('../userTest');



test('Api Call to Recipe of ID 410, should match info pulled directly from database', () => {
	var data = recipeTest();
	var id = data[0];
	var owner = data[1];
	var name - data[2];
	var category = data[3];
	var public = data[4];
	var steps = data[5];
  	expect(id.toBe(410);
  	expect(id.toBe(17);
  	expect(id.toBe("F in the Chat");
  	expect(id.toBe(0);
  	expect(id.toBe(true);
  	expect(id.toBe("Press F in the Chat");
});