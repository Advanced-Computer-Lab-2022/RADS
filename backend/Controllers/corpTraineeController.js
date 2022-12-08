const CorpTrainee = require('../Models/corpTraineeModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
const updatePassword = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'There does not exist an CT with the corresponding id.' });
    }
    const corpTrainee = await CorpTrainee.findByIdAndUpdate({ _id: id }, {
        password: req.body.password
    });
    if (!corpTrainee) {
        return res.status(404).json({ error: 'No such CT' });
    }
    res.status(200).json(corpTrainee);
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => {
    return jwt.sign({ userName }, 'supersecret', {
        expiresIn: maxAge
    });
};
const login = async (req, res) => {
  const {userName,password} = req.body;
  const corpTrainee = await CorpTrainee.findOne({userName : userName});
  if(corpTrainee){
      const auth = await bcrypt.compare(password, corpTrainee.password);
      if(auth){
          const token = createToken(corpTrainee.userName);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json(corpTrainee);
      }
      else{
          res.status(400).json({error : 'password is incorrect'})
      }
  }
  else{
      res.status(400).json({error : 'user not found'})
  }
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => {
    return jwt.sign({ userName }, 'supersecret', {
        expiresIn: maxAge
    });
};

}

const logout = async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.status(200).json({ message: "logged out" })




module.exports = {
    getCTrainees,
    getCTrainee,
    updatePassword,
  login,
  logout
}