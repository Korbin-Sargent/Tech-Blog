const router = require("express").Router();
const { Router } = require("express");
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

module.exports = router;
