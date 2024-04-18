import React, { useState, useEffect, useContext } from 'react';
import { HouseContext } from './HouseProvider';
import styles from '../styles/HouseList.module.css';
import House from './House';

export function HouseList() {
  const { isLoading, houses, fetchHouses, getHouse, modifyHouse } = useContext(HouseContext);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [method, setMethod] = useState('GET');

  const handleOperation = (selectedHouse, method) => {
    setMethod(method);
    setSelectedHouse(selectedHouse);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    const handleHouse = async () => {
      if (method === 'DELETE') {
        await modifyHouse(selectedHouse, null, method);
      } else {
        await getHouse(selectedHouse);
      }
    };

    if (selectedHouse) {
      handleHouse();
    }
  }, [selectedHouse, method]);

  const generatedHouseComponents = houses?.map((house) => {
    return <House data={{ house, handleOperation }} key={house._id} />;
  });

  return isLoading ? <div>Loading...</div> : <ul className={styles.HouseList} >{generatedHouseComponents}</ul>;
}