const admin = require('firebase-admin')

const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
        req.user = decodedToken.uid
        next();
      })
      .catch((err) => {
        console.log(err)
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
};

module.exports = checkAuth;
