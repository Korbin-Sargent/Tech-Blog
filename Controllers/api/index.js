const router = require("express").Router();
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);
router.use("/comment", commentRoutes);
router.use("/blog", blogRoutes);

module.exports = router;

//set up views. index.js, and handlebars
