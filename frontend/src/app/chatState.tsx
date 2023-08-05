import { useState, useEffect } from "react";

interface ChatState {
  chatHistory: string[];
  addToChatHistory: (message: string) => void;
  resetChatHistory: (messages: string[]) => void;
  resetMainChat: () => void;
  allChatData: string[][];
  switchChat: (index: number) => void;
}




export const useChatState = (): ChatState => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedChatHistory = sessionStorage.getItem("chatHistory");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
  }, []);

  const addToChatHistory = (message: string) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  };

  const resetChatHistory = () => {
    setChatHistory([]);
    sessionStorage.removeItem("chatHistory");
  };

  const resetMainChat = () => {
    setChatHistory([]);
  };

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  return {
    chatHistory,
    addToChatHistory,
    resetChatHistory,
    resetMainChat,
    allChatData: [],
    switchChat: () => {},
  };
};
