import React, { useState } from 'react';
import './styles/main.scss';
import { Dropdown, Searchbar } from './components';
import { User } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchUsers = async (): Promise<void> => {
    if (searchTerm.length === 0) return;

    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}+in:user`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      const newResults = data.items.map(
        (item: { login: string; id: number }) => ({
          name: item.login,
          id: item.id,
        })
      );
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

  const handleSelectedResult = (result: string) => {
    setShowDropdown(false);
    setSearchTerm(result);
  };

  return (
    <div className="center">
      <div>
        <Searchbar
          value={searchTerm}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onClick={() => setShowDropdown(true)}
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
