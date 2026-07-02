import { useState } from "react";

function Login({ setUsername }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;

    setUsername(name);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>💬 Chat App</h1>

        <p>Connect with everyone instantly.</p>

        <input
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>
          Join Chat
        </button>

      </div>

    </div>
  );
}

export default Login;