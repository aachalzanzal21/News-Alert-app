// src/pages/Subscribe.jsx
import { useState } from "react";
import API from "../api";

const categories = ["Politics", "Sports", "Technology", "Health", "Business"];

export default function Subscribe() {
  const [selected, setSelected] = useState([]);

  const toggleCategory = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/alerts/subscribe", { categories: selected });
      alert("Subscription updated successfully!");
    } catch (err) {
      alert("Failed to subscribe: " + err.response.data.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select News Categories</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((cat) => (
          <label key={cat} className="block mb-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Save Preferences
        </button>
      </form>
    </div>
  );
}
