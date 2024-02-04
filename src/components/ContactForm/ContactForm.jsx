import React, { useState, useEffect } from 'react';
import css from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    const resetForm = () => {
      setFormData({
        name: '',
        number: '',
      });
    };

    resetForm();
  }, [addContact]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ ...formData });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="name" className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="number" className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          id="number"
          required
          value={formData.number}
          onChange={handleChange}
        />
      </label>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
