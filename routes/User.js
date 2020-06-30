const { Router } = require("express");
const User = require("../models/User");
const Todo = require("../models/Todo");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const passportConfig = require("../passport");

const router = Router();

const signToken = (id) => {
  return JWT.sign(
    {
      iss: "WaldemarKarasik",
      sub: id,
    },
    "komsomolradio",
    { expiresIn: "1hr" }
  );
};

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, foundUser) => {
    if (err)
      return res
        .status(500)
        .json({ message: { msgBody: "Server error", msgError: true } });
    if (foundUser)
      return res
        .status(400)
        .json({
          message: { msgBody: "Username is already taken", msgError: true },
        });
    const newUser = new User({ username, password, role });
    newUser.save((err, user) => {
      if (err)
        return res
          .status(500)
          .json({ message: { msgBody: "Server error", msgError: true } });
      return res
        .status(201)
        .json({
          message: { msgBody: "Account successfully created", msgError: false },
        });
    });
  });
});
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

router.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name } = req.body;
    const newTodo = new Todo({ name });
    newTodo.save((err) => {
      if (err)
        return res
          .status(500)
          .json({ message: { msgBody: "Server error", msgError: true } });
      req.user.todos.push(newTodo);
      req.user.save((err) => {
        if (err)
          res
            .status(500)
            .json({ message: { msgBody: "Server error", msgError: true } });
        else
          res
            .status(201)
            .json({
              message: {
                msgBody: "Todo successfully created",
                msgError: false,
              },
            });
      });
    });
  }
);

router.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, user) => {
        if (err)
          return res
            .status(500)
            .json({ message: { msgBody: "Server error", msgError: true } });
        else {
          res.status(200).json({ todos: user.todos, authenticated: true });
        }
      });
  }
);

router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role != "admin")
      return res
        .status(403)
        .json({
          message: { msgBody: "You are not allowed here", msgError: true },
        });
    res
      .status(200)
      .json({ message: { msgBody: "You are an admin", msgError: false } });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = router;
