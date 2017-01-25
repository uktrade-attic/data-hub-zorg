module.exports = {
  'first_name': {
    notEmpty: {
      errorMessage: 'You must provide a name'
    },
    isLength: {
      options: [{ max: 100 }],
      errorMessage: 'Must be between 2 and 100 chars long'
    },
    errorMessage: 'Invalid name'
  }
}
