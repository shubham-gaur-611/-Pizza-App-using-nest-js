import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const checkTokenExpiry = () => {
    const expiryTime = localStorage.getItem('tokenExpiry');
    if (expiryTime && new Date().getTime() > parseInt(expiryTime)) {
      logout();
      return false;
    }
    return true;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail && checkTokenExpiry()) {
      setUser({ email: userEmail, token });
    }

    // Check token expiry every minute
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const login = (email, token, expiresIn) => { // expiresIn is in seconds, default 1 hour
    const expiryTime = new Date().getTime() + (expiresIn * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    setUser({ email, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenExpiry');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
