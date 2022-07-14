import React, { Component } from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  };

  onAddContact = (data) => {
    const { name, number } = data;
    const newId = `id-${this.state.contacts.length + 1}`;
    this.setState({ contacts: [...this.state.contacts, { id: newId, name, number }] });
  };

  onRemoveContact = (removeID) => {
    const newContacts = this.state.contacts.filter(({ id }) => id !== removeID);
    this.setState({ contacts: newContacts });
  };

  render() {
    return (
      <div className={s.phonebookWrapper}>
        <h2>Phonebook</h2>
        <ContactForm onAddContact={this.onAddContact} />

        <ContactList contacts={this.state.contacts} onRemoveContact={this.onRemoveContact} />
      </div>
    );
  }
};

export default Phonebook;
