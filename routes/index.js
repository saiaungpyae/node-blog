import { Router } from 'express';

import UserModel from '../models/user';
import { checkAuth } from '../middlewares/auth';
import { getAllPosts, createNewPost, getPostDetail, updatePost, deletePost } from '../controllers/post';

export default (app) => {
  const router = Router();

  // ----- Post ------- //
  router.get('/posts', getAllPosts);
  router.post('/posts/new', checkAuth, createNewPost);
  router
    .route('/posts/:id')
    .get(getPostDetail)
    .put(checkAuth, updatePost)
    .delete(checkAuth, deletePost);

  // ------ Login ------- //
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select({ email: 1, name: 1 });
    if(!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ token: 'token-xxx', user });
  });

  app.use('/', router);
};
