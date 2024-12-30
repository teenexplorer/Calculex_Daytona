import React from 'react';

interface HistoryEntry {
  expression: string;
  result: string;
}

interface HistoryProps {
  history: HistoryEntry[];
  onSelectHistory: (result: string) => void;
}

const History = ({ history, onSelectHistory }: HistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="text-muted-foreground text-center p-4">
        No calculations yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((entry, index) => (
        <div
          key={index}
          className="history-item"
          onClick={() => onSelectHistory(entry.result)}
        >
          <div className="text-sm text-muted-foreground">{entry.expression}</div>
          <div className="text-lg font-medium">{entry.result}</div>
        </div>
      ))}
    </div>
  );
};

export default History;