import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
}

const Display = ({ expression, result }: DisplayProps) => {
  return (
    <div className="bg-secondary p-4 rounded-lg calculator-display">
      <div className="text-muted-foreground text-right text-lg min-h-[1.75rem]">
        {expression || '\u00A0'}
      </div>
      <div className="text-right text-3xl font-bold mt-1 break-all">
        {result || '0'}
      </div>
    </div>
  );
};

export default Display;