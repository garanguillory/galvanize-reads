module.exports = {

  development: {
    client: 'pg',
    connection:'postgres://localhost/galvanize_reads'
  },
// essential in order to push up to heroku
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};