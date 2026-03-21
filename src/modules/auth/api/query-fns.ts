import type { LoginData, User } from '@/modules/auth/types';

import { sleep } from '@/core/lib/utils';

export async function login(data: LoginData): Promise<User> {
  await sleep(500);

  if (data.email === 'admin@example.com' && data.password === 'adminadmin') {
    return {
      token: 'mock-jwt-token',
      id: 'skKjd78a-#',
      username: 'admin',
      email: 'admin@example.com',
    };
  }

  throw new Error('Invalid username or password');
}

export async function logout(): Promise<void> {
  await sleep(500);

  return;
}

export async function verifySession(token: string): Promise<User> {
  await sleep(500);

  if (token === 'mock-jwt-token') {
    return {
      token: 'mock-jwt-token',
      id: 'skKjd78a-#',
      username: 'admin',
      email: 'admin@example.com',
    };
  }

  throw new Error('Invalid token');
}
