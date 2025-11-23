import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEdit } from "react-icons/fa";
import "./MadeByDisplay.css";

const MadeByDisplay = ({ data, setIsEditing }) => {
    return (
        <div className="display-container">
            <div className="profile-section">
                <img
                    src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    alt="Developer"
                    className="dev-avatar"
                />
                <h2>{data.name}</h2>
                <p className="dev-message">"{data.message}"</p>
            </div>

            <div className="social-links">
                {data.socialLinks?.linkedin && (
                    <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin className="social-icon linkedin" />
                    </a>
                )}
                {data.socialLinks?.github && (
                    <a href={data.socialLinks.github} target="_blank" rel="noreferrer">
                        <FaGithub className="social-icon github" />
                    </a>
                )}
                {data.socialLinks?.twitter && (
                    <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer">
                        <FaTwitter className="social-icon twitter" />
                    </a>
                )}
            </div>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Info
            </button>
        </div>
    );
};

export default MadeByDisplay;
