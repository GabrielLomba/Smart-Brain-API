const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
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
    .catch(() => res.status(500).json('error logging in'));
};

module.exports = {
  handleSignIn
};