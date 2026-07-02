import { useEffect, useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  return username ? (
    <Chat username={username} setUsername={setUsername} />
  ) : (
    <Login setUsername={setUsername} />
  );
}

export default App;