import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  padding = 'p-5 sm:p-6',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-[#ECE8E1] shadow-[0_2px_12px_-2px_rgba(24,35,63,0.04)] ${
        hoverEffect ? 'transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(24,35,63,0.08)] hover:border-[#DFBE82]/60' : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
