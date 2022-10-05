const path = require('path');
const fs = require('fs/promises');

const { User } = require('../../models');

const updateAvatarURL = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpPath, mimetype } = req.file;

  try {
    const saveDir = path.resolve('public', 'avatars');
    const [, extension] = mimetype.split('/');
    const newFileName = `${_id}.${extension}`;
    const newPath = path.join(saveDir, newFileName);
    await fs.rename(tmpPath, newPath);

    const avatarURL = path.join('public', 'avatars', newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
  }
};

module.exports = updateAvatarURL;
