import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    
    setLoading(true);
    try {
      await api.post("/api/items", newItem);
      setNewItem({ name: "", description: "" });
      fetchItems();
    } catch (err) {
      console.error("Error creating item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>Items</h1>
      
      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ 
            padding: "12px", 
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <strong>{item.name}</strong>
              {item.description && (
                <p style={{ margin: "4px 0 0", color: "#666", fontSize: "14px" }}>
                  {item.description}
                </p>
              )}
            </div>
            <button 
              onClick={() => handleDelete(item.id)}
              style={{ 
                padding: "4px 12px", 
                background: "#ff4444", 
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
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
