/* global describe: true, beforeEach: true, afterEach: true, it:true */
const path = require('path')
const ImportCH = require('../../src/db/importch')

const csvPath = path.join(__dirname, 'data', 'marriot_ch.csv')

describe('Import Companies House Data', () => {
  describe('parse csv file into object array', () => {
    let chRecords

    beforeEach(() => {
      chRecords = ImportCH.parseFile(csvPath)
    })
    it('should convert the CH file into the correct number of records', () => {
      expect(chRecords).to.have.length(96)
    })
    it('should convert the CH file into the correct scheme for CH', () => {
      expect(chRecords[0]).to.have.all.keys([
        'company_category',
        'company_number',
        'company_status',
        'incorporation_date',
        'name',
        'registered_address_1',
        'registered_address_2',
        'registered_address_3',
        'registered_address_4',
        'registered_address_country',
        'registered_address_county',
        'registered_address_postcode',
        'registered_address_town',
        'sic_code_1',
        'sic_code_2',
        'sic_code_3',
        'sic_code_4'
      ])
    })
    it('should correctly convert the CH raw data', () => {
      expect(chRecords[0]).to.deep.equal({
        company_category: 'Private Limited Company',
        company_number: '08202257',
        company_status: 'Active',
        incorporation_date: '2012-09-05',
        name: 'MARRIOT CLEANING SERVICES LIMITED',
        registered_address_1: '51 HUGON ROAD',
        registered_address_2: 'FULHAM',
        registered_address_3: '',
        registered_address_4: '',
        registered_address_country: null,
        registered_address_county: '',
        registered_address_postcode: 'SW6 3ER',
        registered_address_town: 'LONDON',
        sic_code_1: '69202 - Bookkeeping activities',
        sic_code_2: '81222 - Specialised cleaning services',
        sic_code_3: '81299 - Other cleaning services',
        sic_code_4: ''
      })
    })
  })
})
