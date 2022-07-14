import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './contact-form.module.scss';

class ContactForm extends Component {

  static propTypes = {
    onAddContact: PropTypes.func,
  };

  state = {
    name: '',
    number: '',
  };

  onHandlerChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAddContact(this.state);
  };

  render() {
    return (
      <form className={s.addContactForm} onSubmit={this.onSubmit}>
        <label><p>Name:</p>
          <input type='text' placeholder={'Enter name'} name='name' required value={this.state.name}
                 onChange={this.onHandlerChange} />
        </label>
        <label><p>Number:</p>
          <input
            type='tel'
            name='number'
            pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
            title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
            required
            placeholder={'Enter number'}
            value={this.state.number}
            onChange={this.onHandlerChange}
          />
        </label>

        <button type={'submit'}>Add contact</button>
      </form>
    );
  }
};

export default ContactForm;
