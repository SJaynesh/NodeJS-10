const jwt = require("jsonwebtoken");
const SECRET = "SJaynesh@1232#^";

const authUser = (req, res, next) => {
  console.log("Perfect Auth User is running...");
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Authentication is required..." });
  }

  try {
    token = token.slice(7, token.length);
    console.log("Token : ", token);

    const decode = jwt.verify(token, SECRET);

    console.log("Decoded : ", decode);

    if (decode) {
      req.user = decode.userData;
      next();
    } else {
      res.status(400).json({ msg: "Token is invalid..." });
    }
  } catch (e) {
    res.status(400).json({ msg: "Token is invalid..." });
  }
};

module.exports = authUser;
