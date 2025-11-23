import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import "./GroupChatModal.css";

const GroupChatModal = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Failed to Load the Search Results");
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            alert("Please fill all the feilds");
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            setIsOpen(false);
            alert("New Group Chat Created!");
        } catch (error) {
            alert(error.response.data);
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            alert("User already added");
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    return (
        <>
            <span onClick={() => setIsOpen(true)}>{children}</span>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create Group Chat</h3>
                            <button onClick={() => setIsOpen(false)}>X</button>
                        </div>
                        <div className="modal-body">
                            <input
                                placeholder="Chat Name"
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <input
                                placeholder="Add Users eg: John, Piyush, Jane"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="selected-users">
                                {selectedUsers.map((u) => (
                                    <div key={u._id} className="user-badge" onClick={() => handleDelete(u)}>
                                        {u.name} X
                                    </div>
                                ))}
                            </div>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                searchResult?.slice(0, 4).map((user) => (
                                    <div
                                        key={user._id}
                                        className="user-list-item"
                                        onClick={() => handleGroup(user)}
                                    >
                                        <img src={user.pic} alt={user.name} className="avatar-sm" />
                                        <div>
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-email">{user.email}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleSubmit}>Create Chat</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupChatModal;
