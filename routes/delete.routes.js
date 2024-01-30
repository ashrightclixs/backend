const express = require("express");
const router = express.Router()
const Tax = require("../models/user.model")//change this import to remove specific collection

router.route("/" ).delete( async(req,res)=>{
    try {
        const model = await Tax.deleteMany({});
        res.status(200).json({message : "Collection removed successfully"})
    } catch (error) {
        res.status(404).json({message : error})        
    }
})

module.exports = router