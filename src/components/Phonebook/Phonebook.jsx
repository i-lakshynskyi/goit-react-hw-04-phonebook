import React from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


const Phonebook = () => {
  const [contacts, setContacts] = React.useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);

  React.useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const onAddContact = (name, number) => {
    const id = nanoid();
    const checkName = contacts.filter(contact => contact.name === name);
    if (checkName.length > 0){
      alert(name + " is already in contacts");
      return;
    }
    setContacts([...contacts, { id, name, number }] );
  };

  const onRemoveContact = (removeID) => {
    const newContacts = contacts.filter(({ id }) => id !== removeID);
    setContacts([...newContacts]);
  };

    return (
      <div className={s.phonebookWrapper}>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={onAddContact} />
        <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
      </div>
    );

};

export default Phonebook;
