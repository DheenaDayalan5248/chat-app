import React from "react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "./SingleChat";
import "./ChatBox.css";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <div className={`chat-box ${!selectedChat ? "hidden-on-mobile" : ""}`}>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};

export default ChatBox;
