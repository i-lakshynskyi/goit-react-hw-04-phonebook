import React from 'react';
import PropTypes from 'prop-types';

import s from './contact-form.module.scss';

const ContactForm = ({onAddContact}) => {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');

  const onHandlerChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'name'){
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={s.addContactForm} onSubmit={onSubmit}>
      <label><p>Name:</p>
        <input type='text' placeholder={'Enter name'} name='name' required value={name}
               onChange={onHandlerChange} />
      </label>
      <label><p>Number:</p>
        <input
          type='tel'
          name='number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
          placeholder={'Enter number'}
          value={number}
          onChange={onHandlerChange}
        />
      </label>

      <button type={'submit'}>Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
