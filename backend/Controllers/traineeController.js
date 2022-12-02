const Trainee = require('../Models/traineeModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

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
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userName) => {
    return jwt.sign({ userName }, 'supersecret', {
        expiresIn: maxAge
    });
};
const signUp = async (req, res) => {
  const { userName,firstName,lastName,gender, email, password } = req.body;
  try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const trainee = await Trainee.create({
        userName:userName,
        firstName:firstName,
        lastName:lastName,
        email: email,
        gender:gender,
        password: hashedPassword });
      const token = createToken(trainee.userName);

      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json(trainee)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  const {userName,password} = req.body;
  const trainee = await Trainee.findOne({userName : userName});
  if(trainee){
      const auth = await bcrypt.compare(password, trainee.password);
      if(auth){
          const token = createToken(trainee.userName);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json(trainee);
      }
      else{
          res.status(400).json({error : 'password is incorrect'})
      }
  }
  else{
      res.status(400).json({error : 'user not found'})
  }
}

const logout = async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.status(200).json({ message: "logged out" })

}

module.exports = {
  getTrainees,
  getTrainee,
  updatePassword,
  signUp,
  login,
  logout
}