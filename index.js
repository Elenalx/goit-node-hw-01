const { program } = require('commander');
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.log(listContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);