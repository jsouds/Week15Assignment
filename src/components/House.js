import React, { useContext } from 'react';
import { HouseContext } from './HouseProvider';
import { CreateRoom } from './CreateRoom';
import styles from '../styles/House.module.css';

function House({ data }) {
    const { house, handleOperation } = data;
    const { modifyHouse } = useContext(HouseContext);

    const rooms = 
    (house.rooms || []).length > 0 ? 
    house.rooms.map((room) => {
        return (
          <li key={room._id}>
            <div>
              <h3>{room.name}</h3>
              <h3>Area: {room.area}</h3>
              {
                <button onClick={() => modifyHouse(house, { name: house.name, rooms: [...house.rooms.filter((ArrRoom) => ArrRoom._id !== room._id)] }, 'PUT')}>
                  Delete Room
                </button>
              }
             
            </div>
          </li>
        );
    }) : <h1>House has no rooms.</h1>;

    return (
      <li className={styles.House}>
        <div>
          <div className={styles.HouseAndButton}>
            <h1>{house.name}</h1>
            <button onClick={() => handleOperation(house, 'DELETE')}>Remove House</button>
          </div>
          <div>
            {/* Pass the houseData as an object */}
            <CreateRoom houseData={{ House: house }} />
            <ul className={styles.RoomList}>{rooms}</ul>
          </div>
        </div>
      </li>
    );
}

export default House;