import faker from 'faker';

import PostModel from '../models/post';

export default async (users, tags) => {
  const postCount = 20;
  await PostModel.deleteMany();
  for(let i = 0; i < postCount; i++) {
    const post = new PostModel({
      title: faker.name.title(),
      description: faker.lorem.paragraphs(),
      tags: tags
        .sort(() => 0.5 - Math.random())
        .slice(faker.random.number({ min: 5, max: 9 }))
        .map(d => d._id),
      author: users[i%3]._id
    });
    await post.save();
  }
}