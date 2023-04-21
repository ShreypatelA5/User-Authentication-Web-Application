const express = require("express");
const app = express();

const path = require("path");
const bcrypt = require("bcrypt");

const saltRounds = 10; 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// get "/" route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// get "/user" route
app.get("/user", (req, res) => {
  const { username, password } = req.query;
  res.send(`
    <html>
      <head>
        <title>Login Page</title>
        <style>
          /* Add some styles to make it look nicer */
          body {
            font-family: Arial, sans-serif;
            text-align: center;
          }
          h1 {
            color: red;
          }          
          p {
            color: blue;
            font-size: 24px;
            margin: 20px 0;
          }          
        </style>
      </head>
      <body>
        <h1>Welcome to the Login Page</h1>
        <h1>Here is the information of Login ID and Password </h1>
        <p>Your User name is: <strong>${username}</strong></p>
        <p>Your encrypted password is: <strong>${password}</strong></p>
      </body>
    </html>
  `);
});

// get "/login" route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const hash = bcrypt.hashSync(password, saltRounds);
    res.redirect(`/user?username=${username}&password=${hash}`);
  } else {
    res.redirect("/");
  }
});

// call local host http://localhost:3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
