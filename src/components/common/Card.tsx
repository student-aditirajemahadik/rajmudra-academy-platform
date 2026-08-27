import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-premium transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-lg hover:border-orange-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

