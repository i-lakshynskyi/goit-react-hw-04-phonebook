import React, { useReducer } from 'react';
import s from './phonebook.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';

// useReducer
const phonebookReducer = (state, { type, payload }) => {
  switch (type) {
    case 'addContact':
      return { ...state, contacts: [...state.contacts, payload] };
    case 'removeContact':
      return { ...state, contacts: [...payload] };
    case 'setFilter':
      return {...state, filter: payload}
    default:
      return new Error(`Unsupported  action type ${type}`);
  }
};
const init = (initState) => {
  const initLocalStorage = JSON.parse(window.localStorage.getItem('contacts'));
  return {...initState, contacts: initLocalStorage ?? initState.contacts };
};

// Component Phonebook
const Phonebook = () => {

  const [state, dispatch] = useReducer(phonebookReducer, {
    contacts: [],
    filter: '',
  }, init);

  const filteredContacts = state.contacts?.filter(({ name }) => {
    let nameItem = name?.toLowerCase();
    return nameItem.indexOf(state.filter.toLowerCase()) !== -1;
  });

  React.useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);


  const onAddContact = (name, number) => {
    const id = nanoid();
    const checkName = state.contacts.find(contact => contact.name.trim().toUpperCase() === name.trim().toUpperCase());
    if (checkName) {
      alert(name + ' is already in contacts');
      return;
    }
    dispatch({ type: 'addContact', payload: { id, name, number } });
  };

  const onRemoveContact = (removeID) => {
    const newContacts = state.contacts.filter(({ id }) => id !== removeID);
    dispatch({ type: 'removeContact', payload: newContacts });
  };

  const onHandlerChange = (event) => {
    const { value } = event.currentTarget;
    dispatch({ type: 'setFilter', payload: value });
  };

  return (
    <div className={s.phonebookWrapper}>
      <h2>Phonebook</h2>
      <ContactForm onAddContact={onAddContact} />
      <ContactList contacts={filteredContacts} onRemoveContact={onRemoveContact} filter={state.filter} onHandlerChange={onHandlerChange}/>
    </div>
  );
};

export default Phonebook;
