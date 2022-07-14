import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './contact-list.module.scss';

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })),
    onRemoveContact: PropTypes.func,
  };

  state = {
    filter: '',
  };

  onHandlerChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const filteredContacts = this.props.contacts?.filter(({ name }) => {
      let nameItem = name.toLowerCase();
      return nameItem.indexOf(this.state.filter.toLowerCase()) !== -1;
    });
    return (
      <>
        {
          this.props.contacts?.length > 0 &&
          <div className={s.contactListWrapper}>
            <h2>Contacts</h2>
            <p>Find contacts by name</p>
            <input type='text' placeholder={'search by name'} name='filter' onChange={this.onHandlerChange}
                   value={this.state.filter} />
            <ul>
              {filteredContacts.map(({ id, name, number }) =>
                <li key={id}>
                  <span>{name}: </span>
                  <span>{number}</span>
                  <span className={s.delete} onClick={() => this.props.onRemoveContact(id)}> Delete </span>
                </li>,
              )}
            </ul>
          </div>
        }
      </>
    );
  }
};

export default ContactList;
