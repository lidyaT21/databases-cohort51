SELECT r.recipeName
FROM Recipe AS r  -- Correct table name
JOIN Ingredients AS i ON r.ingredientsID = i.ingredientsID
JOIN Category AS c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Vegetarian'
AND i.ingredientsName LIKE '%Potatoes%';

SELECT r.recipeName
FROM Recipe r  -- Correct table name
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Cake'
AND NOT EXISTS (
    SELECT 1
    FROM Steps s
    WHERE s.stepsID = r.stepsID  -- Use stepsID properly
    AND s.stepsName LIKE '%Bake%'
);

SELECT r.recipeName
FROM Recipe r  -- Use the correct table name
JOIN Recipe_Category rc ON r.recipeID = rc.recipeID  -- Use the junction table
JOIN Category c ON rc.categoryID = c.categoryID
WHERE c.categoryName IN ('Vegan', 'Japanese');
