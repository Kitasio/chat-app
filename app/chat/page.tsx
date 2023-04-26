"use client"

import { useState } from "react"

const ChatPage = () => {
  const [message, setMessage] = useState("")
  const [llamaRes, setLlamaRes] = useState("Hello! Welcome to our AI chat bot. You can ask me any question related to nutrition, healthy eating, fitness, and more. I'm here to help you find the information you need to live a healthier life. So go ahead, ask away!")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [age, setAge] = useState("27")
  const [weight, setWeight] = useState("60")
  const [height, setHeight] = useState("180")
  const [gender, setGender] = useState("male")

  const queryLlama = async () => {
    setLoading(true)
    setError("")
    try {
      const query = `${process.env.apiEndpoint}/query?text=${message}, I am ${age} years old ${gender}, I wight ${weight} kg and my height is ${height}`
      const response = await fetch(query, {
        mode: "cors",
        cache: "no-store"
      });

      const res = await response.text();
      setLoading(false)
      setLlamaRes(res)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError("Something went wrong")
    }
  }

  return (
    <>
    <h1 className="my-10 text-4xl font-medium text-center">Health Chat</h1>
    <div className="p-7 m-5 max-w-screen-md mx-auto rounded-lg border-2 border-green-500">
      <div className="h-80 space-y-2 overflow-y-scroll">
        <h2 className="text-3xl">AI assistant</h2>
        {error && <p className="text-red-600">{error}</p>}
        {loading ? <p className="animate-pulse">Loading...</p>: <p>{llamaRes}</p>}
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
        <div className="space-y-1">
          <p className="text-xs text-zinc-300">Gender</p>
          <input value={gender} onChange={(e) => setGender(e.target.value)} className="bg-zinc-900 p-2 rounded w-20" placeholder="Gender" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-zinc-300">Age</p>
          <input value={age} onChange={(e) => setAge(e.target.value)} className="bg-zinc-900 p-2 rounded w-20" placeholder="Age" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-zinc-300">Weight (kg)</p>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-zinc-900 p-2 rounded w-20" placeholder="Weight" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-zinc-300">Height (cm)</p>
          <input value={height} onChange={(e) => setHeight(e.target.value)} className="bg-zinc-900 p-2 rounded w-20" placeholder="Height" />
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <input onChange={(e) => setMessage(e.target.value)} className="bg-zinc-900 p-2 rounded w-full" placeholder="Your message" />
        {loading ? <button disabled className="animate-pulse p-2 rounded border-2 border-green-400 text-green-400">Sending...</button>: <button className="p-2 rounded border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-zinc-800 transition" onClick={() => queryLlama()}>Send</button>}
      </div>
    </div>
    </>
  )
}


export default ChatPage
