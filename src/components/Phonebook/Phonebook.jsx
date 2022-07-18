import React, { useReducer } from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

// useReducer
const phonebookReducer = (state, { type, payload }) => {
  switch (type) {
    case 'addContact':
      return { ...state, contacts: [...state.contacts, payload] };
    case 'removeContact':
      return { ...state, contacts: [...payload] };
    default:
      return new Error(`Unsupported  action type ${type}`);
  }
};
const init = (initState) => {
  const initLocalStorage = JSON.parse(window.localStorage.getItem('contacts'));
  return {...initState, contacts: initLocalStorage ?? initState };
};

// Component Phonebook
const Phonebook = () => {

  const [state, dispatch] = useReducer(phonebookReducer, {
    contacts: [],
  }, init);

  React.useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);


  const onAddContact = (name, number) => {
    const id = nanoid();
    const checkName = state.contacts.filter(contact => contact.name.trim().toUpperCase() === name.trim().toUpperCase());
    if (checkName.length > 0) {
      alert(name + ' is already in contacts');
      return;
    }
    dispatch({ type: 'addContact', payload: { id, name, number } });
  };

  const onRemoveContact = (removeID) => {
    const newContacts = state.contacts.filter(({ id }) => id !== removeID);
    dispatch({ type: 'removeContact', payload: newContacts });
  };

  return (
    <div className={s.phonebookWrapper}>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={onAddContact} />
      <ContactList contacts={state.contacts} onRemoveContact={onRemoveContact} />
    </div>
  );
};

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
}
export default Phonebook;
