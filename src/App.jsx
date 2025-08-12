import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const url = 'https://user-details-using-node-mongo-0qju.onrender.com/users';
      const response = await axios.post(url, { 
        name, 
        email 
      });
      console.log("User created:", response.data);
      setUsers([...users, response.data]);
      setName("");
      setEmail("");
    }
    catch(err){
      console.error("Error creating user:", err);
    }
  }

  useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://user-details-using-node-mongo-0qju.onrender.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  },[])

  return (<div>
    <h1>add user</h1>
    <form  onSubmit={handleSubmit}>
      <input 
      type="text" 
      value={name} 
      placeholder="Name" 
      onChange={e => setName(e.target.value)}
      required
      />
      <input 
      type="email" 
      value={email} 
      placeholder="Email" 
      onChange={e => setEmail(e.target.value)}
      required
      />
      <button>Submit</button>
    </form>
    <h1>Users List</h1>
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user.name} - {user.email}
           <button>Delete</button>
        </li>
        
      ))}
     
    </ul>
    
  </div>)
}

export default App
