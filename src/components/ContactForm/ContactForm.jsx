import { useState } from 'react';
import { usePostContactMutation, useGetAllContactsQuery } from 'service/contactsApi';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const nameInputId = nanoid();
  const phoneInputId = nanoid();
  const { data } = useGetAllContactsQuery();
  const [addContact, { isLoading }] = usePostContactMutation();

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data?.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return toast.warning(`${name} is already in Contacts List!`);
    }
    await addContact({ name, phone });
    // toast.info(`${name} is successfully added to Contacts List!`);
    resetForm();
  };

  return (
    <form
      className={styles.form}
      autoComplete='on'
      onSubmit={handleSubmit}
    >
      <div className={styles.fields}>
        <label
          className={styles.label}
          htmlFor={nameInputId}>
          Name *
        </label>
        <input
          className={styles.input}
          type='text'
          name='name'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
          placeholder='John Smith'
          onChange={handleInputChange}
          value={name}
        />
      </div>
      <div className={styles.fields}>
        <label
          className={styles.label}
          htmlFor={phoneInputId}>
          Phone *
        </label>
        <input
          className={styles.input}
          type='tel'
          name='phone'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
          id={phoneInputId}
          placeholder='050-123-23-23'
          onChange={handleInputChange}
          value={phone}
        />
      </div>
      <button
        className={styles.button}
        type='submit'
        name='submit_button'
        disabled={isLoading}
      >
        {isLoading && <ClipLoader size={16} color='#fff' />}
        {!isLoading && <span>Add contact</span>}
      </button>
    </form>
  );
};
