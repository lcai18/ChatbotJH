import { useState, useEffect } from "react";
interface ChatState {
  chatHistory: string[];
  messageSource: boolean[];
  addToChatHistory: (message: string, isBotMessage: boolean) => void;
  resetChatHistory: () => void;
  resetMainChat: () => void;
  allChatData: string[][];
  switchChat: (index: number) => void;
}

export const useChatState = (): ChatState => {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [allChatData, setAllChatData] = useState<string[][]>([]);
  const [messageSource, setMessageSource] = useState<boolean[]>([]);

  const addToChatHistory = (message: string, isBotMessage: boolean) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
    setMessageSource((prevSources) => [...prevSources, isBotMessage]);
  };

  const resetChatHistory = () => {
    setAllChatData((chatData) => [...chatData, chatHistory]);
    //might need to do the same for messagesource
    setChatHistory([]);
  };

  const resetMainChat = () => {
    setChatHistory([]);
    setMessageSource([]);
  };

  const switchChat = (index: number) => {
    setChatHistory(allChatData[allChatData.length - 1 - index]);
  };

  useEffect(() => {
    const storedChatHistory = sessionStorage.getItem("chatHistory");
    const storedMessageSource = sessionStorage.getItem("messageSource");
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
      setMessageSource(JSON.parse(storedMessageSource));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    sessionStorage.setItem("messageSource", JSON.stringify(messageSource));
  }, [chatHistory]);

  return {
    chatHistory,
    messageSource,
    addToChatHistory,
    resetChatHistory,
    resetMainChat,
    allChatData,
    switchChat,
  };
};
