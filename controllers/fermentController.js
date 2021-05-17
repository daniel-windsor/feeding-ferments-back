const Ferment = require("../models/fermentModel");

exports.getAllFerments = async (req, res, next) => {
  try {
    const ferments = await Ferment.find().where({ userId: req.user._id });
    console.log(req.user)
    res.status(200).json({
      status: "success",
      data: {
        ferments,
      },
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
      userId: req.user._id,
    });

    res.status(201).json({
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

exports.editFerment = async (req, res, next) => {
  try {
    const ferment = await Ferment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
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
