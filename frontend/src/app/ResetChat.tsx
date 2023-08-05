import React from "react";

interface Props {
  onResetChat: () => void;
}

const ResetChat: React.FC<Props> = ({ onResetChat }) => {
  return (
    <div className="chat-controls">
      <button onClick={onResetChat}>Reset Chat</button>
    </div>
  );
};

export default ResetChat;
