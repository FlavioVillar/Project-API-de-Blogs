require('dotenv/config');
const jwt = require('jsonwebtoken');
const postService = require('../services/post.service');

const createPostWithUser = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
  const UserEmail = data.email;
  const post = await postService.createPostWithUser({ title, content, categoryIds, UserEmail });
  return res.status(201).json(post.dataValues);
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.status(200).json(posts);
};

module.exports = {
  createPostWithUser,
  getAllPosts,
};