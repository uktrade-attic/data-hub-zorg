const port = process.env.PORT || 8000

module.exports = {
  env: process.env.NODE_ENV,
  port: port,
  search: {
    hosts: process.env.elasticsearch || 'http://localhost:9200/'
  }
}
