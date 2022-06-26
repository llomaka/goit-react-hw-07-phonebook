// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchContacts, postContact } from 'service/api';
import contactsReducer, { deleteContact } from 'redux/contactsSlice';
import styles from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter.value);
  const dispatch = useDispatch(contactsReducer);
  const renderContactList = () => contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  // useEffect(() => {
    // postContact({
    //   'name': "Lilia Lomaka",
    //   'phone': "345-675-9523"});
    // fetchContacts().then(data => console.log(data));
// });

  return (
    <ul>
      {renderContactList().map(contact =>
      (<li
        key={contact.id}
        id={contact.id}
        className={styles.item}
      >
        {contact.name}: {contact.number}
        <button
          className={styles.button}
          type='button'
          onClick={() => dispatch(deleteContact(contact.id))}
        >
          Delete
        </button>
      </li>)
      )}
    </ul>
  )
};
