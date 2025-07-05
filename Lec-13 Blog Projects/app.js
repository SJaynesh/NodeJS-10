const express = require("express");

require("dotenv").config();

const app = express();

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/blog", require("./routes/blog.route"));
app.use("/api/comment", require("./routes/comment.route"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return false;
  }

  console.log("Server is started...", process.env.PORT);
});
