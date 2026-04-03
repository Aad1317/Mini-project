import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Profile } from '../contexts/AuthContext';

// ----- SOCIAL FEED (POSTS) ----- //
export interface Post {
  id?: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  createdAt: any;
  likes: number;
}

export const getPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
};

export const addPost = async (content: string, profile: Profile) => {
  await addDoc(collection(db, 'posts'), {
    content,
    authorId: profile.id,
    authorName: profile.full_name,
    authorRole: profile.role,
    createdAt: serverTimestamp(),
    likes: 0
  });
};

// ----- SOCIETIES ----- //
export interface Society {
  id?: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
}

export const getSocieties = async (): Promise<Society[]> => {
  const snapshot = await getDocs(collection(db, 'societies'));
  if (snapshot.empty) {
    // Seed some initial societies if empty
    const initialSocieties = [
      { name: 'Coding Club', description: 'For tech enthusiasts and developers.', memberCount: 42, category: 'Technical' },
      { name: 'Debate Society', description: 'Discussing global issues and politics.', memberCount: 28, category: 'Literary' },
      { name: 'Music Band', description: 'College official music makers.', memberCount: 15, category: 'Cultural' }
    ];
    for (const soc of initialSocieties) {
      await addDoc(collection(db, 'societies'), soc);
    }
    return initialSocieties;
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Society));
};

// ----- EVENTS ----- //
export interface EventModel {
  id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
}

export const getEvents = async (): Promise<EventModel[]> => {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    // Seed some initial events if empty
    const initialEvents = [
      { title: 'Tech Symposium 2024', date: '2024-11-15', location: 'Main Auditorium', description: 'Annual tech fest featuring AI and Web3.', organizer: 'Coding Club' },
      { title: 'Career Fair', date: '2024-11-20', location: 'Campus Grounds', description: 'Meet top recruiters and alumni.', organizer: 'Placement Cell' },
    ];
    for (const ev of initialEvents) {
      await addDoc(collection(db, 'events'), ev);
    }
    return initialEvents;
  }
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventModel));
};
