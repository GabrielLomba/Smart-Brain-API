const handleImageSubmission = (db) => (req, res) => {
  const { id } = req.body;
  db('user').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0]);
      } else {
        res.status(404).json('User not found.');
      }
    })
    .catch(() => res.status(500).json('unable to increment entries'));
};

module.exports = {
  handleImageSubmission
};