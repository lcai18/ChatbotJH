// sidebarchat.tsx
import React from "react";
import "./Sidebar.css";

interface Props {
  chat: string;
  onClick: () => void;
  isCurrentChat: boolean; //differentiate if the sidebar chatbox is current or old
}

const SidebarChat: React.FC<Props> = ({ chat, onClick, isCurrentChat }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let month = months[d.getMonth()];

  const previewText = (text: string, textLength: number) => {
    if (!text) return "No messages";

    if (text.length <= textLength) {
      return text;
    } else {
      return text.substring(0, textLength) + "..."; //show a short preview in the sidebar for each old chat
    }
  };

  const renderPreviewText = (chat: string, textLength: number) => {
    if (!chat) {
      return "...";
    } else {
      return previewText(chat, textLength);
    }
  };

  return (
    <div className="sidebarChat" onClick={onClick}>
      <div className="sidechat_timestamp">
        {month} {d.getDate()}
      </div>
      <div className="sidebarChat__info">
        {isCurrentChat && <h2>Current Chat</h2>}
        {!isCurrentChat && <h2>Old Chat</h2>}
        <p>{renderPreviewText(chat, 20)}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
