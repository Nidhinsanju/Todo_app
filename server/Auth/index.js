const jwt = require("jsonwebtoken");
require("dotenv").config();

const secrectWord = process.env.SECRET_KEY;

function AuthToken() {
  const token = jwt.sign(
    {
      data: "foobar",
    },
    secrectWord
  );
  return token;
}

function deCryptAuth(token) {
  const checkToken = token.split(" ")[1];
  if (checkToken?.length > 0) {
    console.log(checkToken);
    jwt.verify(checkToken, secrectWord, (err, decoded) => {
      if (err) {
        console.log(err.message);
        return;
      } else {
        console.log(decoded, "this is decoded"); // bar
      }
    });
  } else {
    return false;
  }
}

module.exports = { AuthToken, deCryptAuth };
