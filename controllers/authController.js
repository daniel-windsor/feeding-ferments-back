const User = require("../models/userModel");
const admin = require('firebase-admin')



exports.signUp = async (req, res, next) => {
  try {
    admin.auth().createUser(req.body)
      .then(({ uid, email, displayName }) => {
        return res.status(201).json({
          status: "success",
          user: {
            uid,
            email,
            displayName
          },
        });
      })
      .catch(err => (
        res.status(500).json({
          status: "fail",
          message: err.message
        })
      ))
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { token } = req.body

  console.log(req)

  try {
    const valid = await admin.auth().verifyIdToken(token)

    return res.status(200).json({
      status: "success",

    })

  } catch (err) {
    console.log('login error: ', err)
  }


  console.log(valid)
};
