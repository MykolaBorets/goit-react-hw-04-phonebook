import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storageContacts = localStorage.getItem('storage-contacts');

    if (storageContacts) {
      const savedContacts = JSON.parse(storageContacts);
      setContacts(savedContacts);
    }
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      localStorage.removeItem('storage-contacts');
    } else {
      localStorage.setItem('storage-contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = newContact => {
    const newName = newContact.name.toLowerCase();
    const isCheckedContact = contacts.find(
      ({ name }) => name.toLowerCase() === newName
    );

    if (!isCheckedContact) {
      newContact.id = nanoid();
      setContacts(prevContacts => [...prevContacts, newContact]);
    } else {
      alert(`${newContact.name} is already in contacts`);
    }
  };

  const findContact = ({ target: { value } }) => {
    setFilter(value.toLowerCase());
  };

  const filteredContact = () => {
    const suitableContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );

    return filter === '' ? contacts : suitableContacts;
  };

  const deleteContact = idDeleteContact => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idDeleteContact)
    );
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter findContact={findContact} />
      <ContactList filteredContact={filteredContact()} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
