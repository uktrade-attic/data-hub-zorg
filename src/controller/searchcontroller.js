const search = require('../search')

const express = require('express')


const router = express.Router()


function fullsearch (req, res) {
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

function nonUkSearch (req, res) {
  if (!req.query.term || req.query.term.length === 0) {
    return res.json({
      total: 0,
      hits: []
    })
  }

  search.nonUkSearch(req.query.term)
    .then((results) => {
      return res.json(results)
    })
}


router.get('/search', fullsearch)
router.get('/nonuk', nonUkSearch)


module.exports = {
  router,
  fullsearch,
  nonUkSearch
}
