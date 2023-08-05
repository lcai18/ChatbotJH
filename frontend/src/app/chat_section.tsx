import QueryInput from "./querying";
import ChatMessageList from "./ChatMessageList";
import ResetChat from "./ResetChat";
import React, { useState } from "react";

interface ChatSectionProps {
  chatState: {
    messageSource: boolean[];
    chatHistory: string[];
    addToChatHistory: (message: string, isBotMessage: boolean) => void; // Update this line
    resetChatHistory: (messages: string[]) => void;
    resetMainChat: () => void;
    allChatData: string[][];
  };
}

const ChatBot: React.FC<ChatSectionProps> = ({ chatState }) => {
  // Add a piece of state to hold any errors
  const [error, setError] = useState<string | null>(null);

  const handleQuerySubmit = async (query: string) => {
    chatState.addToChatHistory(query, false);
    try {
      // Send a POST request to your backend
      const response = await fetch("https://chatjhgpt-456b2fdab2c5.herokuapp.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // The body of the request is the query, stringified
      });

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("DATA FOUND");
      // Update the chat messages with the new query and response

      chatState.addToChatHistory(data.response, true);
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred, please try again.");
    }
  };

  const handleResetChat = () => {
    // Reset chat box
    chatState.resetMainChat();
  };

  return (
    <div className="container">
      <ChatMessageList
        messages={chatState.chatHistory}
        botMessage={chatState.messageSource}
      />
      <QueryInput onQuerySubmit={handleQuerySubmit} />
      <ResetChat onResetChat={handleResetChat} />
    </div>
  );
};

export default ChatBot;
