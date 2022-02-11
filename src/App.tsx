import React, { useState } from 'react';
import './styles/main.scss';
import { Dropdown, Searchbar } from './components';
import { User } from './types';
import { queryUser } from './services/github';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUsers = async (): Promise<void> => {
    if (searchTerm.length === 0) return;

    try {
      const newResults = await queryUser(searchTerm);
      setResults(newResults as User[]);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetch = () => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(fetchUsers, 500));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchUsers();
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedFetch();
  };

  const handleSelectedResult = (result: User) => {
    setShowDropdown(false);
    setSearchTerm(result.name);
  };

  const handleClick = () => {
    setShowDropdown(true);
    debouncedFetch();
  };

  return (
    <div className="center">
      <div>
        <Searchbar
          value={searchTerm}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onClick={handleClick}
        />
        {showDropdown && (
          <Dropdown
            searchTerm={searchTerm}
            results={results}
            onSelectedResult={handleSelectedResult}
          />
        )}
      </div>
    </div>
  );
};

export default App;
