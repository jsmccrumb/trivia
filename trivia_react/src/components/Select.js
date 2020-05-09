import React, { Fragment } from 'react';

// children will be 'option' tags
const Select = ({name, value, onChange, children, label = name,}) => {
  const id = `${name}-${Date.now()}`;
  return (
    <Fragment>
      <div className="w-full md:w-1/3">
        <label htmlFor={id} className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-6"> 
          {label}
        </label>
      </div>
      <div className="w-full md:w-2/3 mb-5">
        <select id={id} onChange={onChange} value={value} name={name} className="bg-gray-100 border-2 boder-gray-400 rounded focus:bg-white focus:outline-none focus:border-blue-400 w-full py-2 px-4 text-gray-700 leading-tight">
          {children}
        </select>
      </div>
    </Fragment>
  )
};

export default Select;
