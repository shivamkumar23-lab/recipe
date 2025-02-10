const express = require("express");
const router = express.Router();
const { Ingredient, Recipe } = require("../models/submitModel"); // ✅ Fixed import

// Route to get ingredient suggestions
router.get("/ingredients", async (req, res) => {
  try {
    const query = req.query.q;
    const suggestions = await Ingredient.find({ ingredient_name: { $regex: query, $options: "i" } }).limit(10);
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to submit a recipe
router.post("/recipe", async (req, res) => {
  try {
    const { ingredients, duration } = req.body;
    const newRecipe = new Recipe({ ingredients, duration });
    await newRecipe.save();
    res.json({ message: "Recipe submitted successfully!" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

module.exports = router;
