const path = require('path')
const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    db: 'mongodb://saiaungpyae:XD2dTp9GjrjqEqA@ds123603.mlab.com:23603/blog', // move to .env
    port: 3000
  },
  production: {
    db: 'mongodb://saiaungpyae:XD2dTp9GjrjqEqA@ds123603.mlab.com:23603/blog'
  }
}

module.exports = config[env]
