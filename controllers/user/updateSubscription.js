const { User } = require('../../models');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
      fields: ['-createdAt', '-updatedAt'],
    }
  );

  res.json(user);
};

module.exports = updateSubscription;
