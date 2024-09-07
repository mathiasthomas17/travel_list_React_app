import { useState } from "react";
export default function Form({ onAddItems }) {
  // Controlled Element
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  // Handle Submit
  function HandleSubmit(e) {
    e.preventDefault();
    // Guard clause
    if (!description) return;
    // Create new Item
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    console.log(newItem);
    // update/Reset state after submit
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={HandleSubmit}>
      <h2>All you need in a trip</h2>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
