import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ error: "password did not match" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "emial is already exist" });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        password: newUser.password,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

//for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "email  does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: "password does not match" });
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      gender: user.gender,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server erorr " });
  }
};

//for logout
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "log out successful" });
  } catch (error) {
    console.log("error in login ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
