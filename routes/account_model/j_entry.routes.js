const express = require("express");
const router = express.Router();
const { GetJournalEntry  , Add_JournalEntry  , DeleteJournalEntry  , GetJournalEntryPage } = require("../../controllers/accounts/accountsController");

// /accounts/journal_entry

router.get("/", GetJournalEntry );

router.post("/add", Add_JournalEntry );

router.delete("/delete", DeleteJournalEntry );

router.get("/get_journalentry_page", GetJournalEntryPage);

module.exports = router;