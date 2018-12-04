function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
	queryString = queryString.split('#')[0];
	var arr = queryString.split('&');

	for (var i=0; i<arr.length; i++) {
	  var a = arr[i].split('=');
	  var paramNum = undefined;
	  var paramName = a[0].replace(/\[\d*\]/, function(v) {
		paramNum = v.slice(1,-1);
		return '';
	  });
	  var paramValue = typeof(a[1])==='undefined' ? true : a[1];
	  paramName = paramName.toLowerCase();
	  paramValue = paramValue.toLowerCase();
	  if (obj[paramName]) {
		if (typeof obj[paramName] === 'string') {
		  obj[paramName] = [obj[paramName]];
		}
		if (typeof paramNum === 'undefined') {
		  obj[paramName].push(paramValue);
		}
		else {
		  obj[paramName][paramNum] = paramValue;
		}
	  }
	  else {
		obj[paramName] = paramValue;
	  }
	}
  }

  return obj;
}
var numIngredients = 1;
function addIngredientField(){
	if(numIngredients < 10){
		numIngredients++;;
		var container = document.getElementById("ingredients");
		var hr = document.createElement("hr");
		container.appendChild(hr);
		var row = document.createElement("div");
		row.className = "row addform";
		var col1 = document.createElement("div");
		col1.className = "col";
		var inp1 = document.createElement("input");
		inp1.type = "text";
		inp1.className = "form-control";
		inp1.placeholder = "Ingredient " + numIngredients + " Name";
		inp1.id = "inp" + numIngredients + "name";
		inp1.maxlength = "40";
		col1.appendChild(inp1);
		var col2 = document.createElement("div");
		col2.className = "col";
		var inp2 = document.createElement("input");
		inp2.type = "text";
		inp2.className = "form-control";
		inp2.placeholder = "Ingredient Amount (ex: 1 cup, 8 handfuls, etc..)";
		inp2.maxlength = "40";
		inp2.id = "inp" + numIngredients + "amt";
		col2.appendChild(inp2);
		row.appendChild(col1);
		row.appendChild(col2);
		container.appendChild(row);
	}
}

var numSteps = 1;
function addStepField(){
	if(numSteps < 10){
		numSteps++;
		var container = document.getElementById("steps");
		var hr = document.createElement("hr");
		container.appendChild(hr);
		var row = document.createElement("div");
		row.className = "form-group row";
		var label = document.createElement("label");
		label.for = "step" + numSteps;
		label.className = "col-sm-1 col-form-label";
		label.textContent = "Step " + numSteps;
		var divCol = document.createElement("div");
		divCol.className = "col-sm-10";
		var input = document.createElement("input");
		input.type = "text";
		input.className = "form-control";
		input.id = "step" + numSteps;
		input.placeholder = "Step Details";
		input.maxlength = "140";
		row.appendChild(label);
		divCol.appendChild(input);
		row.appendChild(divCol);
		container.appendChild(row);
	}
}

/*function removeIngredientField(){
	if(numIngredients > 1){
			
	}
}*/
