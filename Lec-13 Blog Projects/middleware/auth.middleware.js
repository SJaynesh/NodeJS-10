const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ status: false, error: "Auth is required..." });
  }

  try {
    token = token.slice(7, token.length);

    const decode = jwt.verify(token, process.env.Secret);
    req.user = decode.current_user;

    next();
  } catch (e) {
    res.status(401).json({ status: false, error: "Token is invalid..." });
  }
};

module.exports = auth;
