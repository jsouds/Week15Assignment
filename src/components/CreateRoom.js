import React, { useState, useContext } from 'react';
import { HouseContext } from './HouseProvider';
import styles from '../styles/CreateRoom.module.css';

export function CreateRoom({ houseData }) {
  const { House } = houseData;

  const { modifyHouse /*fetchHouses*/ } = useContext(HouseContext);
  const [name, setName] = useState('');
  const [area, setArea] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = {
        name,
        area,
      };
      await modifyHouse(House, { name: House.name, rooms: [...House.rooms, { ...newRoom }] }, 'PUT');
      alert('Room Created');
      // fetchHouses(); // fetch the updated house list after creating the new room
      setName('');
      setArea('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className={styles.RoomForm} onSubmit={handleSubmit}>
      <div className={styles.FormInfoContainer}>
        <div>
          <label htmlFor="RoomName">What is the name of the room?</label>
          <input required type="text" id="RoomName" value={name} onChange={handleNameChange} />
        </div>
        <button type="submit">Create Room</button>
        <div>
          <label htmlFor="area">What is the area of the room in feet?</label>
          <input required type="number" id="area" value={area} onChange={handleAreaChange}></input>
        </div>
      </div>
    </form>
  );
}