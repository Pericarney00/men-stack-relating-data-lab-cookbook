const express = require("express")
const router = express.Router()

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({})
    
    res.render("users/index.ejs", {
      allUsers
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
  
})

//SHow
router.get("/:userId", async (req, res) => {
  try {
    const otherUser = await User.findById(req.params.userId)
    
    res.render(`users/show.ejs`, {
      pantry: otherUser.pantry,
      otherUser: otherUser.username,
    })
  } catch (error) {
    console.log(error);
    res.redirect("/")
  }
})

module.exports = router;