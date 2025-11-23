import React, { useEffect, useState } from "react";
import axios from "axios";
import MadeByDisplay from "../components/MadeBy/MadeByDisplay";
import MadeByEdit from "../components/MadeBy/MadeByEdit";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./MadeByPage.css";

const MadeByPage = () => {
    const [madeByData, setMadeByData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchMadeBy = async () => {
        try {
            const { data } = await axios.get("/api/made-by");
            setMadeByData(data);
        } catch (error) {
            console.error("Failed to fetch Made By data", error);
        }
    };

    useEffect(() => {
        fetchMadeBy();
    }, []);

    return (
        <div className="made-by-container">
            <button className="back-btn-made" onClick={() => navigate("/chats")}>
                <FaArrowLeft /> Back to Chats
            </button>
            <div className="made-by-card">
                <h1>Made By</h1>
                {madeByData ? (
                    isEditing ? (
                        <MadeByEdit
                            data={madeByData}
                            setIsEditing={setIsEditing}
                            refreshData={fetchMadeBy}
                        />
                    ) : (
                        <MadeByDisplay
                            data={madeByData}
                            setIsEditing={setIsEditing}
                        />
                    )
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default MadeByPage;
