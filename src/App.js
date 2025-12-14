import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const triggerWebhook = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/webhook-listener", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event: "user_action", data: message }),
      });

      if (!res.ok) {
        throw new Error("망 반응 오류 발생");
      }

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error("웹훅 촉발 오류 발생:", error);
      setResponse("웹훅 촉발 오류 발생.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>봄 부트 웹훅 촉발하기(triggering)</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="웹훅에 보낼 텍스트 입력"
        />
        <button onClick={triggerWebhook}>웹훅 자료 서비스</button>
        {response && <p>후단의 반응: {response}</p>}
      </header>
    </div>
  );
}

export default App;
