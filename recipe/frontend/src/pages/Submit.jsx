import React, { useState, useEffect } from "react";
import axios from "axios";

const Submit = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [duration, setDuration] = useState("00:10:00");
  const [showInput, setShowInput] = useState(false);

  // Fetch suggestions from MongoDB
  useEffect(() => {
    if (input.trim() !== "") {
      axios
        .get(`http://localhost:3000/api/ingredients?q=${input}`) // ✅ Fixed API endpoint
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.error("Error fetching suggestions:", err));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Add ingredient from suggestion
  const handleSuggestionClick = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setInput(""); // Clear input after selection
    setSuggestions([]); // Hide suggestions
  };

  // Handle form submission
  const handleSubmit = async () => {
    const recipeData = {
      ingredients: selectedIngredients,
      duration: duration,
    };

    try {
      await axios.post("http://localhost:3000/api/recipe", recipeData);
      alert("✅ Recipe submitted successfully!");
      setSelectedIngredients([]); // Clear selection
      setDuration("00:10:00"); // Reset duration
      setShowInput(false); // Hide input form
    } catch (error) {
      console.error("❌ Error submitting recipe:", error);
    }
  };

  return (
    <div className="container p-4">
      {/* New button to open input field */}
      <button onClick={() => setShowInput(true)} className="bg-blue-500 text-white p-2 rounded">
        New
      </button>

      {showInput && (
        <div className="mt-4">
          {/* Ingredient Input Box */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter ingredient..."
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <ul className="border mt-2">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(item.ingredient_name)} // ✅ Fixed field name
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {item.ingredient_name} -{" "}
                  <a
                    href={`https://blinkit.com/s/?q=${encodeURIComponent(item.ingredient_name)}`} // ✅ Fixed Blinkit URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Buy on Blinkit
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Selected Ingredients as Tags */}
          <div className="mt-2">
            {selectedIngredients.map((ing, idx) => (
              <span key={idx} className="bg-gray-300 p-1 m-1 rounded">
                {ing}
              </span>
            ))}
          </div>

          {/* Duration Selection */}
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2 mt-2">
            <option value="00:10:00">10 min</option>
            <option value="00:30:00">30 min</option>
            <option value="01:00:00">60 min</option>
          </select>

          {/* Submit Button */}
          <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded mt-2">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Submit;
