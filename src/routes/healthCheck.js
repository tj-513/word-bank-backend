const greetings = async (req, res) => {
  res
    .status(200)
    .send({ message: 'may the force be with you', version: '0.0.1' });
};

module.exports = {
  greetings,
};
