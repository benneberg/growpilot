import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInAnonymously, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { useAuditStore } from '../store/useAuditStore';
import { AuditRecord } from '../types';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const { setAudits, audits } = useAuditStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load audits from Firestore
        const q = query(collection(db, 'audits'), where('userId', '==', currentUser.uid));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const loadedAudits: AuditRecord[] = [];
          querySnapshot.forEach((doc) => {
            loadedAudits.push(doc.data() as AuditRecord);
          });
          
          // Merge local and remote audits, preferring remote
          const merged = [...loadedAudits];
          const localOnly = audits.filter(a => !loadedAudits.find(la => la.id === a.id));
          
          // Save local-only audits to Firestore
          localOnly.forEach(async (audit) => {
            if (!audit.userId) {
              const auditWithUser = { ...audit, userId: currentUser.uid };
              await setDoc(doc(db, 'audits', audit.id), auditWithUser);
            }
          });

          // Sort by date descending
          merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          if (loadedAudits.length > 0) {
              setAudits(merged);
          }
        });
        
        setLoading(false);
        return () => unsubscribeSnapshot();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []); // Note: leaving audits out of dependency array to avoid infinite loops, relying on initial load

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  const loginAnonymously = async () => {
      try {
          await signInAnonymously(auth);
      } catch (error) {
          console.error('Error signing in anonymously', error);
      }
  }

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loginWithGoogle, loginAnonymously, logout, loading };
}
