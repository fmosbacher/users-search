import React from 'react';

interface SearchbarProps {
  value: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLFormElement>) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onSubmit,
  onChange,
  onClick,
}: SearchbarProps) => {
  return (
    <form className="searchbar" onSubmit={onSubmit} onClick={onClick}>
      <input placeholder="Buscar usuário" value={value} onChange={onChange} />
      <button type="submit">Buscar</button>
    </form>
  );
};

export { Searchbar };
