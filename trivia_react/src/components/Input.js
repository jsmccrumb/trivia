import React from 'react';

const Input = ({name, value, onChange, label = name, type = 'text',}) => {
  const id = `${name}-${Date.now()}`;
  return (
    <>
      <div className='w-full md:w-1/3'>
        <label htmlFor={id} className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-6'> 
          {label}
        </label>
      </div>
      <div className='w-full md:w-2/3'>
        <input id={id} type={type} onChange={onChange} value={value} name={name} 
            className='appearance-none border-2 boder-gray-400 rounded focus:outline-none focus:border-blue-400 w-full py-2 px-4 text-gray-700 leading-tight' />
      </div>
    </>
  );
};

export default Input;
