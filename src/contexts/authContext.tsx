import React from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  UserCredential,
  User as UserFirebaseProps
} from 'firebase/auth';

import { auth } from '../config/firebase';

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  email: string;
  password: string;
};

type AuthContextProps = {
  signUp: ({email, password}: User) => Promise<UserCredential>;
  signIn: ({email, password}: User) => Promise<UserCredential>;
  updateUserProfile: (email: User['email']) => Promise<void>
  logOut(): Promise<void>;
  currentUser: UserFirebaseProps | null;
};


export const AuthContext = React.createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = React.useState<UserFirebaseProps | null>(null);

  async function updateUserProfile(email: string) {
    if (currentUser) {
      return updateEmail(currentUser, email);
    }
  }

  async function signUp({ email, password }: User) {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function signIn({email, password}: User) {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function logOut() {
    return signOut(auth);
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      logOut,
      updateUserProfile,
      currentUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
