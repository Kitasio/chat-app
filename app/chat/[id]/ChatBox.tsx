"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Message {
  content: string;
}

interface Props {
  chat_id: string;
  messages: Message[];
}

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function ChatBox({ chat_id, messages }: Props) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [assistantTyping, setAssistantTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<Message[]>(messages)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, chatHistory])

  const query = async (message: string) => {
    setLoading(true)
    setMessage("")
    let newChatHistory = [...chatHistory, { content: message }]
    setChatHistory(newChatHistory)
    setTimeout(() => {
      setAssistantTyping(true)
    }, randomIntFromInterval(600, 1000))
    const query = `${process.env.apiEndpoint}/query/${chat_id}?text=${message}`
    const res = await fetch(query, {
      mode: "cors",
      cache: "no-store"
    });
    const json = await res.json()
    newChatHistory = [...newChatHistory, { content: json.content }]
    setChatHistory(newChatHistory)
    setAssistantTyping(false)
    setLoading(false)
  }

  const handleKeyDown = (event: KeyboardEvent, message: string) => {
    if (event.key === 'Enter') {
      query(message);
    }
  }

  return (
    <>
      <div className="p-7 m-5 overflow-y-scroll flex flex-col justify-between flex-grow rounded-lg border-2 border-green-500">
        <div className="space-y-2">
          <div className="flex-grow flex flex-col justify-between">
            <div id="chat-box" ref={scrollRef} className="flex flex-col gap-4">
              {chatHistory.map((msg: Message) => {
                return (
                  <div key={msg.content} className="max-w-md w-fit p-4 text-zinc-200 bg-zinc-800 odd:text-emerald-50 odd:bg-emerald-900 rounded-xl odd:self-end">
                    <p>{msg.content}</p>
                  </div>
                )
              })}
              {assistantTyping &&
                <div className="max-w-md w-fit p-4 text-zinc-200-50 bg-zinc-800 rounded-xl">
                  <p className="animate-pulse">typing...</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mt-5 flex gap-3">
        <input
          className="mt-1 p-3
                    block
                    w-full
                    rounded-md
                    bg-zinc-800
                    border-transparent
                    focus:border-zinc-800 focus:ring-0"
          onKeyDown={(e) => handleKeyDown(e, message)} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
        {loading ?
          <button disabled className="animate-pulse p-2 rounded border-2 border-emerald-400 text-emerald-400">...</button> :
          <button
            className="rounded text-emerald-400 hover:text-emerald-600 hover:scale-110 transition"
            onClick={() => {
              query(message);
            }}>
            Send
          </button>
        }
      </div>
    </>
  )
}

export default ChatBox;
