const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../models');

const updateAvatarURL = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpPath } = req.file;

  try {
    const img = await Jimp.read(tmpPath);
    await img.resize(250, 250).write(tmpPath);

    const saveDir = path.resolve('public', 'avatars');
    const newFileName = `${_id}.${img.getExtension()}`;
    const newPath = path.join(saveDir, newFileName);

    await fs.rename(tmpPath, newPath);

    const avatarURL = `/avatars/${newFileName}`;
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
  }
};

module.exports = updateAvatarURL;
