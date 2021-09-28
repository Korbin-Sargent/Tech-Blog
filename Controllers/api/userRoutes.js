const router = require("express").Router();
// const { Router } = require("express");
const { User, Blog } = require("../../models");

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

//Need a post route to create a user
router.post("/signup", async (req, res) => {
  console.log("POST route working ");
  try {
    const newUser = User.create({
      UserName: req.body.username,
      password: req.body.password,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Blog,
        attributes: ["id", "title", "postContent", "created_at"],
      },

      {
        model: Comment,
        attributes: ["id", "commentContent", "created_at"],
        include: {
          model: Blog,
          attributes: ["title"],
        },
      },
      {
        model: Blog,
        attributes: ["title"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "Could not find a user with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
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
  console.log("!!! Logged In !!!");
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
