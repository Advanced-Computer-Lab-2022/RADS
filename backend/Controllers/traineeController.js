const Trainee = require('../Models/traineeModel');
const mongoose = require('mongoose');

const getTrainees = async(req, res) => {
    const trainees = await Trainee.find({}).sort({ createdAt: -1 });
    res.status(200).json(trainees);
}

const getTrainee = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'There does not exist a trainee with the corresponding id.' });
  }
  const trainee = await Trainee.findById(id)
  if (!trainee) {
      return res.status(404).json({ error: 'No such trainee' });
  }
  res.status(200).json(trainee);
}
const updatePassword = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'There does not exist an trainee with the corresponding id.' });
  }
  const trainee = await Trainee.findByIdAndUpdate({ _id: id }, {
      password: req.body.password
  });
  if (!trainee) {
      return res.status(404).json({ error: 'No such trainee' });
  }
  res.status(200).json(trainee);
}



module.exports = {
  getTrainees,
  getTrainee,
  updatePassword
}