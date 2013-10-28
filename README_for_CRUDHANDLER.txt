*********************************************************************
*		You cannot use this for more complicated queries!			*
*	   For simple INSERT, RETRIEVE, UPDATE and DELETE only			*
*********************************************************************

****************************************************************************************************
	You can modify the database username, password and database name 					 
Initialization:																			 
																						 
	var sql = require('./sql_functions'); //  sql will now have the four functions 		 

****************************************************************************************************
INSERT:
	
	// sql.insert(data, table_name, callback);
	// performs "INSERT INTO "table"("column") VALUES("values")"
	var insert_data = [0,'traffix','tarafix','cebu','cebu','usc','compe',2014,'example'];
	var table_name = 'users';
	sql.insert(insert_data, table_name ,function(result){
	  console.log('result: ' + result); //prints TRUE if correct
	});

****************************************************************************************************
RETRIEVE

	// sql.browse(data, table_name, column, callback);
	// performs "SELECT * FROM "table" WHERE "col"=" entry
	var insert_data = 12;
	var table_name = 'users';
	var column = 'id';
	sql.insert(insert_data, table_name, column,function(result){
	  console.log('result: ' + result[0].username); //prints the username from query if correct
	});

****************************************************************************************************
UPDATE:

	// sql.update(data, table_name, callback);
	// performs "UPDATE "table" SET "column"='"entry"' WHERE "column+"='"entry"'"
	var insert_data = [12,'traffix22','tarafix1','cebu','cebu','usc','compe',2014,'example'];
	var table_name = 'users';
	sql.update(insert_data, table_name, function(result){
	  console.log('result: ' + result); //prints TRUE if correct
	});

****************************************************************************************************
DELETE:
	
	// sql.remove(data, table_name, column, callback);
	// performs "DELETE FROM "table" WHERE "col"=" +entry
	var insert_data = 12;
	var table_name = 'users';
	var column = 'id';
	sql.remove(insert_data, table_name, column,function(result){
	  console.log('result: ' + result[0].username); //prints TRUE if correct
	});
****************************************************************************************************