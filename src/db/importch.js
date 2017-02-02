const Baby = require('babyparse')
const countryIds = require('./countryids').ids

function parseFile (filePath) {
  const csv = Baby.parseFiles(filePath, { header: true })
  return csv.data.map(convertCsvToObj)
}

function convertCsvToObj (object) {
  const dateParts = object.IncorporationDate.split('/')

  return {
    company_category: object.CompanyCategory,
    company_number: object.CompanyNumber,
    company_status: object.CompanyStatus,
    incorporation_date: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
    name: object.CompanyName,
    registered_address_1: object['RegAddress.AddressLine1'],
    registered_address_2: object['RegAddress.AddressLine2'],
    registered_address_3: '',
    registered_address_4: '',
    registered_address_country: countryIds[object.CountryOfOrigin.toLowerCase()],
    registered_address_county: object['RegAddress.County'],
    registered_address_postcode: object['RegAddress.PostCode'],
    registered_address_town: object['RegAddress.PostTown'],
    sic_code_1: object['SICCode.SicText_1'],
    sic_code_2: object['SICCode.SicText_2'],
    sic_code_3: object['SICCode.SicText_3'],
    sic_code_4: object['SICCode.SicText_4']
  }
}

module.exports = { parseFile }
