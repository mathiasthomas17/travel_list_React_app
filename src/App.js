import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 6, description: "Matresess", quantity: 2, packed: true },
  { id: 7, description: "Beds", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Travel Master 🚝</h1>;
}

function Form() {
  // Controlled Element
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  // Handle Submit
  function HandleSubmit(e) {
    e.preventDefault();
    // Guard clause
    if (!description) return;
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={Item.id} />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you have already packed Y</em>
    </footer>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
