"use server";
import { initializeAuth } from '../auth'
import { headers } from 'next/headers';

const auth = await initializeAuth();

export const signIn = async (email: string, password: string) => {
  const result = await auth.api.signInEmail({body: { email, password, callbackURL:"/" }});
  return result;
}

export const signOut = async () => {
  const result = await auth.api.signOut({body: { headers: await headers() }});
  return result;
}

