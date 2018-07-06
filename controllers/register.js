const validations = require('../utils/validations')

const validateUser = (email, name, password, res) => {
  let isValid = true;

  if(!validations.isValidEmail(email)) {
    res.status(400).json('Invalid e-mail address');
    isValid = false;
  } else if(!validations.hasStringValue(name)) {
    res.status(400).json('Invalid name');
    isValid = false;
  } else if(!validations.hasStringValue(password)) {
    res.status(400).json('Invalid password');
    isValid = false;
  }

  return isValid;
}

const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if(validateUser(email, name, password, res)) {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        res.status(500).json(err);
      } else {
        db.transaction(trx => {
          trx.insert({
            hash: hash,
            email: email
          })
            .into('login')
            .returning('email')
            .then(loginEmail => {
              return trx('users')
                .returning('*')
                .insert({
                  name: name,
                  email: loginEmail[0],
                }).then(response => {
                  res.status(201).json(response);
                }).catch(() => {
                  res.status(400).json('unable to register');
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
      }
    });
  }
};

module.exports = {
  handleRegister
};