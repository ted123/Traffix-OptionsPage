var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : "localhost",
	user     : "root",
	password : "",
	database : "traffix",
});

connection.connect();

module.exports = {
	browse: function (entry,table,col,callback){ //browse for RETRIEVE
		var table = table;
		var entry = entry;
		var col = col;
		console.log("SELECT * FROM "+table+" WHERE "+col+"=\'" +entry+"\'");
	  
		connection.query("SELECT * FROM "+table+" WHERE "+col+"='" +entry+"'", function(err, rows, fields) {
	   if(err) throw err;
	   callback(rows);
	   }); //end query
	}, //end browse

	browseall: function (table,callback){ //browse for RETRIEVE
		var table = table;

		console.log("SELECT * FROM "+table);
	  
		connection.query("SELECT * FROM "+table, function(err, rows, fields) {
	   if(err) throw err;
	   callback(rows);
	   }); //end query
	}, //end browseall

	remove: function(entry,table,col,callback){ //remove for DELETE
		var table = table;
		var entry = entry;
		var col = col;
	  	console.log("DELETE FROM "+table+" WHERE "+col+"='" +entry+"'");
	  connection.query("DELETE FROM "+table+" WHERE "+col+"='" +entry+"'", function(err, rows, fields) {
	  if(err) throw err;
	  callback("TRUE");
	  }); //end query
	}, //end remove

	insert: function(entry,table,callback){ //insert for INSERT
		var table = table;
		var entry = entry;
	  	
		var entry_length = entry.length;
		var values = "";

		for(var i = 0; i < entry_length; i++)
		{
			values = values + "'" + entry[i] + "'";
			if(i != entry_length - 1)
				values = values + ",";
		}

		connection.query("SELECT * FROM "+table, function(err,rows,fields){
			var fields_length = fields.length;
			var column = "";
			for(var i = 0; i < fields_length; i++)
		{
			column = column + fields[i].name;
			if(i != fields_length - 1)
				column = column + ",";
		}
		connection.query("INSERT INTO "+table+"("+column+") VALUES("+values+")",function(err,rows,fields){
			if(err) throw err;
			callback("TRUE");
		}); //end inner query
		}); //end outer query
	}, //end iinsert

	update: function(entry,table,callback){ // update for UPDATE
		var table = table;
		var entry = entry;
		connection.query("SELECT * FROM "+table, function(err,rows,fields){
	  	var fields_length = fields.length;
	  	var column=[];
	  	for(var i = 0; i < fields_length; i++)
			column[i] = fields[i].name;
		var column_length = column.length;
		for(var i = 0; i < column_length; i++){
			connection.query("UPDATE "+table+" SET "+column[i]+"='"+entry[i]+"' WHERE "+column[0]+"='"+entry[0]+"'",function(err,rows,fields){
			if(err) throw err;
			callback("TRUE");
			}); //end query
		} //end for loop
	 	});

	}
}

