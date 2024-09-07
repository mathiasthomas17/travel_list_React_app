import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
// import Item from "./Item";

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
  // Clear List Functio
  function handleClearList() {
    setItems([]);
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={hadleItemToggle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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
