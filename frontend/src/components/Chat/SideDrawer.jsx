import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import "./SideDrawer.css";
import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";

import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };

    const {
        user,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
    } = ChatState();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!search) {
            alert("Please Enter something in search");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Error Occured!");
            setLoading(false);
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            setIsDrawerOpen(false);
        } catch (error) {
            alert("Error fetching the chat");
            setLoadingChat(false);
        }
    };

    return (
        <>
            <div className="header">
                <button className="search-btn" onClick={() => setIsDrawerOpen(true)}>
                    <FaSearch />
                    <span className="search-text">Search User</span>
                </button>
                <h2 className="app-title">Chat App</h2>
                <div className="header-right">
                    <button className="made-by-btn" onClick={() => navigate("/made-by")}>
                        Made By
                    </button>
                    <div className="notification-wrapper" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                        <FaBell className="bell-icon" />
                        {notification.length > 0 && (
                            <span className="badge">{notification.length}</span>
                        )}
                        {isNotificationOpen && (
                            <div className="dropdown-menu">
                                {!notification.length && <div className="dropdown-item">No New Messages</div>}
                                {notification.map((notif) => (
                                    <div
                                        key={notif._id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedChat(notif.chat);
                                            setNotification(notification.filter((n) => n !== notif));
                                            setIsNotificationOpen(false);
                                        }}
                                    >
                                        {notif.chat.isGroupChat
                                            ? `New Message in ${notif.chat.chatName}`
                                            : `New Message from ${getSender(user, notif.chat.users)}`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="profile-menu">
                        <button
                            className="profile-btn"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <img src={user.pic} alt={user.name} className="avatar-sm" />
                            <FaChevronDown />
                        </button>
                        {isProfileOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => setIsProfileModalOpen(true)}>
                                    My Profile
                                </div>
                                <div className="dropdown-item" onClick={logoutHandler}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProfileModal
                user={user}
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
            />


            {isDrawerOpen && (
                <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
                    <div className="drawer" onClick={(e) => e.stopPropagation()}>
                        <div className="drawer-header">
                            <h3>Search Users</h3>
                            <button onClick={() => setIsDrawerOpen(false)}>X</button>
                        </div>
                        <div className="drawer-body">
                            <div className="search-box">
                                <input
                                    placeholder="Search by name or email"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button onClick={handleSearch}>Go</button>
                            </div>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                searchResult?.map((user) => (
                                    <div
                                        key={user._id}
                                        className="user-list-item"
                                        onClick={() => accessChat(user._id)}
                                    >
                                        <img src={user.pic} alt={user.name} className="avatar-sm" />
                                        <div>
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-email">
                                                <b>Email : </b>
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            {loadingChat && <div>Loading chat...</div>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SideDrawer;
