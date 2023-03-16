import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//register

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impression: Math.floor(Math.random() * 10000),
    });

    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User not exist" });
    }
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        return res.status(200).json({ msg: "Login success" });
      }
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;

    res.status(200).json({ token, user });
    // else {
    //   console.log("user exist");
    // }
    // bcrypt.compare(req.body.password, user.password, function (err, res) {
    //   if (err) {
    //     // handle error
    //     console.log("Error");
    //   }
    //   if (res) {
    //     // Send JWT
    //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //     delete user.password;

    //     res.status(200).json({ token, user });
    //   }
    // } else {
    //   // response is OutgoingMessage object that server response http request
    //   return res.status(404).json({
    //     success: false,
    //     message: "passwords do not match",
    //   });
    // }
    // });
    // bcrypt.compare(password, "superSecret", function (err, res) {
    //   if (password != user.password) {
    //     res.json({ success: false, message: "passwords do not match" });
    //   } else {
    //     // Send JWT
    //     res.send("password match");
    //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //     delete user.password;

    //     res.status(200).json({ token, user });
    //   }
    // });
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //   return res.status(404).json({ msg: "Wrong password" });
    // }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // delete user.password;

    // res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
