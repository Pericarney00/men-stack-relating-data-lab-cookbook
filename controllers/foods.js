const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

//GET landing page
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    res.render("foods/index.ejs", {
      foods: currentUser.foods
    });

  } catch (error) {
    console.log(error);
    res.redirect("/")
  }

})


// GET new food
router.get("/new", async (req, res) => {
  res.render("foods/new.ejs")
})

//CREATE  POST users/:userId/foods (this is posting the form)
router.post("/", async (req, res) => {
  console.log(req.params.userId)
  
  try {
    const currentUser = await User.findById(req.session.user._id)
    console.log(currentUser)
    
    currentUser.pantry.push(req.body)

    await currentUser.save();
    console.log(currentUser)
    res.redirect(`/users/${currentUser._id}/foods`)
  } catch (error) {
    console.log(error);
    res.redirect("/")
  }
});

// Show	‘/users/:userId/foods/:itemId’	GET
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
// Update	‘/users/:userId/foods/:itemId’	PUT
// Delete	‘/users/:userId/foods/:itemId’	DELETE


module.exports = router;
