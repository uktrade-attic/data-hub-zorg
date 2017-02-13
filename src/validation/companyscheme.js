module.exports = {
  'name': {
    notEmpty: {
      errorMessage: 'You must provide a name'
    },
    isLength: {
      options: [{ max: 100 }],
      errorMessage: 'Must be between 2 and 100 chars long'
    },
    errorMessage: 'Invalid name'
  },
  'registered_address_1': {
    notEmpty: true,
    isLength: {
      options: [{ max: 255 }],
      errorMessage: 'Must be between 2 and 255 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid address'
  },
  'registered_address_2': {
    optional: true,
    isLength: {
      options: [{ max: 255 }],
      errorMessage: 'Must be between 2 and 255 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid address'
  },
  'registered_address_town': {
    optional: true,
    isLength: {
      options: [{ max: 255 }],
      errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid address'
  },
  'registered_address_county': {
    optional: true,
    isLength: {
      options: [{ max: 255 }],
      errorMessage: 'Must be between 2 and 255 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid address'
  },
  'registered_address_postcode': {
    notEmpty: true,
    isLength: {
      options: [{ max: 10 }],
      errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
    },
    errorMessage: 'Invalid address'
  }
}
