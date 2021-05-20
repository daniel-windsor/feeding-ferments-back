const admin = require("firebase-admin");

exports.login = async (req, res) => {
  const { token } = req.body;

  try {
    const valid = await admin.auth().verifyIdToken(token);
    console.log(valid);

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    admin
      .auth()
      .createUser(req.body)
      .then(({ uid, email, displayName }) => {
        return res.status(201).json({
          status: "success",
          user: {
            uid,
            email,
            displayName,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          status: "fail",
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  admin
    .auth()
    .deleteUser(req.user)
    .then(() => {
      return res.status(200).json({
        status: "success",
      });
    });
};
