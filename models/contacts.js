const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const data = contacts.find((contact) => contactId === contact.id);
  return data || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateDataBase(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await updateDataBase(contacts);
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [data] = contacts.splice(index, 1);
  await updateDataBase(contacts);
  return data;
};

const updateDataBase = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
