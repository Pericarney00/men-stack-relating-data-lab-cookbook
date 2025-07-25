const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab

//GET landing page
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    res.render("foods/index.ejs", {
      pantry: currentUser.pantry
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
router.get("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const foodItem = currentUser.pantry.id(req.params.itemId)
    console.log(foodItem)
    res.render("foods/show.ejs", {
      food: foodItem
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})
// Edit	‘/users/:userId/foods/:itemId/edit’	GET
router.get("/:itemId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const foodItem = currentUser.pantry.id(req.params.itemId)

    res.render("foods/edit.ejs", {
      food: foodItem
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})
// Update	‘/users/:userId/foods/:itemId’	PUT
router.put("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const foodItem = currentUser.pantry.id(req.params.itemId)
    
    foodItem.set(req.body)

    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/foods/`)
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

// Delete	‘/users/:userId/foods/:itemId’	DELETE
router.delete("/:foodsId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    
    currentUser.pantry.id(req.params.foodsId).deleteOne()

    await currentUser.save()
    res.redirect("/");

  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
})

module.exports = router;
