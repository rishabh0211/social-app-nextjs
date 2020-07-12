const multer = require('multer');
const jimp = require('jimp');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const imageUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(null, false);
    }
  }
};

exports.uploadImage = multer(imageUploadOptions).single('image');

exports.resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `/static/uploads/${req.user.name}-${Date.now()}.${extension}`;
  const image = await jimp.read(req.file.buffer);
  await image.resize(750, jimp.AUTO);
  await image.write(`./${req.body.image}`);
  next();
};

exports.addPost = async (req, res) => {
  req.body.postedBy = req.user._id;
  console.log(req.isAuthUser);
  const post = await new Post(req.body).save();
  await Post.populate(post, {
    path: 'postedBy',
    select: '_id name avatar'
  });
  res.json(post);
};

exports.deletePost = () => {};

exports.getPostById = () => {};

exports.getPostsByUser = async (req, res) => {
  const posts = await Post.find({ postedBy: req.profile._id }).sort({
    createdAt: "desc"
  });
  res.json(posts);
};

exports.getPostFeed = async (req, res) => {
  const { following, _id } = req.profile;
  following.push(_id);
  const posts = await Post.find({ postedBy: { $in: following } }).sort({
    createdAt: "desc"
  });
  res.json(posts);
};

exports.toggleLike = () => {};

exports.toggleComment = () => {};