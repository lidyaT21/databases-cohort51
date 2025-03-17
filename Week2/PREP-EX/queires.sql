SELECT Recipe.recipe_name
FROM Recipe
JOIN Category ON Recipe.category_id = Category.category_id
WHERE Category.category_name = 'Cake'
AND NOT EXISTS (
    SELECT 1
    FROM Recipe_Steps
    JOIN Steps ON Recipe_Steps.steps_id = Steps.steps_id
    WHERE Recipe_Steps.recipe_id = Recipe.recipe_id
    AND Steps.steps_name LIKE '%Bake%'
);

SELECT recipe_name,category_name FROM Recipe
JOIN Category ON Recipe.category_id = Category.category_id
WHERE Category.category_name IN ('Vegan', 'Japanese');
