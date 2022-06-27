import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import { useGetAllContactsQuery } from 'service/contactsApi';

import styles from './App.module.css';

export default function App() {
  const { data = [], isError, error, isLoading, isSuccess } = useGetAllContactsQuery();
  const filter = useSelector(state => state.filter.value);
  const renderContactList = () => data.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));


  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm />
      <h2 className={styles.subheader}>Contacts</h2>
      {isError && (<p>An error occurred: {error}</p>)}
      {isLoading && <p>Loading...</p>}
      <Filter />
      {isSuccess && <ContactList contacts={renderContactList()} />}
    </div>
  );
};
