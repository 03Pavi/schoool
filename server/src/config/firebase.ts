import admin from 'firebase-admin';
import { config } from './env';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.FIREBASE_PROJECT_ID,
      clientEmail: config.FIREBASE_CLIENT_EMAIL,
      privateKey: config.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: config.FIREBASE_DATABASE_URL,
  });
}

export const db = admin.firestore();