import type { LoginData, User } from '@/modules/auth/types';
import type { ReactNode } from 'react';

import { createContext, useCallback, useEffect, useState } from 'react';

import { login, logout, verifySession } from '@/modules/auth/api/query-fns';
import {
  getUserToken,
  removeUserToken,
  setUserToken,
} from '@/modules/auth/lib/token';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const handleLogin = useCallback(async (loginData: LoginData) => {
    const user = await login(loginData);
    setUserToken(user.token);
    setUser(user);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    removeUserToken();
  }, []);

  const handleCheckAuth = useCallback(async () => {
    const token = getUserToken();

    if (token) {
      try {
        const user = await verifySession(token);
        setUser(user);

        return user;
      } catch (error) {
        removeUserToken();
        return null;
      }
    }

    return null;
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleCheckAuth().then();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
        verifySession: handleCheckAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export type AuthContextValue = {
  isAuthenticated: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  verifySession: () => Promise<User | null>;
  user: User | null;
};

export type AuthProviderProps = {
  children: ReactNode;
};
