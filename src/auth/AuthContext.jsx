import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { startCloudSync, stopCloudSync } from '../firebase/cloudSync';

const AuthContext = createContext();
const LOCAL_USERS = 'krishimitra_local_users';
const LOCAL_SESSION = 'krishimitra_local_session';

// Local demo mode (no Firebase keys): accounts live only in this browser. NOT secure.
const readUsers = () => { try { return JSON.parse(localStorage.getItem(LOCAL_USERS)) || {}; } catch { return {}; } };

export const AuthProvider = ({ children }) => {
  const isDemo = !auth;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      return onAuthStateChanged(auth, async (u) => {
        if (u) {
          await startCloudSync(u.uid); // load farmer data from Firestore before pages render
          setUser({ uid: u.uid, name: u.displayName || u.email, email: u.email });
        } else {
          stopCloudSync();
          setUser(null);
        }
        setLoading(false);
      });
    }
    try { setUser(JSON.parse(localStorage.getItem(LOCAL_SESSION))); } catch { setUser(null); }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    if (auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      setUser({ uid: cred.user.uid, name, email });
      return;
    }
    const users = readUsers();
    if (users[email]) throw { code: 'auth/email-already-in-use' };
    users[email] = { name, password };
    localStorage.setItem(LOCAL_USERS, JSON.stringify(users));
    const session = { uid: email, name, email };
    localStorage.setItem(LOCAL_SESSION, JSON.stringify(session));
    setUser(session);
  };

  const login = async (email, password) => {
    if (auth) { await signInWithEmailAndPassword(auth, email, password); return; }
    const u = readUsers()[email];
    if (!u || u.password !== password) throw { code: 'auth/invalid-credential' };
    const session = { uid: email, name: u.name, email };
    localStorage.setItem(LOCAL_SESSION, JSON.stringify(session));
    setUser(session);
  };

  const loginWithGoogle = async () => {
    if (!auth) throw { code: 'auth/demo-no-google' };
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const resetPassword = async (email) => {
    if (!auth) throw { code: 'auth/demo-no-reset' };
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (auth) await signOut(auth);
    else { localStorage.removeItem(LOCAL_SESSION); setUser(null); }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDemo, register, login, loginWithGoogle, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
