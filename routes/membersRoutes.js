const express = require("express");
const router = express.Router();

const { getMembers, getMembersid, addMembers, updateMembers,deleteMembers } = 
require("../controllers/membersController");

router.get("/members", getMembers)

router.get("/members/:id", getMembersid)

router.post("/members", addMembers)

router.put("/members/:id", updateMembers)

router.delete("/members/:id",deleteMembers)


module.exports = router;
