import PropTypes from 'prop-types';
import { useDeleteContactByIdMutation } from 'service/contactsApi';
import styles from './ContactList.module.css';

export default function ContactList({contacts}) {
  const [deleteContact] = useDeleteContactByIdMutation();

  return (
    <ul>
      {contacts.map(contact =>
      (<li
        key={contact.id}
        id={contact.id}
        className={styles.item}
      >
        {contact.name}: {contact.phone}
        <button
          className={styles.button}
          type='button'
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </button>
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
