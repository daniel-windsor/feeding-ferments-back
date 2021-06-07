const Ferment = require("../models/fermentModel");

exports.getAllFerments = async (req, res, next) => {
  try {
    const ferments = await Ferment.find().where({ userId: req.user });
    res.status(200).json({
      status: "success",
      ferments,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.getOneFerment = async (req, res, next) => {
  try {
    const ferment = await Ferment.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        ferment,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.createFerment = async (req, res, next) => {
  try {
    const ferment = await Ferment.create({
      ...req.body,
      userId: req.user,
    });

    return res.status(201).json({
      status: "success",
      ferment,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
    });
  }
};

exports.editFerment = async (req, res, next) => {
  try {
    const ferment = await Ferment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      ferment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.deleteFerment = async (req, res, next) => {
  try {
    await Ferment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};
