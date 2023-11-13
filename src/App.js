import {useEffect, useRef, useState} from "react"
import "./App.css";
import { sendMsgToOpenAI } from "./openai";

function App() {

  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi, I am ChatGPT, a state-of-the-art language model",
    isBot: true,
  }]);

  useEffect(() => {
    msgEnd.current.scrollIntoView()
  }, [messages])  

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, {text, isBot:false }, {text: res, isBot: true}])
  }

  const handleEnter = async (e) =>  {
    if (e.key === 'Enter')  await handleSend();
  }

  return (
    <div className="chatGptClone">
      <div className="main">
        <div className="chats">
         
          {messages.map((message, index) => (
             <div key={index} className="chat">
               <p>{message.text}</p>
              </div>
          ))}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input className="input" type="text" value={input} onKeyDown={handleEnter} onChange={(e)=> setInput(e.target.value)} placeholder="Send a message " />
            <button onClick={handleSend} className="send">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
