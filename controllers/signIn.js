const validations = require('../utils/validations')

const validateLoginData = (email, password, res) => {
  let isValid = true;

  if(!validations.isValidEmail(email)) {
    res.status(400).json('Invalid e-mail address');
    isValid = false;
  } else if(!validations.hasStringValue(password)) {
    res.status(400).json('Invalid password');
    isValid = false;
  }

  return isValid;
}

const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if(validateLoginData(email, password, res)) {
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(users => {
      if (users.length && bcrypt.compareSync(password, users[0].hash)) {
        return db.select('*').from('user')
          .where('email', '=', email)
          .then(users => {
            res.json(users[0]);
          })
      } else {
        res.status(401).json('Invalid username or password');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json('error logging in')
    });
  }
};

module.exports = {
  handleSignIn
};