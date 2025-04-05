require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const recipeCollectionName = "recipes";
const categoryCollectionName = "categories";

const recipes = [
  {
    recipe_id: 1,
    name: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish",
    categories: [1, 2],
    ingredients: [
      { ingredient_id: 1, name: "Spaghetti", quantity: 200, unit: "grams" },
      { ingredient_id: 2, name: "Ground Beef", quantity: 250, unit: "grams" },
      { ingredient_id: 3, name: "Tomato Sauce", quantity: 1, unit: "cup" },
    ],
    steps: [
      { step_id: 1, step_order: 1, description: "Boil the spaghetti." },
      {
        step_id: 2,
        step_order: 2,
        description: "Cook the ground beef until brown.",
      },
      {
        step_id: 3,
        step_order: 3,
        description: "Add the tomato sauce to the beef and simmer.",
      },
    ],
  },
  {
    recipe_id: 2,
    name: "Grilled Salmon with Asparagus",
    description:
      "A healthy and delicious dish featuring grilled salmon and tender asparagus.",
    categories: [7, 8],
    ingredients: [
      {
        ingredient_id: 21,
        name: "Salmon fillets",
        quantity: 2,
        unit: "pieces",
      },
      { ingredient_id: 22, name: "Asparagus", quantity: 200, unit: "grams" },
      {
        ingredient_id: 23,
        name: "Olive oil",
        quantity: 2,
        unit: "tablespoons",
      },
      { ingredient_id: 24, name: "Lemon", quantity: 1, unit: "piece" },
      { ingredient_id: 9, name: "Salt", quantity: null, unit: "to taste" },
      { ingredient_id: 8, name: "Pepper", quantity: null, unit: "to taste" },
    ],
    steps: [
      {
        step_id: 4,
        step_order: 1,
        description: "Preheat the grill to medium-high heat.",
      },
      {
        step_id: 5,
        step_order: 2,
        description:
          "Season salmon fillets with salt, pepper, and a squeeze of lemon.",
      },
      {
        step_id: 6,
        step_order: 3,
        description:
          "Drizzle olive oil over asparagus and season with salt and pepper.",
      },
      {
        step_id: 7,
        step_order: 4,
        description: "Place salmon fillets and asparagus on the grill.",
      },
      {
        step_id: 8,
        step_order: 5,
        description:
          "Grill salmon for 4-5 minutes per side, or until desired doneness.",
      },
      {
        step_id: 9,
        step_order: 6,
        description:
          "Grill asparagus for 2-3 minutes, turning occasionally, until tender and slightly charred.",
      },
      {
        step_id: 10,
        step_order: 7,
        description:
          "Serve grilled salmon and asparagus hot, garnished with lemon slices.",
      },
    ],
  },
  {
    recipe_id: 3,
    name: "Margherita Pizza",
    description:
      "A classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil leaves.",
    categories: [1, 9],
    ingredients: [
      { ingredient_id: 25, name: "Pizza dough", quantity: 1, unit: "ball" },
      { ingredient_id: 26, name: "Tomato sauce", quantity: 1 / 2, unit: "cup" },
      {
        ingredient_id: 27,
        name: "Fresh mozzarella cheese",
        quantity: 150,
        unit: "grams",
      },
      {
        ingredient_id: 28,
        name: "Fresh basil leaves",
        quantity: null,
        unit: "to taste",
      },
      { ingredient_id: 9, name: "Salt", quantity: null, unit: "to taste" },
      { ingredient_id: 8, name: "Pepper", quantity: null, unit: "to taste" },
    ],
    steps: [
      {
        step_id: 11,
        step_order: 1,
        description:
          "Preheat the oven to its highest setting, typically around 500°F (260°C).",
      },
      {
        step_id: 12,
        step_order: 2,
        description:
          "Stretch out the pizza dough on a floured surface to desired thickness.",
      },
      {
        step_id: 13,
        step_order: 3,
        description:
          "Spread tomato sauce evenly over the dough, leaving a border around the edges.",
      },
      {
        step_id: 14,
        step_order: 4,
        description:
          "Tear the fresh mozzarella into small pieces and distribute evenly over the sauce.",
      },
      {
        step_id: 15,
        step_order: 5,
        description: "Season with salt and pepper to taste.",
      },
      {
        step_id: 16,
        step_order: 5,
        description:
          "Bake in the preheated oven for 10-12 minutes, or until the crust is golden and the cheese is bubbly and melted.",
      },
    ],
  },
  {
    recipe_id: 4,
    name: "Chicken Stir-Fry with Vegetables",
    description:
      "A flavorful and healthy stir-fry dish featuring tender chicken breast and a variety of colorful vegetables.",
    categories: [8, 10],
    ingredients: [
      {
        ingredient_id: 29,
        name: "Chicken breast",
        quantity: 300,
        unit: "grams",
      },
      {
        ingredient_id: 30,
        name: "Broccoli florets",
        quantity: 150,
        unit: "grams",
      },
      { ingredient_id: 31, name: "Bell pepper", quantity: 1, unit: "piece" },
      { ingredient_id: 32, name: "Carrot", quantity: 1, unit: "piece" },
      {
        ingredient_id: 33,
        name: "Soy sauce",
        quantity: 2,
        unit: "tablespoons",
      },
      {
        ingredient_id: 34,
        name: "Sesame oil",
        quantity: 1,
        unit: "tablespoon",
      },
      { ingredient_id: 35, name: "Garlic", quantity: 2, unit: "cloves" },
      { ingredient_id: 36, name: "Ginger", quantity: "1", unit: "inch" },
      {
        ingredient_id: 37,
        name: "Cornstarch",
        quantity: 1,
        unit: "tablespoon",
      },
      { ingredient_id: 9, name: "Salt", quantity: null, unit: "to taste" },
      { ingredient_id: 8, name: "Pepper", quantity: null, unit: "to taste" },
    ],
    steps: [
      {
        step_id: 17,
        step_order: 1,
        description:
          "Slice chicken breast into thin strips and season with salt, pepper, and cornstarch.",
      },
      {
        step_id: 18,
        step_order: 2,
        description:
          "Heat sesame oil in a large skillet or wok over medium-high heat.",
      },
      {
        step_id: 19,
        step_order: 3,
        description:
          "Add minced garlic and ginger to the skillet and cook until fragrant.",
      },
      {
        step_id: 20,
        step_order: 4,
        description:
          "Add chicken strips to the skillet and stir-fry until browned and cooked through.",
      },
      {
        step_id: 21,
        step_order: 5,
        description:
          "Add broccoli florets, sliced bell pepper, and julienned carrot to the skillet.",
      },
      {
        step_id: 22,
        step_order: 6,
        description:
          "Drizzle soy sauce over the ingredients and continue to stir-fry until vegetables are tender-crisp.",
      },
      {
        step_id: 23,
        step_order: 7,
        description: "Season with salt and pepper to taste.",
      },
      { step_id: 24, step_order: 8, description: "Serve hot and enjoy!" },
    ],
  },
];

// Sample category data
const categories = [
  { category_id: 1, name: "Italian" },
  { category_id: 2, name: "Pasta" },
  { category_id: 3, name: "Vegetarian" },
  { category_id: 4, name: "Vegan" },
  { category_id: 5, name: "Dessert" },
  { category_id: 6, name: "Appetizer" },
  { category_id: 7, name: "Seafood" },
  { category_id: 8, name: "Healthy" },
  { category_id: 9, name: "Pizza" },
  { category_id: 10, name: "Asian" },
];

async function seedRecipes() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db(dbName);
    const categoryCollection = database.collection(categoryCollectionName);
    await categoryCollection.insertMany(categories);
    const recipeCollection = database.collection(recipeCollectionName);
    await recipeCollection.insertMany(recipes);

    console.log("Recipes and categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}
seedRecipes();
