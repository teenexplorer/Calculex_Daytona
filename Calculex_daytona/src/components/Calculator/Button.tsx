import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const Button = ({ children, onClick, variant = 'default', className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'calculator-btn',
        variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;