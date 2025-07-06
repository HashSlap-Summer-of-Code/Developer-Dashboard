import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Card = forwardRef(({ 
  children, 
  className = '', 
  padding = 'p-6', 
  shadow = 'shadow-sm', 
  border = 'border border-gray-200 dark:border-gray-700',
  background = 'bg-white dark:bg-gray-800',
  rounded = 'rounded-xl',
  hover = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        background,
        padding,
        shadow,
        border,
        rounded,
        hover && 'hover:shadow-md transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card; 