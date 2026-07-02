import { useEffect, useState } from "react";
import api from "../api";

function Chat({ username, setUsername }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/messages", {
        username,
        text,
      });

      setText("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsername("");
  };

  return (
    <div className="chat-page">
      <div className="chat-container">

        {/* Header */}
        <div className="chat-header">

          <div className="user-info">

            <h2>💬 Connect Chat</h2>

            <div className="user-details">

              <div className="profile-circle">
                {username.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{username}</h3>

                <span className="status">
                  🟢 Online
                </span>
              </div>

            </div>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* Messages */}
        <div className="messages">

          {messages.map((msg) => {
            const isOwn =
              msg.username.toLowerCase() === username.toLowerCase();

            return (
              <div
                key={msg._id}
                className={`message ${
                  isOwn ? "own-message" : "other-message"
                }`}
              >
                {!isOwn && (
                  <div
                    className="avatar"
                    style={{
                      backgroundColor: `hsl(${msg.username.length * 45},70%,50%)`,
                    }}
                  >
                    {msg.username.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="bubble">

                  {!isOwn && <strong>{msg.username}</strong>}

                  <p>{msg.text}</p>

                  <small>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>

                </div>

                {isOwn && (
                  <div
                    className="avatar"
                    style={{
                      backgroundColor: "#2563eb",
                    }}
                  >
                    {username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Input */}
        <div className="input-box">

          <input
            type="text"
            value={text}
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default Chat;