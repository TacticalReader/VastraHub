import { useAuthContext } from '../context/AuthContext';

// Sugar hook over AuthContext
export const useAuth = () => useAuthContext();
