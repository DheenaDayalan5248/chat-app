import React from "react";
import { FaTimes } from "react-icons/fa";
import "./ProfileModal.css";

const ProfileModal = ({ user, children, isOpen, onClose }) => {
    if (!isOpen) return children;

    return (
        <>
            <div onClick={onClose} className="modal-overlay">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>{user.name}</h2>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="modal-body">
                        <img
                            className="profile-img"
                            src={user.pic}
                            alt={user.name}
                        />
                        <div className="user-info">
                            <h3>Email: {user.email}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileModal;
