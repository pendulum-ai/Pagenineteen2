import React, { createContext, useContext, useState } from 'react';

const CursorContext = createContext({
  cursorType: 'default',
  cursorText: '',
  setCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const setCursor = (type, text = '') => {
    setCursorType(type);
    setCursorText(text);
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor }}>
      {children}
    </CursorContext.Provider>
  );
};
