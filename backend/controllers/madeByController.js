const asyncHandler = require("express-async-handler");
const MadeBy = require("../models/madeByModel");

//@description     Get Made By Info
//@route           GET /api/made-by
//@access          Public
const getMadeBy = asyncHandler(async (req, res) => {
    const madeBy = await MadeBy.findOne();
    if (madeBy) {
        res.json(madeBy);
    } else {
        // Return default info if not found
        res.json({
            name: "Developer",
            socialLinks: {
                linkedin: "",
                github: "",
                twitter: "",
            },
            message: "This app was built with MERN stack.",
        });
    }
});

//@description     Update Made By Info
//@route           POST /api/made-by
//@access          Public (Should be protected in real app, but per requirements simple UI form)
const updateMadeBy = asyncHandler(async (req, res) => {
    const { name, socialLinks, message } = req.body;

    let madeBy = await MadeBy.findOne();

    if (madeBy) {
        madeBy.name = name || madeBy.name;
        madeBy.socialLinks = socialLinks || madeBy.socialLinks;
        madeBy.message = message || madeBy.message;
        const updatedMadeBy = await madeBy.save();
        res.json(updatedMadeBy);
    } else {
        const newMadeBy = await MadeBy.create({
            name,
            socialLinks,
            message,
        });
        res.status(201).json(newMadeBy);
    }
});

module.exports = { getMadeBy, updateMadeBy };
