import React from 'react';

const Card = ({ children, className = '', padding = true, hover = false }) => {
  return (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-200 
      ${padding ? 'p-6' : ''} 
      ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;
