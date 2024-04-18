import React, { useState, useContext } from 'react';
import { HouseContext } from './HouseProvider';
import styles from '../styles/CreateHouse.module.css';

export function CreateHouse() {
  const { createHouse, fetchHouses } = useContext(HouseContext);
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newHouse = {
      name: name,
      rooms: [],
    };

    try {
        await createHouse(newHouse);
        alert('House Created');
        fetchHouses(); // fetch the updated house list after creating the new house
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setName(''); // Clear the input after the operation
    }
  };

  return (
    <form className={styles.HouseForm} onSubmit={handleSubmit}>
      <label htmlFor="HouseName">Name Your House Here</label>
      <input type="text" id="HouseName" value={name} onChange={handleNameChange} />
      <button type="submit">Create House</button>
    </form>
  );
}