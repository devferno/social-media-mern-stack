const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).send("user saved");
  } catch (err) {
    res.status(500).send("error server");
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    !user && res.status(200).json("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(200).json("password incorrect");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
