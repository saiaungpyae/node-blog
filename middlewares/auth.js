import HTTPError from '../helpers/custom-error';

export const checkAuth = async (req, res, next) => {
  const errorMessage = 'Unauthorized';
  const { headers = {} } = req;
  let { authorization } = headers;

  if (!authorization) {
    throw new HTTPError(401, errorMessage);
  }
  next();
};
