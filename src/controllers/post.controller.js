const { getUserByToken } = require('../services/jwt.service');
const postService = require('../services/post.service');

const createPostWithUser = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  try {
  const UserEmail = await getUserByToken(authorization);
  const post = await postService.createPostWithUser({ title, content, categoryIds, UserEmail });
    return res.status(201).json(post.dataValues);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
  const posts = await postService.getAllPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
  const post = await postService.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postService.updatePost(id, { title, content });
 
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePost = async (req, res, _next) => {
  const { id } = req.params;
  try {
  await postService.deletePost(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createPostWithUser,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};