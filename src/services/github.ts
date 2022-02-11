import { User } from '../types';

const queryUser = async (user: string): Promise<User[]> => {
  const res = await fetch(
    `https://api.github.com/search/users?q=${user}+in:login`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return data.items.map((item: { login: string; id: number }) => ({
    name: item.login,
    id: item.id,
  }));
};

export { queryUser };
