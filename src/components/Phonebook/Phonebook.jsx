import React, { Component } from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';


class Phonebook extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if(parsedContacts){
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = (data) => {
    const { name, number } = data;
    const id = nanoid();
    const checkName = this.state.contacts.filter(contact => contact.name === name);
    if (checkName.length > 0){
      alert(name + " is already in contacts");
      return;
    }
    this.setState({ contacts: [...this.state.contacts, { id, name, number }] });
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
