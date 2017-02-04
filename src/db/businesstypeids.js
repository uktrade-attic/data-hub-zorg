const ids = {
  '9dd14e94-5d95-e211-a939-e4115bead28a': 'Charity',
  '98d14e94-5d95-e211-a939-e4115bead28a': 'Company',
  '9cd14e94-5d95-e211-a939-e4115bead28a': 'Government Dept',
  '9cd14e96-5d95-e211-a939-e4115bead28a': 'Intermediary',
  '8b6eaf7e-03e7-e611-bca1-e4115bead28a': 'Limited partnership',
  '9ad14e94-5d95-e211-a939-e4115bead28a': 'Partnership',
  '35b6db3e-515c-4497-8020-3b1aea0c595b': 'Private limited company',
  'dac8c591-03e7-e611-bca1-e4115bead28a': 'Public limited company',
  '99d14e94-5d95-e211-a939-e4115bead28a': 'Sole Trader'
}

function idForName (name) {
  for (const id in ids) {
    const item = ids[id]
    if (item === name) {
      return id
    }
  }
}

module.exports = { ids, idForName }
