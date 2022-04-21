import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        console.log("Success:", data);
      });
    console.log(user);
    e.target.name.value = "";
    e.target.email.value = "";
  };
  return (
    <div className="App">
      <h1>Welcome to the first backend project</h1>
      <h4>Total Users: {users.length}</h4>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" required placeholder="Name" />
        <br />
        <input type="email" name="email" required placeholder="Email" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            id:{user.id} Name: {user.name} Email: {user.gmail}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
