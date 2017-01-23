const elasticsearch = require('elasticsearch')
const config = require('../../config')

const client = new elasticsearch.Client({
  hosts: config.search.hosts
})

module.exports = client
