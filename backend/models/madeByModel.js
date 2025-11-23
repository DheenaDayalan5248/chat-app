const mongoose = require("mongoose");

const madeBySchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        socialLinks: {
            linkedin: { type: String },
            github: { type: String },
            twitter: { type: String },
        },
        message: { type: String },
    },
    { timestamps: true }
);

const MadeBy = mongoose.model("MadeBy", madeBySchema);

module.exports = MadeBy;
