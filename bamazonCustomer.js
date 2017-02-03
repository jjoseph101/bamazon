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

//pull "products" database
connection.query("SELECT * FROM products", function(err,res){
	if (err) throw err;
	console.log(res);
});

//get user prompts
inquirer.prompt([
	{
		type: "input",
		message: "Please enter in the ID of the product you would like to buy:",
		name: "itemId"
	},

	{
		type: "input",
		message: "Please enter the quantity you would like to buy:",
		name: "itemQ"
	}
//then run this function after getting user prompts
]).then(function(user){
	//display data
	console.log(JSON.stringify(user, null, 2));
	//pull database data
	connection.query("SELECT * FROM products", function(err,res){
		if (err) throw err;
		console.log(res[user.itemId-1]);
		console.log(res[user.itemId-1].stock_quantity);
		//check if enough quantity for user
		if (res[user.itemId-1].stock_quantity>user.itemQ) {
			console.log("Items in stock!");
			console.log("Updating items...");
			var newQ = res[user.itemId-1].stock_quantity-user.itemQ;
			var tCost = (user.itemQ*res[user.itemId-1].price);
			console.log("New Quantity: " + newQ);
			//update database
			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: newQ }, {
					item_id: user.itemId
				}], function(err,res) {
					if (err) throw err;
					console.log("Total cost: $" + tCost);
				});
		} else {
			console.log("INSUFFICIENT QUANTITY!");
		};
	});
});