import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 6, description: "Matresess", quantity: 2, packed: true },
//   { id: 7, description: "Beds", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  // delete Item
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  // handle hnadleItemToggle Item
  function hadleItemToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={hadleItemToggle}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Travel Master 🚝</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  // sort items
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={Item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort By Input Order</option>
          <option value="description">sort By Description</option>
          <option value="packed">sort By Packed Status</option>
        </select>
      </div>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercent = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numPercent === 100
          ? "You Got Everything Ready to GO 🚀🚀 "
          : `You have ${numItems} items on your list, and you have already packed
        ${numPacked} which is ${numPercent} %`}
      </em>
    </footer>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
