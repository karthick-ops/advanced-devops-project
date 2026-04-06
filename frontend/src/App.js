import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const fetchItems = async () => {
    const res = await fetch('http://192.168.1.12:5000/items');
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://192.168.1.12:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>DevOps Advanced Project 🚀</h1>

      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
