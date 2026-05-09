import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // TODO: Implementar con AsyncStorage de React Native
  // const store = async (value: T) => {
  //   try {
  //     const serialized = JSON.stringify(value);
  //     await AsyncStorage.setItem(key, serialized);
  //     setStoredValue(value);
  //   } catch (error) {
  //     console.error('Error saving to storage:', error);
  //   }
  // };

  // const remove = async () => {
  //   try {
  //     await AsyncStorage.removeItem(key);
  //     setStoredValue(initialValue);
  //   } catch (error) {
  //     console.error('Error removing from storage:', error);
  //   }
  // };

  return {
    storedValue,
    setValue: setStoredValue,
    // store,
    // remove,
  };
};
