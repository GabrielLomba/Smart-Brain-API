const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f541ff5770dd47ccb8c47f05c93b8811'
});

const handleFaceRecognition = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err));

}

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
  handleImageSubmission,
  handleFaceRecognition
};