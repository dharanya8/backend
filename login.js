const express = require("express");
const app = express();

app.use(express.json());

// Dummy user (DB illama easy understand)
const user = {
  email: "test@gmail.com",
  password: "123456"
};

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    res.json({ msg: "Login success" });
  } else {
    res.json({ msg: "Invalid email or password" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});