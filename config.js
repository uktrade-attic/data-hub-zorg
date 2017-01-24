const port = process.env.PORT || 3010

module.exports = {
  env: process.env.NODE_ENV,
  port: port,
  search: {
    hosts: process.env.BONSAI_URL || 'http://localhost:9200/',
    index: process.env.ESINDEX || 'datahub'
  }
}
