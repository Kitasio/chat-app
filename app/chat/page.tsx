"use client"

import { useState } from "react"

const ChatPage = () => {
  const [message, setMessage] = useState("")
  const [llamaRes, setLlamaRes] = useState("")

  const queryLlama = async () => {
    const query = `${process.env.apiEndpoint}/query?text=${message}`
    const response = await fetch(query, {
      mode: "cors",
      cache: "no-store"
    });

    const res = await response.text();
    setLlamaRes(res)
  }

  return (
    <>
    <div>Chat</div>
    <input onChange={(e) => setMessage(e.target.value)} className="bg-zinc-800" placeholder="your message" />
    <button onClick={() => queryLlama()}>click</button>
    <div>{llamaRes}</div>
    </>
  )
}


export default ChatPage
