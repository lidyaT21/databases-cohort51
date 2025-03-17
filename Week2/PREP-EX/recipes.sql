-- Create the necessary tables
DROP DATABASE IF EXISTS food_recipes;
CREATE DATABASE food_recipes;
USE food_recipes;

-- Create Category table
CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL
);

-- Create Ingredients table
CREATE TABLE Ingredients (
    ingredients_id INT PRIMARY KEY AUTO_INCREMENT,
    ingredients_name VARCHAR(50) NOT NULL
);

-- Create Steps table
CREATE TABLE Steps (
    steps_id INT PRIMARY KEY AUTO_INCREMENT,
    steps_name VARCHAR(250) NOT NULL
);

-- Create Recipe table
CREATE TABLE Recipe (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(50) NOT NULL,
    category_id INT,
    ingredients_id INT,
    steps_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(category_id),
    FOREIGN KEY (ingredients_id) REFERENCES Ingredients(ingredients_id),
    FOREIGN KEY (steps_id) REFERENCES Steps(steps_id)
);

-- Create Recipe_Steps table for linking recipes and multiple steps
CREATE TABLE Recipe_Steps (
    recipe_id INT,
    steps_id INT,
    PRIMARY KEY (recipe_id, steps_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id),
    FOREIGN KEY (steps_id) REFERENCES Steps(steps_id)
);