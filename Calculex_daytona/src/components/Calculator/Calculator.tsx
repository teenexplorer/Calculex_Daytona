import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import Display from './Display';
import Button from './Button';
import History from './History';
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryEntry {
  expression: string;
  result: string;
}

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState<number>(0);

  const appendToExpression = (value: string) => {
    setExpression((prev) => prev + value);
  };

  const clearExpression = () => {
    setExpression('');
    setResult('');
  };

  const calculateResult = () => {
    try {
      // Convert inverse trig results from radians to degrees
      let modifiedExpression = expression
        .replace(/asin\(/g, '(180/pi)*asin(')
        .replace(/acos\(/g, '(180/pi)*acos(')
        .replace(/atan\(/g, '(180/pi)*atan(');

      const calculatedResult = evaluate(modifiedExpression);
      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : Number(calculatedResult).toFixed(8).replace(/\.?0+$/, '');
      
      setResult(formattedResult);
      setHistory((prev) => [
        { expression, result: formattedResult },
        ...prev.slice(0, 9),
      ]);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleMemoryOperation = (operation: 'MC' | 'MR' | 'M+' | 'M-') => {
    switch (operation) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setExpression((prev) => prev + memory.toString());
        break;
      case 'M+':
        try {
          const currentValue = result ? Number(result) : evaluate(expression);
          setMemory((prev) => prev + currentValue);
        } catch (error) {
          // Ignore invalid expressions
        }
        break;
      case 'M-':
        try {
          const currentValue = result ? Number(result) : evaluate(expression);
          setMemory((prev) => prev - currentValue);
        } catch (error) {
          // Ignore invalid expressions
        }
        break;
    }
  };

  const handleScientificFunction = (func: string) => {
    appendToExpression(`${func}(`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <Display expression={expression} result={result} />
        
        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
          <div className="grid grid-cols-4 gap-2">
            {/* Memory Operations */}
            <Button onClick={() => handleMemoryOperation('MC')}>MC</Button>
            <Button onClick={() => handleMemoryOperation('MR')}>MR</Button>
            <Button onClick={() => handleMemoryOperation('M+')}>M+</Button>
            <Button onClick={() => handleMemoryOperation('M-')}>M-</Button>

            {/* Scientific Functions */}
            <Button onClick={() => handleScientificFunction('sin')}>sin</Button>
            <Button onClick={() => handleScientificFunction('cos')}>cos</Button>
            <Button onClick={() => handleScientificFunction('tan')}>tan</Button>
            <Button onClick={() => handleScientificFunction('log')}>log</Button>

            <Button onClick={() => handleScientificFunction('asin')}>sin⁻¹</Button>
            <Button onClick={() => handleScientificFunction('acos')}>cos⁻¹</Button>
            <Button onClick={() => handleScientificFunction('atan')}>tan⁻¹</Button>
            <Button onClick={() => handleScientificFunction('ln')}>ln</Button>

            {/* New Power Operations */}
            <Button onClick={() => appendToExpression('^')}>x^y</Button>
            <Button onClick={() => appendToExpression('^2')}>x²</Button>
            <Button onClick={() => appendToExpression('^3')}>x³</Button>
            <Button onClick={() => handleScientificFunction('sqrt')}>√</Button>

            <Button onClick={() => handleScientificFunction('cbrt')}>∛</Button>
            <Button onClick={() => appendToExpression('e')}>e</Button>
            <Button onClick={() => appendToExpression('pi')}>π</Button>
            <Button onClick={() => appendToExpression('!')}>!</Button>

            {/* Parentheses and Clear */}
            <Button onClick={() => appendToExpression('(')}>(</Button>
            <Button onClick={() => appendToExpression(')')}>)</Button>
            <Button onClick={clearExpression} variant="primary">C</Button>
            <Button onClick={() => setExpression((prev) => prev.slice(0, -1))}>⌫</Button>

            {/* Numbers and Operations */}
            <Button onClick={() => appendToExpression('7')}>7</Button>
            <Button onClick={() => appendToExpression('8')}>8</Button>
            <Button onClick={() => appendToExpression('9')}>9</Button>
            <Button onClick={() => appendToExpression('/')}>/</Button>

            <Button onClick={() => appendToExpression('4')}>4</Button>
            <Button onClick={() => appendToExpression('5')}>5</Button>
            <Button onClick={() => appendToExpression('6')}>6</Button>
            <Button onClick={() => appendToExpression('*')}>×</Button>

            <Button onClick={() => appendToExpression('1')}>1</Button>
            <Button onClick={() => appendToExpression('2')}>2</Button>
            <Button onClick={() => appendToExpression('3')}>3</Button>
            <Button onClick={() => appendToExpression('-')}>-</Button>

            <Button onClick={() => appendToExpression('0')}>0</Button>
            <Button onClick={() => appendToExpression('.')}>.</Button>
            <Button onClick={calculateResult} variant="primary">=</Button>
            <Button onClick={() => appendToExpression('+')}>+</Button>
          </div>
        </ScrollArea>
      </div>

      <div className="bg-[#1e293b] p-4 rounded-lg border-2 border-primary/20 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        <History
          history={history}
          onSelectHistory={(value) => setExpression((prev) => prev + value)}
        />
      </div>
    </div>
  );
};

export default Calculator;