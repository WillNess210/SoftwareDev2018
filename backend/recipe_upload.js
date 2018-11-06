require("db_connect.js");

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