"use client";
import React, { useState, useEffect } from "react";
import ChatBot from "./chat_section";
import "./globals.css";
import logo from "./jhlogo.png";
import Sidebar from "./Sidebar";
import "./Sidebar.css";

import { useChatState } from "./chatState.client";

const App: React.FC = () => {
  const chatState = useChatState();

  const [sidebarChats, setSidebarChats] = useState<string[]>([]);

  const handleAddChat = () => {
    // Adding a brand new fresh chat
    chatState.resetChatHistory();
    setSidebarChats((prevChats) => [
      chatState.chatHistory[chatState.chatHistory.length - 1],
      ...prevChats,
    ]);
  };

  const handleChatSwitch = (index: number) => {
    // Switching to old chats
    chatState.switchChat(index);
  };

  return (
    <div className="container-main">
      <img src={logo.src} id="top-logo" />
      <div className="chat-content">
        <ChatBot chatState={chatState} />
      </div>
      <div className="separator"></div>
      <div className="Sidebar-content">
        <Sidebar
          chatHistory={chatState.chatHistory}
          handleAddChat={handleAddChat}
          sideChats={sidebarChats}
          handleChatSwitch={handleChatSwitch}
        />
      </div>
    </div>
  );
};

export default App;
