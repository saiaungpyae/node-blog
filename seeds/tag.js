import TagModel from '../models/tag';

export default async () => {  
  const tags = [
    'javascript',
    'nodejs',
    'angular',
    'python',
    'css',
    'bootstrap',
    'html',
    'laravel',
    'express',
    'ruby'
  ].map(d => ({ title: d }));
  await TagModel.deleteMany();
  const data = await TagModel.insertMany(tags);
  return data;
}
