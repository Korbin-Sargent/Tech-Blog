const router = require("express").Router();
// const { Router } = require("express");
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: ["UserName", "id"],
    });
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Need a post route to log in a user
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        UserName: req.body.username,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: "No user found" });
      return;
    }
    const loginPassword = dbUserData.checkPassword(req.body.password);
    if (!loginPassword) {
      res.status(400).json({ message: "Password is not correct" });
      return;
    }
    req.session.save(() => {
      req.session.username = dbUserData.UserName;
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//log out a user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    res.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
