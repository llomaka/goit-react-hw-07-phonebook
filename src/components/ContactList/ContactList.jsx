import PropTypes from 'prop-types';
import { useDeleteContactByIdMutation } from 'service/contactsApi';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import styles from './ContactList.module.css';

export default function ContactList({contacts}) {
  const [deleteContact, { isLoading }] = useDeleteContactByIdMutation();

  const handleClick = (id, name) => {
    deleteContact(id);
    toast.info(`Contact ${name} id successfully deleted!`);
  };

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
          onClick={() => handleClick(contact.id, contact.name)}
          disabled={isLoading}
        >
          {isLoading && <ClipLoader size={16} />}
          {!isLoading && <span>Delete</span>}
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
