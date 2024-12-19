import { useContext } from 'react';
import { AuthContext } from '../_context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('어흥');
  }
  return context;
};
