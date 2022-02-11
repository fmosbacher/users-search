import React from 'react';
import { User } from '../types';
import xIcon from '../../icons/x.svg';
import clockIcon from '../../icons/clock.svg';

interface HistoryProps {
  history: User[];
  searchTerm?: string;
  onSaveResult: (result: User) => void;
  onRemoveResult: (result: User) => void;
}

const History: React.FC<HistoryProps> = ({
  history,
  searchTerm,
  onSaveResult,
  onRemoveResult,
}: HistoryProps) => {
  return (
    <>
      {history
        .filter(
          (result) =>
            !searchTerm ||
            result.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((result) => (
          <li key={result.id} className="dropdown__item">
            <img src={clockIcon} className="dropdown__clock" alt="Clock" />
            <button
              className="dropdown__name"
              onClick={() => onSaveResult(result)}
            >
              {result.name}
            </button>
            <button
              className="dropdown__x"
              onClick={() => onRemoveResult(result)}
            >
              <img src={xIcon} alt="Close button" />
            </button>
          </li>
        ))}
    </>
  );
};

export { History };
