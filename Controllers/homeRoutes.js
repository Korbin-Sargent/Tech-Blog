const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/auth");

//needed: routes for homepage,dashboard, login, logout, view single blog

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["UserName", "ASC"]],
    });
    const blogData = await Blog.findAll();
    console.log({ blogData });

    const users = userData.map((project) => project.get({ plain: true }));
    const dbBlogData = "hello";
    res.render("home", {
      users,
      blogData,
      dbBlogData,
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/login", (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect("/");
//     return;
//   }

//   res.render("login");
// });

module.exports = router;
