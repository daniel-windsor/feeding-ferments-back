const Direction = require("../models/directionModel");

exports.getAllDirections = async (req, res, next) => {
  try {
    const directions = await Direction.find().where({ userId: req.user });
    res.status(200).json({
      status: "success",
      directions,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.getFermentDirections = async (req, res, next) => {
  try {
    const directions = await Direction.find().where({
      fermentId: req.params.id,
    });
    res.status(200).json({
      status: "success",
      directions,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.getOneDirection = async (req, res, next) => {
  try {
    const direction = await Direction.findById(req.params.id);
    res.status(200).json({
      status: "success",
      direction,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.createDirection = async (req, res, next) => {
  try {
    const direction = await Direction.create({
      ...req.body,
      userId: req.user,
    });
    res.status(201).json({
      status: "success",
      direction,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.editDirection = async (req, res, next) => {
  try {
    const direction = await Direction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      direction,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.deleteFermentDirections = async (req, res, next) => {
  try {
    await Direction.deleteMany({
      fermentId: req.params.id
    })
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}

exports.deleteDirection = async (req, res, next) => {
  try {
    await Direction.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
}
