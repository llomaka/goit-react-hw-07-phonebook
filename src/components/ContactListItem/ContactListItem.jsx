import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import { useDeleteContactByIdMutation } from 'service/contactsApi';
import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

export default function ContactListItem({ contact }) {
  const { name, phone, id } = contact;
  const [deleteContact, { isLoading }] = useDeleteContactByIdMutation();

  const handleClick = (id, name) => {
    deleteContact(id);
    toast.info(`Contact ${name} is successfully deleted!`);
  };

  return (
    <>
      <p>{name}: {phone}</p>
      <button
        className={styles.button}
        type='button'
        onClick={() => handleClick(id, name)}
        disabled={isLoading}
      >
        {isLoading && <ClipLoader size={16} color='#fff' />}
        {!isLoading && <span>Delete</span>}
      </button>
    </>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
