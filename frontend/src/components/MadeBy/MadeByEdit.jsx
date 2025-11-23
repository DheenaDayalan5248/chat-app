import React, { useState } from "react";
import axios from "axios";
import "./MadeByEdit.css";

const MadeByEdit = ({ data, setIsEditing, refreshData }) => {
    const [name, setName] = useState(data.name);
    const [message, setMessage] = useState(data.message);
    const [linkedin, setLinkedin] = useState(data.socialLinks?.linkedin || "");
    const [github, setGithub] = useState(data.socialLinks?.github || "");
    const [twitter, setTwitter] = useState(data.socialLinks?.twitter || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("/api/made-by", {
                name,
                message,
                socialLinks: {
                    linkedin,
                    github,
                    twitter,
                },
            });
            setLoading(false);
            setIsEditing(false);
            refreshData();
        } catch (error) {
            alert("Failed to update info");
            setLoading(false);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                />
            </div>

            <h3>Social Links</h3>

            <div className="form-group">
                <label>LinkedIn URL</label>
                <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>

            <div className="form-group">
                <label>GitHub URL</label>
                <input value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Twitter URL</label>
                <input value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>

            <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                </button>
                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
};

export default MadeByEdit;
