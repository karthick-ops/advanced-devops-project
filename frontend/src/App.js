import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const API = "http://192.168.1.12:5000"; // your backend IP

  const fetchItems = async () => {
    const res = await fetch(`${API}/items`);
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchItems();
  };

  // 🔥 DELETE FUNCTION
  const deleteItem = async (id) => {
    await fetch(`${API}/items/${id}`, {
      method: 'DELETE'
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
          <li key={item._id}>
            {item.name}
            {/* 🔥 DELETE BUTTON */}
            <button 
              onClick={() => deleteItem(item._id)} 
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
