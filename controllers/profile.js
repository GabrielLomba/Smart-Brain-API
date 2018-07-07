const handleProfile = (db) => (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where('id', id)
    .then(users => {
      if (users.length) {
        res.json(users[0]);
      } else {
        res.status(404).json('User not found.');
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json('error getting user.')
    });
};

module.exports = {
  handleProfile
};