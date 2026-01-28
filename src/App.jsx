import './App.css';
import logo from './assets/chatgpt.svg'
import addBtn from './assets/add-30.png'
import msgIcon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import sendBtn from './assets/send.svg'
import userIcon from './assets/user.png'
import botIcon from './assets/bot.png'
import { sendMsgToOpenRouter } from './ai';
import { useState } from 'react';

function App() {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([
      {
        text: "Hello !!! Welcome to the ChatBot. How can I help You ?",
        isBot: true,
      }
  ])

  const [error, setError] = useState("");

    const handleSend = async () =>{

if (!input.trim()) {
    setError("Message cannot be empty");
    return;
  }

  setError("");


      const text = input;
      setInput('')
      setMessages([
        ...messages,
        {text: text, isBot: false}
      ])
      const res = await sendMsgToOpenRouter(text)
      setMessages([
        ...messages,
        {text: text, isBot: false},
        {text: res, isBot:true}
      ])
    }

  return (
    <div className="App">
      <div className='sidebar'>
        <div className='upperSide'>
          <div className="upperSideTop"><img src={logo} alt="" className="logo" /><span className="brand"> ChatBOT</span></div>
          <button className="midBtn" onClick={()=> {window.location.reload()}}><img src={addBtn} alt="" className="addbtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="" />What is Java ?</button>
            <button className="query"><img src={msgIcon} alt="" />What is API ?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className="listItems"><img src={home} alt="" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={upgrade} alt="" className="listItemsImg" />Upgrade to Pro Version</div>
        </div>
      </div>
      <div className='main'>
        <div className="chats">
          {/* <div className="chat">
            <img src={userIcon} alt="" className='chatimg'/> <p className="txt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ad officiis dolores expedita unde saepe repellat fugiat eaque, hic amet veritatis magnam quia porro beatae quasi molestiae accusantium voluptates eligendi?</p>
          </div>
          <div className="chat ai">
            <img src={botIcon} alt="" className='chatimg'/> <p className="txt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis ad officiis dolores expedita unde saepe repellat fugiat eaque, hic amet veritatis magnam quia porro beatae quasi molestiae accusantium voluptates eligendi?</p>
          </div> */}
          {messages.map((message , i)=>
            <div key={i} className={message.isBot?"chat ai":"chat"}>
              <img src={message.isBot?botIcon:userIcon} alt="" className='chatimg'/> <p className="txt">{message.text}</p>
            </div>
          )}
        </div>
          <div className="chatFooter">
            <div className="inp">
              <input type="text" placeholder='Send Your Mesaage' value={input} onChange={(e) =>{setInput(e.target.value)}}/> <button className="send" onClick={handleSend}><img src={sendBtn} alt=""/></button>
            </div>
            {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
            <p> This is a react based Chatbot Made by Rohit !!! version 1.0</p>
          </div>
      </div>
    </div>
  );
}

export default App;
