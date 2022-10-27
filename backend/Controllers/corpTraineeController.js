const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');

const getCTrainees = async(req, res) => {
    const corpTrainees = await CorpTrainee.find({}).sort({ createdAt: -1 });
    res.status(200).json(corpTrainees);
}

const getCTrainee = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'There does not exist a CT with the corresponding id.' });
  }
  const corpTrainee = await CorpTrainee.findById(id)
  if (!corpTrainee) {
      return res.status(404).json({ error: 'No such CT' });
  }
  res.status(200).json(corpTrainee);
}


module.exports = {
  getCTrainees,
  getCTrainee
}