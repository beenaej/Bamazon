var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
 console.log("connected as id " + connection.threadId);
 
  
});

function start() {
  inquirer
    .prompt({
      name: "selectChoice",
      type: "list",
      message: "Please select what you would like to do: ",
      choices: ["Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.selectChoice === "Products for Sale") {
        productsForSale();
      } else if (answer.selectChoice === "View Low Inventory") {
        viewLowInventory();
      } else if (answer.selectChoice === "Add to Inventory") {
        viewLowInventory();
      } else if (answer.selectChoice === "Add New Product") {
      	addNewProduct();
      }
    });
}

function productsForSale() {
	console.log("~~~~Products For Sale~~~~~");
  	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
    	for (var i = 0; i < res.length; i++) {
      	console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      	console.log("-----------------------------------");
      	}
      
       start();
    });
}

function viewLowInventory() {
	console.log("~~~~Checking Inventory~~~~~");
  	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
    	for (var i = 0; i < res.length; i++) {
    		if(res[i].stock_quantity <= 5){
    			console.log("Here are the products that are running low: ");
    			console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    			console.log("-----------------------------------");
    		} else {
      		console.log("All your products are well stocked for now. Please check back tomorrow!");
      		console.log("-----------------------------------");
      	}
      }
    start();

    });
 
}

   function addToInventory() {
	console.log("~~~~Add to Inventory~~~~~");
  	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
  		var productsArray = [];
    	for (var i = 0; i < res.length; i++) {
    		productsArray.push(res[i].product_name);
    	} inquirer.prompt([{
    		type: "list",
    		name: "product",
    		choices: productsArray,
    		message: "What product would you like to add more inventory for?"
    	}, {
    		type:"input",
    		name: "quantity",
    		message: "Please enter the amount you would like to add",
    		validate: function(value){
    			if(NaN(value) === false){
    				return true;
    			} else {
    				return false;
    			}
    		}
    	}]).then(function(ans){
    		var currentlyAvailQuantity;
    		for (var i=0; i < res.length; i++){
    			if (res[i].product_name === ans.product){
    				currentlyAvailQuantity = res[i].stock_quantity;
    			}
    		}
    		connection.query("UPDATE products SET ? WHERE ?", [
    			{stock_quantity: currentlyAvailQuantity + parseInt(ans.quantity)},
    			{product_name: ans.product}
    			], function(err,res){
    				if (err) throw err;
    				console.log("Your product quantity has been updated.");
    				start();
    			});
    	});
   });
 }
    		

   function addNewProduct() {
	console.log("~~~~Add a New Product~~~~~");
	var departmentsArray = [];
	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
  		
    	for (var i = 0; i < res.length; i++) {
    		departmentsArray.push(res[i].department_name);
  	 	} inquirer.prompt([{
    		type: "input",
    		name: "product",
    		message: "What new product would you like to add?"
    	}, {
    		type:"list",
    		name: "department",
    		message: "Please enter the department it belongs in: ",
    		choices: departmentsArray
    	},{
    		type:"input",
    		name: "price",
    		message: "Please enter the price of the item: ",
    		validate: function(value){
    			if(isNaN(value) === false){
    				return true;
	    			} else {
	    				return false;
	    			}
    			}
    	},{
    		type:"input",
    		name: "quantity",
    		message: "Please enter the quantity in stock of the item: ",
    		validate: function(value){
    			if(isNaN(value) === false){
    				return true;
    			} else {
    				return false;
    			}
    		}
    	}]).then(function(ans){
    		connection.query("INSERT INTO products SET ?", {
    			product_name: ans.product,
    			department_name: ans.department,
    			price: ans.price,
    			stock_quantity: ans.quantity
    		}, function(err,res){
    				if (err) throw err;
    				console.log("Great! Your new product has been added to the Bamazon Storefront!");
    			})
    				start();
    			});
    		 });
  }

start();
 