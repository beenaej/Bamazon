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
  connection.query("SELECT * FROM products", function(err, response) {
    if (err) throw err;
    console.log("**** ~~~ Welcome to Bamazon!! ~~~ ****")
    console.log("-------------------------------------------------");
    console.log("Product ID | Product Name | Price | Stock Quantity");
    console.log("-------------------------------------------------");
    for (var i = 0; i < response.length; i++) {
      
      console.log(response[i].item_id + "  | " + response[i].product_name + " | " + response[i].price + "  |  " + response[i].stock_quantity);
    }
    console.log("-------------------------------------------------");

// function which prompts the user for what action they should take
  inquirer.prompt([
   
    {
      name: "buy_id",
      type: "input",
      message: "What is the ID number of the product you would like to buy?"
    },
    {
      name: "quantity_to_buy",
      type: "input",
      message: "Please enter the quantity needed: ",
      validate: function(value) {
          if (isNaN(value)) {
            return false;
          } else{
          return true;
        }
      }
    }
    ]).then(function(answer) {
      // get the information of the chosen item
      var itemToBuy = (answer.buy_id) - 1;
      var quantityNeeded = parseInt(answer.quantity_to_buy);
      var costToBuyer = parseFloat(((response[itemToBuy].price)*quantityNeeded).toFixed(2));

      if (response[itemToBuy].stock_quantity >= quantityNeeded){
        connection.query("UPDATE products SET ? WHERE ?", [
          {stock_quantity: (response[itemToBuy].stock_quantity - quantityNeeded)},
          {item_id: answer.buy_id}
          ], function(err, result) {
          if (err) throw err;
          console.log("Your total for this purchase is " + costToBuyer.toFixed(2) + ". You should receive your purchase within 2 weeks!");
          console.log("Thank you for shopping at Bamazon. We value your business!");        
    
        })
      } else {
          console.log("Insufficient quantity!");
          }
    }

     ) 
    
  }
)};

start();

