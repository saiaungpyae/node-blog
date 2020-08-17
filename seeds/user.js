import UserModal from '../models/user';

export default async () => {  
  const users = [
    'Andrew',
    'Luis',
    'Peter'
  ].map(d => ({
    name: d,
    email: d.toLowerCase() + '@gmail.com'
  }));
  await UserModal.deleteMany();
  const data = await UserModal.insertMany(users);
  return data;
}
