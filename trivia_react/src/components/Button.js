import React from 'react';

// sensible default? id is the name, type is text
// use destructuring of the props
const Button = ({children, onClick, isLoading = false, type = 'button'}) => {
  const className = isLoading ?
      'bg-gray-400 cursor-not-allowed p-2 text-lg rounded px-5 border-2 border-gray-500' :
      'bg-blue-400 hover:bg-blue-500 p-2 text-lg rounded px-5 border-2 border-blue-500';
  return (
    <button className={className} type={type} onClick={onClick}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
