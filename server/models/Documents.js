const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        data: { type: Object },
        pinned: {
            type: Boolean,
            default: false,
        },
        invited_users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                required: false,
                ref: "User",
            },
        ],
        is_deleted: {
            type: Boolean,
            default: false,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Document", DocumentSchema);
