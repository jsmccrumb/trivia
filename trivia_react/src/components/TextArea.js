import React from 'react';
import {useThemeContext} from './../hooks/useTheme';

// NOTE: label takes it font/background from parent
const TextArea = ({name, value, onChange, label = name, rows = 4,}) => {
  const calculateColor = useThemeContext();
  const inputBG = calculateColor('background', true);
  const inputText = calculateColor('text', true);
  const inputBorder = calculateColor('info', true);
  const inputHighlight = calculateColor('info');
  const inputClassName = `bg-${inputBG} text-${inputText} border-${inputBorder} focus:border-${inputHighlight}` +
      'appearance-none border-2 rounded w-full py-2 px-4 leading-tight';
  const id = `${name}-${Date.now()}`;
  return (
    <>
      <div className="w-full md:w-1/3">
        <label htmlFor={id} className="block font-bold md:text-right mb-1 md:mb-0 pr-6">
          {label}
        </label>
      </div>
      <div className="w-full md:w-2/3 mb-5">
        <textarea id={id} rows={rows} onChange={onChange}
            value={value} name={name} className={className} />
      </div>
    </>
  );
};

export default TextArea;
