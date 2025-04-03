import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [note, setNote] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/notes', { content: note });
      setResponse(res.data);
      setNote('');
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  return (
    <div>
      <h1>Submit a Note</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder="Write something..."
        />
        <button type="submit">Send</button>
      </form>
      {response && (
        <p>✅ Saved: {response.content}</p>
      )}
    </div>
  );
}

export default App;