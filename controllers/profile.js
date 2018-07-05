const handleProfile = (db) => (req, res) => {
  const { id } = req.params;
  db.select('*').from('user').where('id', id)
    .then(users => {
      if (users.length) {
        res.json(users[0]);
      } else {
        res.status(404).json('User not found.');
      }
    }).catch(() => res.status(500).json('error getting user.'));
};

module.exports = {
  handleProfile
};