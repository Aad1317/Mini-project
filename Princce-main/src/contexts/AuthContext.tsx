import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { mockAuth, Profile } from '../lib/mockAuth';

interface AuthContextType {
  user: { email: string } | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string, role: 'student' | 'teacher') => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = mockAuth.getUser();
    setProfile(user);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string, role: 'student' | 'teacher') => {
    const { user, error } = await mockAuth.signIn(email, password, role);
    if (user) {
      setProfile(user);
    }
    return { error };
  };

  const signOut = async () => {
    await mockAuth.signOut();
    setProfile(null);
  };

  const value = {
    user: profile ? { email: profile.email } : null,
    profile,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
