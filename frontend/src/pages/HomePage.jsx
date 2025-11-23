import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) navigate("/chats");
    }, [navigate]);

    const [activeTab, setActiveTab] = React.useState("login");

    return (
        <div className="home-container">
            <div className="home-box">
                <h1 className="home-title">Real-Time Chat App</h1>
                <div className="home-tabs">
                    <button
                        className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${activeTab === "signup" ? "active" : ""}`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === "login" ? <Login /> : <Signup />}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
