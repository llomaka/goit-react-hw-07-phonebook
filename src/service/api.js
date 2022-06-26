import axios from 'axios';

//запит переліку контактів
export async function fetchContacts() {
  const { data } = await axios.get('https://62b1d228c7e53744afc2005c.mockapi.io/contacts');
  return data;
}
//запит контакту за ідентифікатором
export async function fetchContactById(contact_id) {
  const { data } = await axios.get(`https://62b1d228c7e53744afc2005c.mockapi.io/contacts/${contact_id}`);
  return data;
}
//публікація нового контаку
export async function postContact(contact_object) {
  const { data } = await axios.post('https://62b1d228c7e53744afc2005c.mockapi.io/contacts', {...contact_object});
  return data;
}
//публікація контакту за ідентифікатором
export async function editContactById(contact_id, contact_object) {
  const { data } = await axios.put(`https://62b1d228c7e53744afc2005c.mockapi.io/contacts/${contact_id}`);
  return data;
}
//видалення контакту за ідентифікатором
export async function deleteContactById(contact_id) {
  const { data } = await axios.delete(`https://62b1d228c7e53744afc2005c.mockapi.io/contacts/${contact_id}`);
  return data;
}
