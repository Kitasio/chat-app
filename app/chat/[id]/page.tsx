import ChatBox from "./ChatBox";

const load_data = async (chatId: string) => {
  try {
    const query = `${process.env.apiEndpoint}/get_chat/${chatId}`
    const res = await fetch(query, {
      mode: "cors",
      cache: "no-store"
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function ChatPageId({ params }: any) {
  const chat = await load_data(params.id);

  return (
    <div className="h-screen py-10 flex flex-col max-w-screen-md mx-auto">
      <h1 className="text-4xl font-medium text-center">Health Chat</h1>
      <ChatBox chat_id={params.id} messages={chat} />
    </div>
  );
}

export default ChatPageId;
