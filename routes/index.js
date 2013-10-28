/* UNCOMMENT TO CONNTECT TO DB
//GUIDE: https://github.com/felixge/node-mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'blackzky',
  password : '1234',
  database: 'Traffix'
});
connection.connect(); 
*/
var sql = require('./DatabaseHandler');

exports.index = function(req, res){
	var data = {};
	data.title = "Traffix";
	res.render("map.ejs", data);
};

exports.routes = function(req, res){
	var data = {};
	data.title = "Alternative Routes";
	res.render("routes.ejs", data);
};

exports.options= function(req, res){
	var data = {};
	if(req.session.account==null){
		data.title = "CITOM LOGIN";
		res.render("login.ejs",data);
	}else{
		data.title = "Welcome";
		res.render("options.ejs", data);
	}
};

exports.validate = function(req, res){

sql.browse(req.body.uname,'accounts','username' ,function(result){
	var data = {};
	if(result.length<=0){
		res.send('0');
	}else{
		var pass,uname,isAdmin;
		for(var i=0;i<result.length;i++){
			pass=result[i].password;
			uname=result[i].username;
			isAdmin=result[i].is_Admin;
		}
		//console.log("the pass is "+pass+" but the user placed "+req.body.pass);
		if(pass==req.body.pass){
			req.session.account=uname;
			console.log("current session = "+req.session.account);
			
			if(isAdmin){
			
				sql.browseall('accounts',function(results){
					data.title='Welcome Admin '+uname;
					data.accounts=results;
					res.render("manage.ejs", data);
				});
				
			}else{
				data.title='Welcome '+uname;
				res.render("options.ejs", data);
			}
		}else
			res.send('0');
	}
});


};

exports.help = function(req, res){
	var data = {};
	data.title = "Help";
	res.render("help.ejs", data);
};

exports.logout = function(req, res){
	req.session.destroy();
	var data = {};
	data.title = "Traffix";
	res.render("map.ejs", data);
};

exports.deleteAccount = function(req, res){
	sql.remove(req.body.id,'accounts', 'id',function(result){
		res.send(result);
	});
};

exports.resetPassword = function(req, res){
	sql.insert(insert_data, table_name ,function(result){
	  console.log('result: ' + result); //prints TRUE if correct
	});
};

