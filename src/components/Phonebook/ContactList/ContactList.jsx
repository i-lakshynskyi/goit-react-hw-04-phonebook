import React from 'react';
import PropTypes from 'prop-types';

import s from './contact-list.module.scss';

const ContactList = ({ contacts, onRemoveContact }) => {

  const [filter, setFilter] = React.useState('');

  const filteredContacts = contacts?.filter(({ name }) => {
    let nameItem = name?.toLowerCase();
    return nameItem.indexOf(filter.toLowerCase()) !== -1;
  });

  const onHandlerChange = (event) => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  return (
    <>
      {
        contacts?.length > 0 &&
        <div className={s.contactListWrapper}>
          <h2>Contacts</h2>
          <p>Find contacts by name</p>
          <input type='text' placeholder={'search by name'} onChange={onHandlerChange}
                 value={filter} />
          <ul>
            {filteredContacts.map(({ id, name, number }) =>
              <li key={id}>
                <div className={s.info}>
                  <span>{name}: </span>
                  <span>{number}</span>
                  <span className={s.delete} onClick={() => onRemoveContact(id)}> Delete </span>
                </div>
              </li>,
            )}
          </ul>
        </div>
      }
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  })),
  onRemoveContact: PropTypes.func,
};

export default ContactList;
