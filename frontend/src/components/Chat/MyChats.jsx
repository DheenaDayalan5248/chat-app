import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import "./MyChats.css";
import { FaPlus } from "react-icons/fa";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            alert("Failed to Load the chats");
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain]);

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };

    return (
        <div className={`my-chats ${selectedChat ? "hidden-on-mobile" : ""}`}>
            <div className="my-chats-header">
                <h2>My Chats</h2>
                <GroupChatModal>
                    <button className="new-group-btn">
                        New Group Chat <FaPlus />
                    </button>
                </GroupChatModal>
            </div>
            <div className="chats-list">
                {chats ? (
                    chats.map((chat) => (
                        <div
                            onClick={() => setSelectedChat(chat)}
                            className={`chat-item ${selectedChat === chat ? "selected" : ""
                                }`}
                            key={chat._id}
                        >
                            <div className="chat-name">
                                {!chat.isGroupChat
                                    ? getSender(loggedUser, chat.users)
                                    : chat.chatName}
                            </div>
                            {chat.latestMessage && (
                                <div className="latest-message">
                                    <b>{chat.latestMessage.sender.name} : </b>
                                    {chat.latestMessage.content.length > 50
                                        ? chat.latestMessage.content.substring(0, 51) + "..."
                                        : chat.latestMessage.content}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default MyChats;
