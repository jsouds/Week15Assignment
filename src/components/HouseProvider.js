import React, { createContext, useState, useCallback } from 'react';

// Endpoint
const Endpoint = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

// Create Context
export const HouseContext = createContext();

// Provider component
export const HouseProvider = (props) => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function will handle all fetch requests.
  const baseFetch = useCallback(async (url, options) => {
    setIsLoading(true);
    try {
        const response = await fetch(url, options);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch houses', error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  // Fetch houses data.
  const fetchHouses = useCallback(async () => {
    let url = Endpoint;
    let options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    let fetchedHouses = await baseFetch(url, options);
    if (fetchedHouses) setHouses(fetchedHouses);
  }, [baseFetch, setHouses]);


  const getHouse = useCallback(async (houseId) => {
    let url = `${Endpoint}/${houseId}`;
    let options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    let fetchedHouse = await baseFetch(url, options);
    if (fetchedHouse) setHouses([fetchedHouse]);

  }, [baseFetch]);
  

  const createHouse = useCallback(async (houseData) => {

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(houseData),
    };

    try {
      await baseFetch(Endpoint, options);
      fetchHouses(); // Fetch houses again after creation/update
    } catch(error) {
        console.error(error);
    }
  
  }, [baseFetch, fetchHouses]);

//method === 'POST'
  const modifyHouse = useCallback(
    async (house, data, method) => {
        let options;

      if (method !== 'DELETE') {
        options = {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };
      } else if (method === 'DELETE') {
        options = {
          method: method,
          headers: { 'Content-Type': 'application/json' },
        };
      }
      await baseFetch(`${Endpoint}/${house._id}`, options);
      fetchHouses(); // Fetch houses again after modifying rooms array of the house
    },
    [baseFetch, fetchHouses, houses]
  );

  

  return (
    <HouseContext.Provider value={{ houses, isLoading, getHouse, fetchHouses, createHouse, modifyHouse }}>
      {props.children}
    </HouseContext.Provider>
  );
};