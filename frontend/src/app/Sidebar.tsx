// sidebar.tsx
import React, { useState } from "react";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@mui/material/IconButton";

interface Props {
  chatHistory: string[];
  handleAddChat: () => void;
  sideChats: string[];
  handleChatSwitch: (index: number) => void;
}

const Sidebar = ({
  chatHistory,
  handleAddChat,
  sideChats,
  handleChatSwitch,
}: Props) => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar_headerLeft">
          <h2 id="sidebar-label">Old Chats</h2>
        </div>
        <div className="sidebar__headerRight">
          {/*put necessary icons here*/}
          <IconButton id="plus-image-button" onClick={handleAddChat}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
          <IconButton id="close-sidebar-button">
            <FontAwesomeIcon icon={faRectangleXmark} />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_chats">
        {/*current chat box*/}
        <SidebarChat
          chat={chatHistory[chatHistory.length - 1]}
          onClick={() => {}}
          isCurrentChat={true}
        />{" "}
        {/*old chat boxes */}
        {sideChats.map((chat, index) => (
          <SidebarChat
            key={index}
            chat={chat}
            onClick={() => handleChatSwitch(index)}
            isCurrentChat={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
