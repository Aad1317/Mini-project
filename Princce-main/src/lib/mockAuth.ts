export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'approved';
};

export const mockAuth = {
  currentUser: null as Profile | null,

  signIn: async (email: string, password: string, role: 'student' | 'teacher'): Promise<{ user: Profile | null; error: string | null }> => {
    if (!email || !password) {
      return { user: null, error: 'Email and password required' };
    }

    const user: Profile = {
      id: 'user-' + Date.now(),
      email: email,
      full_name: email.split('@')[0],
      role: role,
      status: 'approved'
    };

    mockAuth.currentUser = user;
    localStorage.setItem('mockUser', JSON.stringify(user));

    return { user, error: null };
  },

  signOut: async () => {
    mockAuth.currentUser = null;
    localStorage.removeItem('mockUser');
  },

  getUser: (): Profile | null => {
    if (mockAuth.currentUser) return mockAuth.currentUser;

    const stored = localStorage.getItem('mockUser');
    if (stored) {
      mockAuth.currentUser = JSON.parse(stored);
      return mockAuth.currentUser;
    }

    return null;
  }
};
