const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const contacts = await readContacts();

    if (!contacts) {
      throw new Error('No data to display.');
    }

    return contacts;
  } catch (e) {
    console.error('Read list contacts error:', e.message);
  }
};

/**
 *
 * @param {String} contactId
 * @returns *Contact by id* or *undefined* if id was not found
 */
const getContactById = async (contactId) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (e) {
    console.error(`Read contact by ID=${contactId} error:`, e.message);
  }
};

/**
 *
 * @param {String} contactId
 * @returns **true** on success or **false**
 */
const removeContact = async (contactId) => {
  try {
    const contacts = await readContacts();

    const indexForDelete = contacts.findIndex(({ id }) => id === contactId);

    if (indexForDelete === -1) {
      return false;
    }

    contacts.splice(indexForDelete, 1);

    await writeContacts(contacts);

    return true;
  } catch (e) {
    console.error('Delete contact by ID error:', e.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: randomUUID(),
      ...body,
    };

    const contacts = await readContacts();

    contacts.push(newContact);

    await writeContacts(contacts);

    return newContact;
  } catch (e) {
    console.error('Unable to add contact. Error:', e.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContacts();
    const contact = contacts.find(({ id }) => id === contactId);

    if (!contact) {
      return null;
    }

    Object.assign(contact, body);

    await writeContacts(contacts);

    return contact;
  } catch (e) {
    console.error('Unable to update contact. Error:', e.message);
  }
};

/**
 * @async
 * @returns {Array} Array of contacts from contacts.json.
 */
async function readContacts() {
  try {
    const content = await fs.readFile(contactsPath, { encoding: 'utf8' });
    return JSON.parse(content);
  } catch (e) {
    console.error('Read error:', e.message);
  }
}

/**
 * @async
 * @param {Array} dataToWrite New array of contacts for write to contacts.json.
 */
async function writeContacts(dataToWrite) {
  try {
    const plainText = JSON.stringify(dataToWrite);
    await fs.writeFile(contactsPath, plainText);
  } catch (e) {
    console.error('Write error:', e.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
