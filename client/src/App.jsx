import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [incomingMessage, setIncomingMessage] = useState("");

  const socket = new WebSocket("ws://localhost:3000");

  function onChangeHandler(e) {
    setInputValue(e.target.value);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (inputValue) {
      socket.send(inputValue);
    }
  }

  socket.addEventListener("message", ({ data }) => {
    setIncomingMessage(data);
    console.log(data);
  });

  return (
    <div className="relative w-full h-screen bg-gray-600 flex items-center justify-center">
      <form className="flex flex-col items-start gap-4" onSubmit={sendMessage}>
        <input
          className="bg-transparent p-2 text-lg rounded-sm border text-white"
          value={inputValue}
          type="text"
          onChange={onChangeHandler}
        />
        <button type="submit" className="bg-white p-2 rounded-sm text-xs">
          Send Message
        </button>
      </form>
      <div className="absolute bg-white w-40 h-20 top-4 right-4 rounded-sm p-2">
        <h1>{incomingMessage}</h1>
      </div>
    </div>
  );
}

export default App;
