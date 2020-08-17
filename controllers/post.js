import PostModel from '../models/post';
import TagModel from '../models/tag';
import post from '../models/post';
import tag from '../models/tag';

export const getAllPosts = async (req, res) => {
  let query = {};
  let tagId;
  const { q } = req.query;

  if (q) {
    const _tag = await TagModel.findOne({ title: q });
    query.tags = _tag._id;
  }

  const _posts = await PostModel
    .find(query)
    .populate('author')
    .populate('tags')
    .sort({ createdAt: -1 })
    .lean();

  const posts = _posts.map(post => ({
    ...post,
    author: post.author.name,
    tags: post.tags.map(t => t.title)
  }))

  return res.status(200).json({ data: posts, message: 'Success' });
}

export const createNewPost = async (req, res) => {
  const { title, description, tags, author } = req.body;
  const _tags = await updateTags(tags);
  await PostModel.create({
    title, description, tags: _tags, author
  })
  return res.status(201).json({ message: 'Success' });
};

export const getPostDetail = async (req, res) => {
  const {id: postId} = req.params;
  const post = await PostModel.findById(postId).populate('tags');
  return res.status(200).json({ data: post, message: 'Success' });
}

export const updatePost = async (req, res) => {
  const {id: postId} = req.params;
  const { title, description, tags } = req.body;
  console.log(req.body, 'gg');
  const _tags = await updateTags(tags);
  await PostModel
    .findByIdAndUpdate(postId, {
      title, description, tags: _tags
    })
  return res.status(204).json({ message: 'Success' });
}

export const deletePost = async (req, res) => {
  const {id: postId} = req.params;
  await PostModel.findByIdAndDelete(postId);
  return res.status(204).json({ message: 'Success' });
}

const updateTags = async (tags) => {
  let _tags = [];
  for(const tag of tags) {
    let t = await TagModel.findOne({ title: tag });
    if (!t) {
      t = await TagModel.create({ title: tag });
    }
    _tags.push(t._id);
  }
  return _tags;
}