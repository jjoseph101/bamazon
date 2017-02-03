CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    primary key (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ice Cream", "Groceries", 6, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Horseshoe", "Outerware", 1, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Needle", "Sowing", 1, 20000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 779, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BTC Miner", "Electronics", 200, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweater", "Clothing", 30, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Groceries", 1, 100000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES (".223 AR-15", "Self-defense", 1200, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Porsche", "Vehicles", 120000, 8);

SELECT * FROM products;
