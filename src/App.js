import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const triggerWebhook = async () => {
    try {
      const formData = {
        event: "user_action",
        data: message,
      };

      const res = await axios.post(
        "http://localhost:8080/api/webhook-listener",
        JSON.stringify(formData)
      );

      if (res.status === 200) {
        const data = await res.data;
        setResponse(data);
      } else {
        throw new Error("망 반응 오류 발생");
      }
    } catch (error) {
      console.error("웹훅 촉발 오류 발생:", error);
      setResponse("웹훅 촉발 오류 발생.");
    }
  };

  const clearResponse = () => {
    setResponse("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4>봄 부트 웹훅 촉발하기(triggering)</h4>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="웹훅에 보낼 텍스트 입력"
        />
        <button onClick={triggerWebhook}>웹훅 자료 서비스</button>
        {response && <p>후단의 반응: {response}</p>}
        <button onClick={clearResponse}>후단 반응 지우기</button>
      </header>
    </div>
  );
}

export default App;
