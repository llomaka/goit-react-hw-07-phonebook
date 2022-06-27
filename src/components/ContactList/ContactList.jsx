import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import ContactListItem from 'components/ContactListItem';

export default function ContactList({contacts}) {
  return (
    <ul>
      {contacts.map(contact =>
      (<li
        key={contact.id}
        className={styles.item}
      >
        <ContactListItem contact={contact} />
      </li>)
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  )
};
