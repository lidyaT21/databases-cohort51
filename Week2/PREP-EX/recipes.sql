DROP DATABASE IF EXISTS recipes;

CREATE DATABASE recipes;

USE recipes;

CREATE TABLE Recipes (
    recipe_id INT PRIMARY KEY AUTO_INCREMENT, 
    recipe_name VARCHAR(255) NOT NULL, 
    cooking_time INT, 
    preparation_time INT
);

CREATE TABLE Ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE Directions (
    direction_id INT PRIMARY KEY AUTO_INCREMENT, 
    instruction TEXT NOT NULL
);

CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT, 
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE RecipeDirections (
    recipe_id INT, 
    direction_id INT, 
    step_number INT, 
    PRIMARY KEY (recipe_id, direction_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes (recipe_id), 
    FOREIGN KEY (direction_id) REFERENCES Directions (direction_id)
);

CREATE TABLE RecipeCategories (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes (recipe_id),
    FOREIGN KEY (category_id) REFERENCES Categories (category_id)
);

CREATE TABLE RecipeIngredients (
    recipe_id INT, ingredient_id INT,
    quantity DECIMAL(10, 2),
    unit VARCHAR(255),
    prep_type VARCHAR(255),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) 
    REFERENCES Recipes (recipe_id),
    FOREIGN KEY (ingredient_id) 
    REFERENCES Ingredients (ingredient_id)
);
-- Inserting test data into the Recipes table
INSERT INTO Recipes (recipe_id, recipe_name, cooking_time, preparation_time)
VALUES 
    (1, 'Spaghetti Carbonara', 30, 15),
    (2, 'Margherita Pizza', 20, 30),
    (3, 'Chicken Curry', 40, 20),
    (4, 'No-Bake Cheesecake', 180, 15),
    (5, 'Mac & Cheese', 15, 10);

-- Inserting test data into the Ingredients table
INSERT INTO Ingredients (ingredient_id, ingredient_name)
VALUES 
    (1, 'Pasta'),
    (2, 'Bacon'),
    (3, 'Eggs'),
    (4, 'Cheese'),
    (5, 'Tomato Sauce');

-- Inserting test data into the Directions table
INSERT INTO Directions (direction_id, instruction)
VALUES 
    (1, 'Boil pasta until al dente.'),
    (2, 'Cook bacon until crispy.'),
    (3, 'Mix eggs and cheese in a bowl.'),
    (4, 'Combine pasta with bacon, eggs, and cheese.'),
    (5, 'Spread tomato sauce on prepared pizza dough.');

-- Inserting test data into the RecipeDirections table
INSERT INTO RecipeDirections (recipe_id, direction_id, step_number)
VALUES 
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3),
    (1, 4, 4),
    (2, 5, 1);

-- Inserting test data into the Categories table
INSERT INTO Categories (category_id, category_name)
VALUES 
    (1, 'Italian'),
    (2, 'Fast Food'),
    (3, 'Indian'),
    (4, 'Cake'),
    (5, 'Vegetarian');

-- Inserting test data into the RecipeIngredients table
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit, prep_type)
VALUES 
    (1, 1, 100, 'grams', 'None'),
    (1, 2, 50, 'grams', 'Sliced'),
    (1, 3, 2, 'units', 'None'),
    (1, 4, 50, 'grams', 'Shredded'),
    (2, 5, 100, 'grams', 'None');

-- Inserting test data into the RecipeCategories table
INSERT INTO RecipeCategories (recipe_id, category_id)
VALUES 
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 3),
    (4, 4);
-- All the vegetarian recipes with the ingredient Salt
 
  SELECT * FROM Recipes
  JOIN RecipeIngredients ON Recipes.recipe_id = RecipeIngredients.recipe_id 
  JOIN RecipeCategories ON Recipes.recipe_id = RecipeCategories.recipe_id
  WHERE  ingredient_id = (SELECT ingredient_id FROM Ingredients WHERE ingredient_name ="Salt")
  AND category_id = (SELECT category_id FROM Categories WHERE  category_name ="Vegetarian");
 
 --   All the cakes that do not need baking
 
 SELECT * FROM Recipes
 WHERE EXISTS (SELECT * FROM RecipeCategories 
 JOIN Categories ON RecipeCategories.category_id = Categories.category_id
 WHERE Categories.category_name = "Cake"
 AND RecipeCategories.recipe_id = Recipes.recipe_id) 
 AND EXISTS ( SELECT * FROM RecipeCategories 
 JOIN Categories ON RecipeCategories.category_id = Categories.category_id 
 WHERE Categories.category_name = "No-Bake" AND RecipeCategories.recipe_id = Recipes.recipe_id);
 
 
 --    All the Vegetarian and Japanese recipes 
 -- Same task with above one. Selecting a recipe with 2 different categories. This is how chatgpt solved the problem
 
 SELECT Recipes.* FROM Recipes
 JOIN RecipeCategories ON Recipes.recipe_id = RecipeCategories.recipe_id
 WHERE RecipeCategories.category_id IN
 ( SELECT category_id FROM Categories
 WHERE  category_name IN ("Vegetarian", "Japanese"))
 GROUP BY Recipes.recipe_id
 HAVING COUNT(DISTINCT RecipeCategories.category_id) = 2;
 

