"use client"

import { useRouter } from "next/navigation";
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
  const [userTempMessage, setUserTempMessage] = useState("")
  const [assistantTyping, setAssistantTyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const query = async (message: string) => {
    setLoading(true)
    setMessage("")
    setUserTempMessage(message)
    setTimeout(() => {
      setAssistantTyping(true)
    }, randomIntFromInterval(600, 1000))
    const query = `${process.env.apiEndpoint}/query/${chat_id}?text=${message}`
    await fetch(query, {
      mode: "cors",
      cache: "no-store"
    });
    setUserTempMessage("")
    setAssistantTyping(false)
    setLoading(false)
    router.refresh()
  }

  useEffect(() => {
    if (scrollRef.current !== null) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages])

  const handleKeyDown = (event: KeyboardEvent, message: string) => {
    if (event.key === 'Enter') {
      query(message);
    }
  }

  return (
    <>
      <div className="p-7 m-5 overflow-y-scroll flex flex-col justify-between flex-grow rounded-lg border-2 border-green-500">
        <h2 className="text-3xl">AI assistant</h2>
        <div className="space-y-2">
          <div className="flex-grow flex flex-col justify-between">
            <div id="chat-box" ref={scrollRef} className="flex flex-col gap-4">
              {messages.map((msg: Message) => {
                return (
                  <div key={msg.content} className="max-w-md w-fit p-4 text-zinc-200 bg-zinc-900 odd:text-emerald-50 odd:bg-emerald-900 rounded-xl odd:self-end">
                    <p>{msg.content}</p>
                  </div>
                )
              })}
              {userTempMessage &&
                <div className="max-w-md w-fit p-4 text-emerald-50 bg-emerald-900 rounded-xl self-end">
                  {userTempMessage}
                </div>
              }
              {assistantTyping &&
                <div className="max-w-md w-fit p-4 text-zinc-200-50 bg-zinc-900 rounded-xl">
                  <p className="animate-pulse">typing...</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mt-5 flex gap-3">
        <input onKeyDown={(e) => handleKeyDown(e, message)} value={message} onChange={(e) => setMessage(e.target.value)} className="bg-zinc-900 p-2 rounded w-full" placeholder="Your message" />
        {loading ?
          <button disabled className="animate-pulse p-2 rounded border-2 border-emerald-400 text-emerald-400">Sending...</button> :
          <button
            className="py-3 px-5 rounded border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-zinc-800 transition"
            onClick={() => {
              query(message);
            }}>Send
          </button>
        }
      </div>
    </>
  )
}

export default ChatBox;
