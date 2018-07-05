const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
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
            return trx('user')
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
};

module.exports = {
  handleRegister
};