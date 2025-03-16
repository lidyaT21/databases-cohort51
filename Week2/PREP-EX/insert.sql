USE recipes;

-- Insert into Category (remove categoryID since it's auto-incremented)
INSERT INTO Category (categoryName)
VALUES ('Cake'), ('No-Bake'), ('Vegetarian');

-- Insert Ingredients
INSERT INTO Ingredients (ingredientsName)
VALUES ('Condensed milk'), ('Cream Cheese'), ('Lemon Juice'), ('Pie Crust'), ('Cherry Jam');

-- Insert Steps
INSERT INTO Steps (stepsName)
VALUES 
    ('Beat Cream Cheese'),  
    ('Add condensed Milk and blend'),
    ('Add Lemon Juice and blend'),
    ('Add the mix to the pie crust'),
    ('Spread the Cherry Jam'),
    ('Place in refrigerator for 3h.');

-- Insert Recipe
INSERT INTO Recipe (recipeName)
VALUES ('No-Bake Cheesecake');
