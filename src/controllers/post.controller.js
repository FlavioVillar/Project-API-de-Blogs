const { getUserByToken } = require('../services/jwt.service');
const postService = require('../services/post.service');

const createPostWithUser = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const UserEmail = await getUserByToken(authorization);
  const post = await postService.createPostWithUser({ title, content, categoryIds, UserEmail });
  return res.status(201).json(post.dataValues);
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await postService.updatePost(id, { title, content });
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const deletePost = async (req, res, _next) => {
  const { id } = req.params;
  const post = await postService.deletePost(id);
  console.log('post111', post);
  if (post === false) {
    return res.status(404).json({ message: '2222 Post does not exist' });
  }
 return res.status(204).end();
};

module.exports = {
  createPostWithUser,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};