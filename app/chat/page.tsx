import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const randomId = uuidv4();
  redirect(`/chat/${randomId}`);
}

export default ChatPage
