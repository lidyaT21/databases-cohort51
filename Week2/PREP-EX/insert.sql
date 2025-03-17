-- Insert Categories
INSERT INTO Category (category_name)
VALUES ('Cake'), ('Vegetarian'), ('Vegan'), ('Japanese');

-- Insert Ingredients
INSERT INTO Ingredients (ingredients_name)
VALUES 
    ('Condensed Milk'), 
    ('Cream Cheese'), 
    ('Lemon Juice'), 
    ('Pie Crust'), 
    ('Cherry Jam'),
    ('Potatoes'), 
    ('Butter'), 
    ('Salt'), 
    ('Garlic Powder'),
    ('Rice'),
    ('Soy Sauce'),
    ('Tofu'),
    ('Seaweed'),
    ('Miso Paste');

-- Insert Steps (including baking and non-baking steps)
INSERT INTO Steps (steps_name)
VALUES 
    ('Beat Cream Cheese'),  
    ('Add condensed Milk and blend'),
    ('Add Lemon Juice and blend'),
    ('Add the mix to the pie crust'),
    ('Spread the Cherry Jam'),
    ('Place in refrigerator for 3h.'),
    ('Boil potatoes until soft'),
    ('Mash the potatoes and mix with butter, salt, and garlic powder'),
    ('Bake the cake for 30 minutes at 180°C'),
    ('Let the cake cool after baking'),
    ('Prepare the frosting and apply it to the cake'),
    ('Cook rice and mix with soy sauce'),
    ('Prepare miso soup with tofu and seaweed');

-- Insert Recipes

-- Vegetarian Recipes with Potatoes (No-Bake Cakes)
-- Example: Vegetarian Mashed Potatoes
INSERT INTO Recipe (recipe_name, category_id, ingredients_id ,steps_id)
VALUES 
    ('Vegetarian Mashed Potatoes', 2, 6, 7),  -- Vegetarian mashed potatoes (step 7: Boil potatoes)
    ('Garlic Mashed Potatoes', 2, 6, 8);  -- Garlic mashed potatoes (step 8: Mash potatoes)

-- Cakes that Do Not Need Baking (e.g. no baking step is needed)
INSERT INTO Recipe (recipe_name, category_id, ingredients_id ,steps_id)
VALUES 
    ('No-Bake Cheesecake', 1, 1, 6),  -- No-Bake Cheesecake (step 6: Place in refrigerator)
    ('Fruit Tart', 1, 4, 6);    -- Fruit Tart (step 6: Place in refrigerator)

-- Vegan and Japanese Recipes
-- Example: Vegan Sushi, Tofu Stir-Fry, Miso Soup
INSERT INTO Recipe (recipe_name, category_id, ingredients_id ,steps_id)
VALUES 
    ('Vegan Sushi', 3, 10, 12),  -- Vegan Sushi (step 12: Prepare miso soup with tofu)
    ('Tofu Stir-Fry', 3, 12, 12),  -- Tofu Stir-Fry (step 12: Prepare miso soup with tofu)
    ('Miso Soup', 4, 14, 13);  -- Miso Soup (step 13: Prepare miso soup with tofu and seaweed)

-- Insert steps into Recipe_Steps (Linking Recipes with Steps)
-- Vegetarian Mashed Potatoes
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (1, 7),  -- Vegetarian Mashed Potatoes: step 7 (Boil potatoes until soft)
    (1, 8);  -- Vegetarian Mashed Potatoes: step 8 (Mash potatoes)

-- Garlic Mashed Potatoes
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (2, 7),  -- Garlic Mashed Potatoes: step 7 (Boil potatoes)
    (2, 8);  -- Garlic Mashed Potatoes: step 8 (Mash potatoes)

-- No-Bake Cheesecake
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (3, 6);  -- No-Bake Cheesecake: step 6 (Place in refrigerator)

-- Fruit Tart
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (4, 6);  -- Fruit Tart: step 6 (Place in refrigerator)

-- Vegan Sushi
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (5, 12);  -- Vegan Sushi: step 12 (Prepare miso soup with tofu)

-- Tofu Stir-Fry
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (6, 12);  -- Tofu Stir-Fry: step 12 (Prepare miso soup with tofu)

-- Miso Soup
INSERT INTO Recipe_Steps (recipe_id, steps_id)
VALUES 
    (7, 13);  -- Miso Soup: step 13 (Prepare miso soup with tofu and seaweed)

-- Show all Recipes
SELECT * FROM Recipe;
SELECT * FROM  Steps;
SELECT * FROM category;
SELECT * FROM  Ingredients;
SELECT * FROM Recipe_Steps;

