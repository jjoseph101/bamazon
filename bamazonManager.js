//require initial dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//setup mysql connection params
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "b00tcamp",
	database: "Bamazon"
});

//test connection
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
});

//pull "products" database test
connection.query("SELECT * FROM products", function(err,res){
	if (err) throw err;
});

//get user prompts
inquirer.prompt([
	{
		type: "list",
		message: "Please select an inventory Management command:",
		choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "manageCmd"
	}

//then run this function after getting user prompts
]).then(function(user){

	//view products function
	if (user.manageCmd=="View Products") {
		console.log("User selected 'View Products'");
		connection.query("SELECT * FROM products", function(err,res){
			if (err) throw err;
			console.log(res);
		});

	//view low inventory function
	} else if (user.manageCmd=="View Low Inventory") {
		console.log("User selected 'View Low Inventory'");
		connection.query("SELECT * FROM products", function(err,res){
			if (err) throw err;
			for (var i=0; i < res.length; i++) {
				if (res[i].stock_quantity<6) {
					console.log ("Item ID #: " + [i+1] + "("+res[i].product_name+") has less than 5 total quantity!");
				};
			};
		});

	//add to inventory function
	} else if (user.manageCmd=="Add to Inventory") {
		console.log("User selected 'Add to Inventory'");
		inquirer.prompt([
			{
				type: "input",
				message: "Please enter the item number to update quantity:",
				name: "itemIdQ"
			},
			{
				type: "input",
				message: "Please enter the the number of items to add to inventory:",
				name: "newQuant"
			},
			]).then(function(user2){
				connection.query("SELECT * FROM products", function (err,res){
					var newTotal =parseInt(res[user2.itemIdQ-1].stock_quantity)+parseInt(user2.newQuant);
					console.log ("New Total is: "+newTotal)
					connection.query("UPDATE products SET ? WHERE ?", [{
						stock_quantity: newTotal, 
					}, {
						item_id: user2.itemIdQ
					}], function(err, res){});
				});
			});
			
	//add new products function
	} else if (user.manageCmd=="Add New Product") {
		console.log("User selected 'Add New Product'");
		inquirer.prompt([
			{
				type: "input",
				message: "Please enter product name:",
				name: "prodName"
			},
			{
				type: "input",
				message: "Please enter department name:",
				name: "deptName"
			},
			{
				type: "input",
				message: "Please enter the price:",
				name: "priceName"
			},
			{
				type: "input",
				message: "Please enter the stock quantity:",
				name: "quantName"
			}
		]).then(function(user1){
			connection.query("INSERT INTO products SET ?", {
				product_name: user1.prodName,
				department_name: user1.deptName,
				price: user1.priceName,
				stock_quantity: user1.quantName				
			}, function(err, res){});
		});
	};
});
