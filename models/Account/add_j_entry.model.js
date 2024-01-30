const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const JournalEntrySchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        j_entry_no:{
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        reference:{
            type: String,
            required: true,
        },
        payment_mode: {
            type: String,
            required: true,
        },
        account_head:{
            type: String,
            required: true,
        },
        amount:{
            type: Number,
            required: true,
        },
        comments:{
            type: String,
            required: true,
        },
     
    },
    { timestamps: true }
);

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);
