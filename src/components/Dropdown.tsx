import React, { useEffect, useState } from 'react';
import { User } from '../types';
import xIcon from '../../icons/x.svg';
import clockIcon from '../../icons/clock.svg';

interface DropdownProps {
  searchTerm: string;
  results: User[];
  onSelectedResult: (result: User) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  searchTerm,
  results,
  onSelectedResult,
}: DropdownProps) => {
  const [history, setHistory] = useState<User[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('results');
    if (savedResults) setHistory(JSON.parse(savedResults));
  }, []);

  const saveResult = (result: User) => {
    onSelectedResult(result);

    if (history.length > 0) {
      const newResults = [...new Set(history.concat(result))];
      localStorage.setItem('results', JSON.stringify(newResults));
      setHistory(newResults);
    } else {
      localStorage.setItem('results', JSON.stringify([result]));
    }
  };

  const removeResult = (resultToBeRemoved: User) => {
    const filteredResults = history.filter(
      (result) => result.name !== resultToBeRemoved.name
    );

    localStorage.setItem('results', JSON.stringify(filteredResults));
    setHistory(filteredResults);
  };

  if (searchTerm?.length === 0) {
    return (
      <ul className="dropdown dropdown--empty">
        <li>Seus resultados aparecerão aqui</li>
      </ul>
    );
  }

  if (results?.length === 0) {
    return (
      <ul className="dropdown dropdown--empty">
        <li>Nenhum resultado encontrado</li>
      </ul>
    );
  }

  return (
    <ul className="dropdown">
      {history
        .filter((result) => result.name.includes(searchTerm))
        .map((result) => (
          <li key={result.id}>
            <img src={clockIcon} alt="Clock" />
            <button
              className="dropdown__name"
              onClick={() => saveResult(result)}
            >
              {result.name}
            </button>
            <button
              className="dropdown__x"
              onClick={() => removeResult(result)}
            >
              <img src={xIcon} alt="Close button" />
            </button>
          </li>
        ))}
      {results.map((result) => (
        <li key={result.id}>
          <button className="dropdown__name" onClick={() => saveResult(result)}>
            {result.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export { Dropdown };
