DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
Values ("Desktop Computer", "Electronics", 500, 10),
("Picture Frame", "Home Decor", 10, 20),
("Monopoly", "Games", 25, 10),
("Dinner Set", "Kitchenware", 45, 15),
("Indian Food Cookbook", "Books", 15, 20),
("Laptop", "Electronics", 900, 10),
("Silverware Set", "Kitchenware", 35, 10),
("Flower Vase", "Home Decor", 20, 10),
("Turkish Lamp", "Home Decor", 150, 10),
("Headphones", "Electronics", 60, 10);

-- CREATE TABLE buyers(
-- 	buyer_id INT NOT NULL AUTO_INCREMENT,
-- 	buyer_firstName VARCHAR(20) NOT NULL,
-- 	buyer_city VARCHAR(20) NOT NULL,
-- 	PRIMARY KEY (buyer_id)
-- 	);
