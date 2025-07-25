const express = require("express")
const router = express.Router()

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({})
    console.log(allUsers)
    res.render("users/index.ejs", {
      allUsers
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
  
})

module.exports = router;