const search = require('../search')

module.exports = function (req, res) {
  if (!req.query.term || req.query.term.length === 0) {
    return res.json({
      total: 0,
      hits: []
    })
  }

  search.search(req.query.term)
    .then((results) => {
      return res.json(results)
    })
}
