const knex = require('../db/knex')

function Contacts () {
  return knex('contact')
}

function getContact (contactId) {
  return Contacts().where('id', contactId).first()
}

function getContacts () {
  return Contacts().select()
}

function addContact (contact) {
  return Contacts()
    .insert(contact, 'id')
    .then((result) => {
      return result[0]
    })
}

function updateContact (id, contact) {
  return Contacts().where('id', id).update(contact)
}

function deleteContact (id) {
  return Contacts().where('id', id).del()
}

function getContactsForCompany (id) {
  return Contacts().where('company', id)
}

module.exports = { getContact, getContacts, addContact, deleteContact, updateContact, getContactsForCompany }
